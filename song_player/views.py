from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import Song, Playlist, Entry
import json
from django.forms.models import model_to_dict

from django.http import HttpResponse, JsonResponse

from django.core import serializers

# class SongView(View):

#   def get(self, request):
#     return JsonResponse(list(Song.objects.values_list()), safe=False)

#   def post(self, request):

#     post = request.POST
#     entries = zip(post.getlist('title'), post.getlist('artist'),
#                   post.getlist('album'), request.FILES.getlist('waveform'))
#     res = []
#     for entry in entries:
#       song = Song(None, *entry)
#       try:
#         song.full_clean()
#       except:
#         return JsonResponse(["Invalid submission. Please try again."],
#                             safe=False,
#                             status=422)
#       res.append(song)

#     Song.objects.bulk_create(res)

#     return HttpResponse("sucess")


def songs(request):
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
  return HttpResponse("sucess")


def song(request, id):
  return JsonResponse(Song.objects.get(pk=id).waveform.url, safe=False)


def playlists(request):
  if request.method == "GET":
    return JsonResponse(list(Playlist.objects.values_list()), safe=False)


def playlist(request, id):
  cols = ['pk', 'title', 'artist', 'album', 'entry__pk', 'entry__next_id']
  res = Song.objects.prefetch_related(
      'playlist_set', 'entry_set').filter(playlist__pk=id).values(*cols)
  return JsonResponse(list(res), safe=False)
  # Playlist.objects.prefetch_related('Entry_set','songs').filter(pk=2)
  # Entry.objects.select_related('playlist','song').filter(playlist__pk=2)


def entries(request, playlist_id=None, song_id=None):
  playlist = Playlist.objects.get(pk=playlist_id)
  song = Song.objects.get(pk=song_id)
  new_entry = Entry.objects.create(playlist=playlist, song=song)

  if playlist.tail_id:
    obj = Entry.objects.get(pk=playlist.tail_id)
    obj.next_id = new_entry.pk
    obj.save()

  playlist.tail_id = new_entry.pk
  if not playlist.head_id:
    playlist.tail_id = new_entry.pk

  playlist.save()
  return JsonResponse("sucess", safe=False)


def move_track(request):
  req = json.loads(request.body.decode('utf-8'))
  # req = list(zip(*req))
  # res = list(Entry.objects.filter(pk__in=req[0]))
  res = list(Entry.objects.filter(pk__in=req.keys()))
  for entry in res:
    # entry.next_id = req[1][req[0].index(entry.pk)]
    entry.next_id = req[entry.pk]
  Entry.objects.bulk_update(res, ['next_id'])
  return JsonResponse("sucess", safe=False)


def track(request, playlist_id, song_id):
  if request.method == "POST":
    pass