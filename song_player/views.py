from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from django.db.models import F
from .models import Song, Playlist, Entry
from user_auth.models import User
import json


def getUser(req):
  token = req.session.get('session_token', None)
  return User.objects.filter(session_token=token)[0]

def set_dark_mode(request, val):
  usr=getUser(request)
  usr.dark_mode=True if val ==1 else False
  usr.save()
  return HttpResponse(status=204)


def init_store(request):
  usr = getUser(request)
  return JsonResponse(
      [{
          x['id']: x for x in Song.objects.filter(user_id=usr.id).values(
              'id', 'title', 'artist', 'album', 'album_art_url', 'date_added', 'order', 'yt_id')
      },
      {
          x["id"]: x['title'] for x in Playlist.objects.filter(
              user_id=usr.id).values('id', 'title')
      },
        usr.dark_mode
      ],

      safe=False)


def song_d(request):
  usr = getUser(request)
  if request.method == "GET":
    return JsonResponse(
        {
            x['id']: x for x in Song.objects.filter(user_id=usr.id).values(
                'id', 'title', 'artist', 'album', 'album_art_url', 'date_added', 'order', 'yt_id')
        },
        safe=False)


def playlist_d(request):  # post, get
  usr = getUser(request)
  if request.method == "POST":
    req = request.POST.get('title')

    Playlist.objects.create(title=req, user=usr)
    res = model_to_dict(Playlist.objects.last(), fields=['id', 'title'])
    return JsonResponse({res['id']: res['title']}, safe=False)

  return JsonResponse(
      {
          x["id"]: x['title'] for x in Playlist.objects.filter(
              user_id=usr.id).values('id', 'title')
      },
      safe=False)


def edit_playlist(request):
  req = request.POST.dict()
  pl = Playlist.objects.get(pk=req['id'])
  pl.title = req['title']
  pl.save()
  res = model_to_dict(pl, fields=['id', 'title'])
  return JsonResponse({res['id']: res['title']}, safe=False)


def edit_songs(request):
  req = request.POST.dict()
  ids = req.pop('ids').split(',')
  qs = Song.objects.filter(pk__in=ids)
  if not req['album_art_url'] and req['artist']:
    import requests
    import re
    import xml.etree.ElementTree as ET
    quer = f'https://musicbrainz.org/ws/2/recording?query=%27{req["title"]}%27%20AND%20artist:%27{req["artist"]}%27'
    resp = requests.get(quer)
    removed_ns = re.sub(' xmlns="[^"]+"', '', resp.text, count=2)
    root = ET.fromstring(removed_ns)

    acc_rel_type = set(['Album', 'Single', 'EP'])
    for el in root.iter('release-group'):
      if 'type' in el.attrib and el.attrib['type'] in acc_rel_type:
        rel_id = el.attrib['id']

        new_req = requests.get(
            f'http://coverartarchive.org/release-group/{rel_id}')
        if new_req.ok:
          cover_art_json = json.loads(new_req.text)
          req['album_art_url'] = cover_art_json['images'][0]['image']
        break

  qs.update(**req)

  return JsonResponse(
      {
          x['id']: x for x in Song.objects.filter(pk__in=ids).values(
            'id', 'title', 'artist', 'album', 'album_art_url', 'date_added', 'order', 'yt_id')
      },
      safe=False)


def post_songs(request):  #post
  usr = getUser(request)
  song_set = usr.song_set
  songs_to_post = json.loads(request.body.decode('utf-8'))
  res = []
  for i, (_song, yt_id) in enumerate(songs_to_post):
    song = Song(title=_song[:-4], filename=_song, user=usr, yt_id=yt_id, order=song_set.count()+i+1)
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
          x["id"]: x for x in Song.objects.filter(pk__gt=idx).values(
            'id', 'title', 'artist', 'album', 'album_art_url', 'date_added', 'order', 'yt_id')
      },
      safe=False)


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
  for filename, _ in req:
    url = connection.Bucket(bucket).meta.client.generate_presigned_post(
        bucket, filename, Fields=None, Conditions=None, ExpiresIn=3600)

    res.append(url)
  return JsonResponse(res, safe=False)


