from django.db import models
from django.core.files.storage import FileSystemStorage
from user_auth.models import User
import os


class Song(models.Model):
  title = models.CharField(max_length=100)
  artist = models.CharField(max_length=100, blank=True)
  album = models.CharField(max_length=100, blank=True)
  filename = models.CharField(max_length=255, blank=True)
  album_art_url = models.CharField(max_length=255, blank=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  playlists = models.ManyToManyField('Playlist', through='Entry')


class Entry(models.Model):
  playlist = models.ForeignKey('Playlist', on_delete=models.CASCADE)
  song = models.ForeignKey(Song, on_delete=models.CASCADE)
  order = models.PositiveSmallIntegerField()

class Playlist(models.Model):
  title = models.CharField(max_length=100)
  songs = models.ManyToManyField(Song, through=Entry)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  