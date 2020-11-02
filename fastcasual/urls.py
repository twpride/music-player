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

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', auth.RootView.as_view() , name="index"),    
    path('api/users', auth.UserView.as_view(), name="user view"),
    path('api/session', auth.SessionView.as_view(), name="session view"),    
    path('api/song', song.SongView.as_view(), name="song view"),    
    path('__debug__/', include(debug_toolbar.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)