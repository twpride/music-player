from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import Song, Playlist, Entry
import json
from django.forms.models import model_to_dict

from django.http import HttpResponse, JsonResponse

from django.core import serializers


def song_d(request):
  if request.method == "GET":
    return JsonResponse({x["id"]:x for x in Song.objects.values('id','title','artist','album')}, safe=False)

  post = request.POST
  print(request.FILES.getlist('waveform'))
  songs_to_upload = zip(post.getlist('title'), post.getlist('artist'),
                        post.getlist('album'),
                        request.FILES.getlist('waveform'))
  res = []
  for _song in songs_to_upload:
    song = Song(None, *_song)
    try:
      song.full_clean()
    except:
      return JsonResponse(["Invalid submission. Please try again."],
                          safe=False,
                          status=422)
    res.append(song)

  Song.objects.bulk_create(res)
  return JsonResponse({x["id"]:x for x in Song.objects.values('id','title','artist','album')}, safe=False)


def song_url(request, id):
  return JsonResponse(Song.objects.get(pk=id).waveform.url, safe=False)


def playlist_d(request):
  if request.method == "GET":
    return JsonResponse(list(Playlist.objects.values()), safe=False)


def playlist(request, id):
  # Entry.objects.filter(playlist_id=id).values_list("song_id","pk","prev_id")
  return JsonResponse(
    list(Entry.objects.filter(playlist_id=id)
                      .values_list("song_id", "pk","prev_id")), safe=False)


def add_track(request, playlist_id=None, song_id=None):
  playlist = Playlist.objects.get(pk=playlist_id)
  song = Song.objects.get(pk=song_id)
  new_entry = Entry.objects.create(playlist=playlist,
                                   song=song,
                                   prev_id=playlist.tail_id)
  playlist.tail_id = new_entry.pk
  playlist.save()
  return JsonResponse("sucess", safe=False)


def move_track(request):
  req = json.loads(request.body.decode('utf-8'))
  res = list(Entry.objects.filter(pk__in=req.keys()))
  for entry in res:
    entry.prev_id = req[str(entry.pk)]
  Entry.objects.bulk_update(res, ['prev_id'])
  return JsonResponse("sucess", safe=False)
