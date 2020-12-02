from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .models import Song, Playlist, Entry
from user_auth.models import User
import json


def getUser(req):
  token = req.session.get('session_token', None)
  return User.objects.filter(session_token=token)[0]


def song_d(request):
  usr = getUser(request)

  if request.method == "GET":
    return JsonResponse(
        {
            x["id"]: x for x in Song.objects.filter(
                user_id=usr.id).values('id', 'title', 'artist', 'album')
        },
        safe=False)


def playlist_d(request):  # post, get
  usr = getUser(request)

  if request.method == "POST":
    req = request.POST.get('title')
    Playlist.objects.create(title=req, user=usr)
    res = model_to_dict(Playlist.objects.last(), fields=['id', 'title'])
    return JsonResponse({res['id']: res}, safe=False)

  return JsonResponse(
      {
          x["id"]: x for x in Playlist.objects.filter(
              user_id=usr.id).values('id', 'title')
      },
      safe=False)

def edit_playlist(request):
  req = request.POST.dict()
  pl = Playlist.objects.get(pk=req['id'])
  pl.title = req['title']
  pl.save()
  res = model_to_dict(pl, fields=['id', 'title'])
  return JsonResponse({res['id']: res}, safe=False)


def edit_songs(request):
  req = request.POST.dict()
  ids = req.pop('ids').split(',')
  Song.objects.filter(pk__in=ids).update(**req)
  return JsonResponse(
      {
          x['id']: x for x in Song.objects.filter(
              pk__in=ids).values('id', 'title', 'artist', 'album')
      },
      safe=False)


def post_songs(request):  #post
  usr = getUser(request)

  songs_to_post = json.loads(request.body.decode('utf-8'))
  res = []
  # breakpoint()
  for _song in songs_to_post:
    song = Song(title=_song, filename=_song, user=usr)
    try:
      song.full_clean()
    except:
      return JsonResponse(["Invalid submission. Please try again."],
                          safe=False,
                          status=422)
    res.append(song)
  if last := Song.objects.last():
    idx = last.id
  else:
    idx = 0
  
  Song.objects.bulk_create(res)
  return JsonResponse(
      {
          x["id"]: x for x in Song.objects.filter(
              pk__gt=idx).values('id', 'title', 'artist', 'album')
      },
      safe=False)


def create_songs(request):
  breakpoint()

def get_post_urls(request):  #get , delete
  req = json.loads(request.body.decode('utf-8'))
  import boto3.session
  from django.conf import settings
  session = boto3.session.Session()
  connection = session.resource(
      's3',
      aws_access_key_id=getattr(settings, "AWS_ACCESS_KEY_ID", None),
      aws_secret_access_key=getattr(settings, "AWS_SECRET_ACCESS_KEY", None),
  )
  bucket = getattr(settings, "AWS_STORAGE_BUCKET_NAME", None)
  res = []
  for filename in req:
    url = connection.Bucket(bucket).meta.client.generate_presigned_post(
      bucket, filename,  Fields=None, Conditions=None, ExpiresIn=3600
    )
    # params = {}
    # bucket = getattr(settings, "AWS_STORAGE_BUCKET_NAME", None)
    # params['Bucket'] = bucket
    # params['Key'] = filename

    # url = connection.Bucket(bucket).meta.client.generate_presigned_url(
    #     ClientMethod="put_object",
    #     Params=params,
    #     ExpiresIn=3600,
    #     HttpMethod="POST")

    res.append(url)
  return JsonResponse(res, safe=False)

def song(request, id):  #get , delete
  if request.method == "GET":
    import boto3.session
    from django.conf import settings
    session = boto3.session.Session()
    connection = session.resource(
        's3',
        aws_access_key_id=getattr(settings, "AWS_ACCESS_KEY_ID", None),
        aws_secret_access_key=getattr(settings, "AWS_SECRET_ACCESS_KEY", None),
    )
    bucket = getattr(settings, "AWS_STORAGE_BUCKET_NAME", None)
    params = {}
    params['Bucket'] = bucket
    params['Key'] = Song.objects.get(pk=id).filename
    url = connection.Bucket(bucket).meta.client.generate_presigned_url(
        'get_object', Params=params, ExpiresIn=3600)
    return JsonResponse(url, safe=False)
  breakpoint()
  req = json.loads(request.body.decode('utf-8'))
  song_to_delete = Song.objects.get(pk=id)
  affected_entries = song_to_delete.entry_set.all()

  ent_to_upd = []
  ent_to_del = set()
  plist_to_upd = []
  for ent in affected_entries:
    if ent.pk in ent_to_del:
      continue

    ent_to_del.add(ent.pk)

    # try:
    #   nxt = ent.next_ent
    # except ent.DoesNotExist:
    #   nxt = None
    nxt = ent.next_ent.first()
    while nxt and nxt.song.pk == id:
      ent_to_del.add(nxt.pk)
      # nxt = nxt.next_ent
      nxt = nxt.next_ent.first()

    prev = ent.prev_ent
    while prev and prev.song.pk == id:
      ent_to_del.add(prev.pk)
      prev = prev.prev_ent

    if not nxt:
      playlist = ent.playlist
      playlist.tail_ent = ent.prev_ent
      plist_to_upd.append(playlist)
    else:
      nxt.prev_ent = prev
      ent_to_upd.append(nxt)

  Playlist.objects.bulk_update(plist_to_upd, ['tail_ent'])
  Entry.objects.filter(pk__in=ent_to_del).delete()
  Entry.objects.bulk_update(ent_to_upd, ['prev_ent'])
  song_to_delete.delete()


def playlist(request, id):  # delete, get
  if request.method == "DELETE":
    Playlist.objects.get(id=id).delete()
    return HttpResponse(status=204)

  return JsonResponse(list(
      Entry.objects.filter(playlist_id=id).values_list("song_id", "pk",
                                                       "prev_ent")),
                      safe=False)


def add_track(request, playlist_id=None, song_id=None):  # post
  playlist = Playlist.objects.get(pk=playlist_id)
  song = Song.objects.get(pk=song_id)
  new_entry = Entry.objects.create(playlist=playlist,
                                   song=song,
                                   prev_ent=playlist.tail_ent)

  # breakpoint()
  playlist.tail_ent = new_entry
  playlist.save()
  return JsonResponse(Entry.objects.last().id, safe=False)


def move_track(request):
  req = json.loads(request.body.decode('utf-8'))

  if tail := req.pop('tail', False):
    pl = Playlist.objects.get(pk=tail[0])
    pl.tail_ent = Entry.objects.get(pk=tail[1])
    pl.save()

  res = list(Entry.objects.filter(pk__in=req.keys()))
  for entry in res:
    if pk := req[str(entry.pk)]:
      entry.prev_ent = Entry.objects.get(pk=pk)
    else:
      entry.prev_ent = None
    #### need to write tail corner case
  Entry.objects.bulk_update(res, ['prev_ent'])
  return HttpResponse(status=204)


def delete_track(request):
  req = json.loads(request.body.decode('utf-8'))
  target = Entry.objects.get(id=req['target'])
  if 'next' in req:
    r = Entry.objects.get(id=req['next'])
    r.prev_ent = Entry.objects.get(pk=req['prev'])
    r.save()
  else:
    playlist = target.playlist
    playlist.tail_ent = target.prev_ent
    playlist.save()
  target.delete()
  return HttpResponse(status=204)