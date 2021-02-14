import datetime
import secrets
from argon2 import PasswordHasher

from django.db import models
from django.utils import timezone

from django.db import models
import re


class User(models.Model):
  email = models.CharField(max_length=100, unique=True)
  password_digest = models.CharField(max_length=100)
  date_added = models.DateTimeField(auto_now_add=True)
  dark_mode = models.BooleanField()
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

    return User(**newkwargs)

  def find_by_credentials(email, password):
    if ((user := User.objects.filter(email=email)) and
        user[0].is_password(password)):
      return user

  def is_password(self, password):
    try:
      return User.ph.verify(self.password_digest, password)
    except:
      return False

  def __str__(self):
    return self.email

class Session(models.Model):
  token = models.CharField(max_length=100)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  def new(user):
    token = secrets.token_urlsafe(16)
    Session.objects.create(user=user, token=token)
    return token
