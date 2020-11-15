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

// export const createSong = song => (
//   fetch('/api/song_d/', {
//     method: 'POST',
//     body: song,
//     headers: fetchHeader(),
//   })
// );

export const postSong = song => (
  fetch(`https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url=${song}`, {
    method: 'POST',
    // headers: {
    //   // "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    //   // "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
    //   // "X-CSRFToken": getCookie('csrftoken')
    // },
    // mode: 'no-cors'
  })
);

export const getSongD = () => (
  fetch('/api/song_d/', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const getSongUrl = id => (
  fetch(`/api/song_d/${id}`, {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const createPlaylist = playlist => (
  fetch('/api/playlist_d/', {
    method: 'POST',
    body: playlist,
    headers: fetchHeader(),
  })
);

export const addTracK = (playlist, song) => (
  fetch(`/api/add_track/${playlist}/${song}`, {
    method: 'POST',
    headers: fetchHeader(),
  })
);

export const getPlaylistTitleD = () => (
  fetch('/api/playlist_d/', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const getPlaylist = (id) => (
  fetch(`/api/playlist_d/${id}`, {
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
