from django.shortcuts import render

from django.http import HttpResponse
from django.views import View
from .models import User
import json
from django.forms.models import model_to_dict

from django.http import JsonResponse


class CustomView(View):

  def setup(self, request, *args, **kwargs):
    super().setup(request, *args, **kwargs)
    self.current_user = None

  def get_current_user(self):
    if not self.current_user:
      curr_user = User.objects.filter(
        session_token=self.request.session.get('session_token', None))
      if curr_user:
        self.current_user = curr_user[0]
    return self.current_user

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
    # camel2snake # name[0].lower() + re.sub(r'(?!^)[A-Z]', lambda x: '_' + x.group(0).lower(), name[1:])
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
    print(response, "whatt")
    
    context = {'response': json.dumps(response)}
    return render(request, 'root.html', context)


class UserView(CustomView):

  def get(self, request):
    if self.logged_in():
      return HttpResponse("logged in")
    else:
      return HttpResponse("not logged in")

  def post(self, request):

    req_json = json.loads(request.body.decode('utf-8'))

    self.user = User.pre_init(**req_json)

    try:
      self.user.full_clean()
    except:
      return JsonResponse(["Invalid submission. Please try again."], safe=False, status=422)

    self.user.save()
    self.log_in(self.user)

    return self.success()


class SessionView(CustomView):

  def post(self, request):
    req_json = json.loads(request.body.decode('utf-8'))
    email = req_json['email']
    password = req_json['password'].encode('utf-8')
    self.user = User.find_by_credentials(email, password)
    if self.user:
      self.log_in(self.user[0])
      return self.success()
    else:
      return JsonResponse(["The email or password you entered isn't quite right."], safe=False, status=401)

  def delete(self, request):
    if self.logged_in():
      self.log_out()
      return self.success()
    else:
      return JsonResponse({"msg" :"Nobody signed in"}, status=404)
