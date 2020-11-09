import * as APIUtil from './api_util';
export const RECEIVE_SONG = "RECEIVE_SONG"
export const RECEIVE_SONGS = "RECEIVE_SONGS"
export const RECEIVE_SONG_URL = "RECEIVE_SONG_URL"
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST"
export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS"

export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  song
})

export const receiveSongs = (songs) => ({
  type: RECEIVE_SONGS,
  songs
})

export const loadSongUrl = (url) => ({
  type: RECEIVE_SONG_URL,
  url
})

export const receivePlaylist = (id,playlist) => ({
  type: RECEIVE_PLAYLIST,
  id,
  playlist
})

export const createSong = song => dispatch => (
  APIUtil.createSong(song)
    .then(response => response.json())
    .then(newSongs => dispatch(receiveSongs(newSongs)))
)

export const getSongs = () => dispatch => (
  APIUtil.getSongs()
    .then(response => response.json())
    .then(songs => {
      dispatch(receiveSongs(songs))
    })
)

export const getSongUrl = (id) => dispatch => (
  APIUtil.getSongUrl(id)
    .then(response => response.json())
    .then(url => {
      dispatch(loadSongUrl(url))
    })
)

export const createPlaylist = playlist => dispatch => (
  APIUtil.createSong(playlist)
    .then(response => response.json())
    .then(newSongs => dispatch(receiveSongs(newSongs)))
)

export const getPlaylist = (id) => dispatch => (
  APIUtil.getPlaylist(id)
    .then(response => response.json())
    .then(playlist => {
      dispatch(receivePlaylist(id, playlist))
    })
)






export const getPlaylists = () => dispatch => (
  APIUtil.getPlaylists()
    .then(response => response.json())
    .then(playlists => {
      dispatch(receivePlaylists(playlists))
    })
)