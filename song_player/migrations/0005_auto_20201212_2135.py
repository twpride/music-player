# Generated by Django 3.0.5 on 2020-12-12 21:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('song_player', '0004_remove_playlist_root_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entry',
            name='prev_ent',
        ),
        migrations.RemoveField(
            model_name='playlist',
            name='tail_ent',
        ),
    ]