"""fastcasual URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from user_auth import views as auth
from song_player import views as song

from django.conf import settings
from django.conf.urls.static import static
import debug_toolbar
from django.views.generic.base import RedirectView
from django.urls import re_path
from django.views.generic import TemplateView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', auth.RootView.as_view()),
    path('api/users', auth.UserView.as_view()),
    path('api/session', auth.SessionView.as_view()),
    path('api/song_d/', song.song_d),
    path('api/playlist_d/', song.playlist_d),
    path('api/song_d/<int:id>', song.song),
    path('api/playlist_d/<int:id>', song.playlist),
    path('api/add_track/<int:playlist_id>/<int:song_id>', song.add_track),
    path('api/move_track', song.move_track),
    path('api/delete_track', song.delete_track),
    path('api/post_songs', song.post_songs),
    path('api/edit_songs', song.edit_songs),
    path('api/edit_playlist', song.edit_playlist),
    path('api/get_post_urls', song.get_post_urls),
    path(
        'manifest.json',
        TemplateView.as_view(template_name="manifest.json",
                             content_type='application/manifest+json'),
        name='manifest',
    ),
    re_path(r'^.*$', auth.RootView.as_view()),
    # path('__debug__/', include(debug_toolbar.urls)),
]