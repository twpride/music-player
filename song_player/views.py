from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import Song, Playlist, Entry
import json
from django.forms.models import model_to_dict

from django.http import HttpResponse, JsonResponse

from django.core import serializers


def songs_index(request):
  if request.method == "GET":
    return JsonResponse(list(Song.objects.values_list()), safe=False)

  post = request.POST
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
  return JsonResponse(list(Song.objects.values_list()), safe=False)
  # return HttpResponse("sucess")


def song(request, id):
  return JsonResponse(Song.objects.get(pk=id).waveform.url, safe=False)


def playlists_index(request):
  if request.method == "GET":
    return JsonResponse(list(Playlist.objects.values_list()), safe=False)


def playlist(request, id):
  # cols = ['pk', 'title', 'artist', 'album', 'entry__pk', 'entry__next_id']
  # res = Song.objects.prefetch_related(
  #     'playlist_set', 'entry_set').filter(playlist__pk=id).values(*cols)
  res = Entry.objects.select_related('playlist','song') \
                     .filter(playlist__pk=id) \
                     .values_list("song__pk","pk","prev_id")

  # res = Entry.objects.select_related('playlist','song').filter(playlist__pk=id).values_list("song__pk","pk","prev_id")
  return JsonResponse(list(res), safe=False)


def entries_index(request, playlist_id=None, song_id=None):
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


def track(request, playlist_id, song_id):
  if request.method == "POST":
    pass