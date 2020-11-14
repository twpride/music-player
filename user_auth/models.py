import datetime
import secrets
from argon2 import PasswordHasher

from django.db import models
from django.utils import timezone

from django.db import models
import re


# class User(models.Model):
class User(models.Model):
  email = models.CharField(max_length=100, unique=True)
  password_digest = models.CharField(max_length=100)
  session_token = models.CharField(max_length=100)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  phone_number = models.CharField(max_length=10)
  ph = PasswordHasher()

  def pre_init(**kwargs):

    camel2snake = lambda str: re.sub('(((?<=[a-z])[A-Z])|([A-Z](?![A-Z]|$)))',
                                     '_\\1', str).lower().strip('_')

    newkwargs = dict()

    for k, v in kwargs.items():
      if k == "password":
        newkwargs['password_digest'] = User.ph.hash(v[0])
        continue
      newkwargs[camel2snake(k)] = v[0]

    newkwargs['session_token'] = secrets.token_urlsafe(16)

    return User(**newkwargs)

  def reset_session_token(self):
    self.session_token = secrets.token_urlsafe(16)
    self.save()
    return self.session_token

  def find_by_credentials(email, password):
    if (user :=
        User.objects.filter(email=email)) and user[0].is_password(password):
      return user

  def is_password(self, password):
    try:
      return User.ph.verify(self.password_digest, password)
    except:
      return False

  def __str__(self):
    return self.email