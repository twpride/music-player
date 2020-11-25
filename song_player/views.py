from django.shortcuts import render
from django.http import HttpResponse
from django.views import View
from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .models import Song, Playlist, Entry
import json


def song_d(request):
  if request.method == "GET":
    return JsonResponse(
        {
            x["id"]: x
            for x in Song.objects.values('id', 'title', 'artist', 'album')
        },
        safe=False)


def edit_songs(request):
  req = request.POST.dict()
  ids = req.pop('ids').split(',')
  Song.objects.filter(pk__in=ids).update(**req)
  return JsonResponse(
    { x['id']: x for x in
      Song.objects
          .filter(pk__in=ids)
          .values('id', 'title', 'artist', 'album')
    },
    safe=False)


def post_songs(request): #post
  songs_to_post = json.loads(request.body.decode('utf-8'))
  res = []
  for _song in songs_to_post:
    song = Song(title=_song['Key'], filename=_song['Key'])
    try:
      song.full_clean()
    except:
      return JsonResponse(["Invalid submission. Please try again."],
                          safe=False,
                          status=422)
    res.append(song)
  idx = Song.objects.latest('id').id
  Song.objects.bulk_create(res)
  return JsonResponse(
      {
          x["id"]: x for x in Song.objects.filter(
              pk__gt=idx).values('id', 'title', 'artist', 'album')
      },
      safe=False)


def song(request, id): #get , delete
  if request.method == "GET":
    import boto3.session
    from django.conf import settings
    session = boto3.session.Session()
    connection = session.resource('s3',
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

def playlist_d(request): # post, get
  if request.method == "POST":
    req = request.POST.get('title')
    Playlist.objects.create(title=req)
    res = model_to_dict(Playlist.objects.last(), fields=['id','title'])
    return JsonResponse({res['id']:res}, safe=False)
  return JsonResponse(
    {
      x["id"]: x 
      for x in Playlist.objects.values('id', 'title')
    }
    , safe=False)

def playlist(request, id):  # delete, get
  if request.method == "DELETE":
    Playlist.objects.get(id=id).delete()
    return HttpResponse(status=204)

  return JsonResponse(
    list(Entry.objects.filter(playlist_id=id)
                      .values_list("song_id", "pk","prev_id")), safe=False)


def add_track(request, playlist_id=None, song_id=None): # post
  playlist = Playlist.objects.get(pk=playlist_id)
  song = Song.objects.get(pk=song_id)
  new_entry = Entry.objects.create(playlist=playlist,
                                   song=song,
                                   prev_id=playlist.tail_id)
  playlist.tail_id = new_entry.pk
  playlist.save()
  return JsonResponse(Entry.objects.last().id, safe=False)


def move_track(request):
  req = json.loads(request.body.decode('utf-8'))
  res = list(Entry.objects.filter(pk__in=req.keys()))
  for entry in res:
    entry.prev_id = req[str(entry.pk)]
  Entry.objects.bulk_update(res, ['prev_id'])
  return JsonResponse("sucess", safe=False)

def delete_track(request):
  req = json.loads(request.body.decode('utf-8'))
  # breakpoint()
  if 'next' in req:
    # breakpoint()
    r = Entry.objects.get(id=req['next'])
    r.prev_id = req['prev'] 
    r.save()
  Entry.objects.get(id=req['target']).delete() 
  return HttpResponse(status=204)