def song(request, id):  #get
  import boto3.session
  from botocore.client import Config
  from django.conf import settings
  session = boto3.session.Session()
  connection = session.resource(
      's3',
      aws_access_key_id=getattr(settings, "AWS_ACCESS_KEY_ID", None),
      aws_secret_access_key=getattr(settings, "AWS_SECRET_ACCESS_KEY", None),
      # config=Config(signature_version='s3v4', region_name='us-west-1')
  )
  bucket = getattr(settings, "AWS_STORAGE_BUCKET_NAME", None)
  params = {}
  params['Bucket'] = bucket
  params['Key'] = Song.objects.get(pk=id).filename
  url = connection.Bucket(bucket).meta.client.generate_presigned_url(
      'get_object', Params=params, ExpiresIn=3600)
  return JsonResponse(url, safe=False)


def delete_song(request, id):  #delete
  pls_to_fetch = json.loads(request.body.decode('utf-8'))

  song_to_delete = Song.objects.get(pk=id)
  affected_pls = list(song_to_delete.playlists.values_list('pk', flat=True))
  song_to_delete.delete()

  affected_entries = Entry.objects.filter(playlist_id__in=affected_pls) \
                          .order_by('playlist_id','order').all()

  cur_ord = 1
  if affected_entries:
    cur_pl = affected_entries[0].playlist_id
    for ent in affected_entries:
      if ent.playlist_id != cur_pl:
        cur_ord = 1
        cur_pl = ent.playlist_id
      ent.order = cur_ord
      cur_ord += 1
    Entry.objects.bulk_update(affected_entries, ['order'])

  res = []
  for pl in pls_to_fetch:
    res.append(
        list(
            Entry.objects.filter(playlist_id=pl).order_by('order').values_list(
                "song_id", "pk")))
  return JsonResponse({
      'fetched_pls': res,
      'dirty_pls': affected_pls
  },
                      safe=False)


def playlist(request, id):  # delete, get
  if request.method == "DELETE":
    Playlist.objects.get(id=id).delete()
    return HttpResponse(status=204)

  return JsonResponse(list(
      Entry.objects.filter(playlist_id=id).order_by('order').values_list(
          "song_id", "pk")),
                      safe=False)


def add_track(request, playlist_id=None, song_id=None):  # post
  playlist = Playlist.objects.get(pk=playlist_id)
  playlist_entries = Entry.objects.filter(playlist_id=playlist_id)
  song = Song.objects.get(pk=song_id)
  new_entry = Entry.objects.create(playlist=playlist,
                                   song=song,
                                   order=playlist_entries.count() + 1)
  return JsonResponse(Entry.objects.last().id, safe=False)


def move_track(request):
  [start, index, playlist_id] = json.loads(request.body.decode('utf-8'))
  dir = index - start

  if playlist_id[0]=='s':
    playlist = getUser(request).song_set
    breakpoint()
  else:
    playlist = Entry.objects.filter(playlist_id=playlist_id)

  moved_track = playlist.get(order=start)
  if dir > 0:
    playlist.filter(order__range=(start + 1,
                                  index)).update(order=F('order') - 1)
  elif dir < 0:
    playlist.filter(order__range=(index,
                                  start - 1)).update(order=F('order') + 1)

  moved_track.order = index
  moved_track.save()
  return HttpResponse(status=204)


def delete_track(request):
  req = json.loads(request.body.decode('utf-8'))
  target = Entry.objects.get(id=req[0])
  playlist = Entry.objects.filter(playlist_id=target.playlist_id)
  playlist.filter(order__range=(target.order + 1,
                                playlist.count())).update(order=F('order') - 1)
  target.delete()
  return HttpResponse(status=204)