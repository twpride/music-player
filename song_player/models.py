from django.db import models
from django.core.files.storage import FileSystemStorage

import os
fss = FileSystemStorage(location='./media/songs')

class Song(models.Model):
  title = models.CharField(max_length=100)
  artist = models.CharField(max_length=100, blank=True)
  album = models.CharField(max_length=100, blank=True)
  waveform = models.FileField(upload_to='./media/songs')
  # waveform = models.FileField(storage=fss)

class Entry(models.Model):
  playlist = models.ForeignKey('Playlist', on_delete=models.CASCADE)
  song = models.ForeignKey('Song', on_delete=models.CASCADE)
  # next_entry = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
  prev_id = models.IntegerField(blank=True, null=True)

class Playlist(models.Model):
  title = models.CharField(max_length=100)
  # head_entry = models.ForeignKey('Playlist_Entry', on_delete=models.CASCADE, related_name='+', blank=True, null=True)
  # tail_entry = models.ForeignKey('Playlist_Entry', on_delete=models.CASCADE, related_name='+', blank=True, null=True)
  # head_id = models.IntegerField(blank=True, null=True)
  tail_id = models.IntegerField(blank=True, null=True)
  songs = models.ManyToManyField(Song, through=Entry)