function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const fetchHeader = () => ({
  "X-CSRFToken": getCookie('csrftoken'),
  'Accept': 'application/json',
  'Content-Type': 'application/json;charset=UTF-8',      
})

export const login = user => (
  fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: fetchHeader(),
  })
);

export const signup = user => (
  fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: fetchHeader(),
  })
);

export const logout = () => (
  fetch('/api/session', {
    method: 'DELETE',
    headers: fetchHeader(),
  })
);
