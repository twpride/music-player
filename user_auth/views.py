from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import User
import json
from django.forms.models import model_to_dict

from django.http import JsonResponse
from django.core import serializers


class CustomView(View):

  def setup(self, request, *args, **kwargs):
    super().setup(request, *args, **kwargs)
    self.current_user = None

  def get_current_user(self):
    if self.current_user:
      return self.current_user
    if token := self.request.session.get('session_token', None):
      if curr_user := User.objects.filter(session_token=token):
        self.current_user = curr_user[0]
      return self.current_user
    else:
      return None

  def logged_in(self):
    return not not self.get_current_user()

  def log_out(self):
    self.get_current_user().reset_session_token
    self.request.session['session_token'] = None
    self.current_user = None

  def log_in(self, user):
    self.request.session['session_token'] = user.reset_session_token()
    self.current_user = user

  def success(self):
    if self.current_user:
      response = model_to_dict(self.current_user, fields=['id', 'first_name'])
      response['firstName'] = response.pop('first_name')
    else:
      response = {}
    return JsonResponse(response)


class RootView(CustomView):

  def get(self, request):
    cur = self.get_current_user()
    if cur:
      response = model_to_dict(cur, fields=['id', 'first_name'])
      response['firstName'] = response.pop('first_name')
    else:
      response = {}
    context = {'response': json.dumps(response)}
    return render(request, 'root.html', context)


class UserView(CustomView):

  def get(self, request):
    if self.logged_in():
      return HttpResponse("logged in")
    else:
      return HttpResponse("not logged in")

  def post(self, request):
    # req_json = json.loads(request.body.decode('utf-8'))
    # breakpoint()
    req_json = request.POST
    self.user = User.pre_init(**req_json)
    try:
      self.user.full_clean()
    except:
      return JsonResponse(["Invalid submisxion. Please try again."],
                          safe=False,
                          status=422)
    self.user.save()
    self.log_in(self.user)
    return self.success()


class SessionView(CustomView):

  def post(self, request):
    # req_json = json.loads(request.body.decode('utf-8'))
    req_json = request.POST

    email = req_json['email']
    password = req_json['password'].encode('utf-8')
    self.user = User.find_by_credentials(email, password)
    if self.user:
      self.log_in(self.user[0])
      return self.success()
    else:
      return JsonResponse(
          ["The email or password you entered isn't quite right."],
          safe=False,
          status=401)

  def delete(self, request):
    if self.logged_in():
      self.log_out()
      return self.success()
    else:
      return JsonResponse({"msg": "Nobody signed in"}, status=404)
