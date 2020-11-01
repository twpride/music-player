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