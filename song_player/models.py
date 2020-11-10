from django.db import models
from django.core.files.storage import FileSystemStorage

import os

class Song(models.Model):
  title = models.CharField(max_length=100)
  artist = models.CharField(max_length=100, blank=True)
  album = models.CharField(max_length=100, blank=True)
  waveform = models.FileField(upload_to='./media/songs')

class Entry(models.Model):
  playlist = models.ForeignKey('Playlist', on_delete=models.CASCADE)
  song = models.ForeignKey('Song', on_delete=models.CASCADE)
  prev_id = models.IntegerField(blank=True, null=True)

class Playlist(models.Model):
  title = models.CharField(max_length=100)
  tail_id = models.IntegerField(blank=True, null=True)
  songs = models.ManyToManyField(Song, through=Entry)