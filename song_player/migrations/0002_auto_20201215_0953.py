# Generated by Django 3.0.5 on 2020-12-15 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('song_player', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='entry',
            old_name='time_added',
            new_name='date_added',
        ),
        migrations.RenameField(
            model_name='playlist',
            old_name='time_added',
            new_name='date_added',
        ),
        migrations.RenameField(
            model_name='song',
            old_name='time_added',
            new_name='date_added',
        ),
    ]