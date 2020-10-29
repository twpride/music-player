from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import Song
import json
from django.forms.models import model_to_dict

from django.http import JsonResponse

class SongView(View):
  def get(self, request):
    if self.exists():
      return HttpResponse("song exists")
    else:
      return HttpResponse("song doesn't exist")

  def post(self, request):

    req_json = json.loads(request.body.decode('utf-8'))

    self.song = Song(**req_json)

    try:
      self.song.full_clean()
    except:
      return JsonResponse({"msg": "invalid data"}, status=422)

    self.song.save()

    return self.success()