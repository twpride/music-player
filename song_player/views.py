from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import Song
import json
from django.forms.models import model_to_dict

from django.http import HttpResponse, JsonResponse



from django.core import serializers


class SongView(View):

  def get(self, request):
    aa = list(Song.objects.all())
    print(aa[4].waveform.url)
    songs = list(Song.objects.values_list())
    return JsonResponse(songs, safe=False)



  def post(self, request):

    post = request.POST
    entries = zip(post.getlist('title'), post.getlist('artist'),
                  post.getlist('album'), request.FILES.getlist('waveform'))

    res = []
    for entry in entries:
      song = Song(None, *entry)
      try:
        song.full_clean()
      except:
        return JsonResponse(["Invalid submission. Please try again."], safe=False, status=422)
      res.append(song)

    Song.objects.bulk_create(res)

    return HttpResponse("sucess")