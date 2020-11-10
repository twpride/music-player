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
  fetch('/api/songs/', {
    method: 'POST',
    body: song,
    headers: fetchHeader(),
  })
);

export const getSongs = () => (
  fetch('/api/songs/', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const getSongUrl = id => (
  fetch(`/api/songs/${id}`, {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const createPlaylist = playlist => (
  fetch('/api/playlists/', {
    method: 'POST',
    body: playlist,
    headers: fetchHeader(),
  })
);

export const addToPlaylist = (playlist,song) => (
  fetch(`/api/entries/${playlist}/${song}`, {
    method: 'POST',
    headers: fetchHeader(),
  })
);

export const getPlaylists = () => (
  fetch('/api/playlists/', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const getPlaylist = (id) => (
  fetch(`/api/playlists/${id}`, {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const moveTrack = req => (
  fetch('/api/move_track', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: fetchHeader(),
  })
);
