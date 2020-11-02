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
})

export const createSong = song => (
  fetch('/api/song', {
    method: 'POST',
    body: song,
    headers: fetchHeader(),
  })
);

export const getSongs = song => (
  fetch('/api/song', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

