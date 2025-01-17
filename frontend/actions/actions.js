import * as APIUtil from '../util/api_util';
import { login } from '../util/session_api_util';
import { ent_act, session_act } from '../reducers/root_reducer'
import { ytdlAPI } from '../components/search_box'

export const postSongs = songs => dispatch => (
  APIUtil.postSongs(songs)
    .then(response => response.json())
    .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }))
)

export const editSongs = song => dispatch => (
  APIUtil.editSongs(song)
    .then(response => response.json())
    .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D_EDIT, songD }))
)

export const editPlaylist = playlistEdit => dispatch => (
  APIUtil.editPlaylist(playlistEdit)
    .then(response => response.json())
    .then(playlistTitleD => dispatch({ type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD }))
)


export const getSongUrl = id => dispatch => {
  if (id.length) {
    fetch(ytdlAPI + '?get=' + id)
      .then(response => response.json())
      .then(url => dispatch({ type: ent_act.RECEIVE_SONG_URL, url }))
  } else {
    APIUtil.getSongUrl(id)
      .then(response => response.json())
      .then(url => dispatch({ type: ent_act.RECEIVE_SONG_URL, url }))
  }
}


export const loginThunk = user => async dispatch => {
  const res = await login(user);
  if (res.ok) {
    const currentUser = await res.json();
    dispatch({ type: session_act.RECEIVE_CURRENT_USER, currentUser });
  } else {
    const errors = await res.json();
    dispatch({ type: session_act.RECEIVE_SESSION_ERRORS, errors });
  }
}


export const createPlaylist = playlist => dispatch => (
  APIUtil.createPlaylist(playlist)
    .then(response => response.json())
    .then(playlistTitleD => dispatch(
      { type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD }
    ))
)


export const getPlaylist = playlist_id => async dispatch => {
  const response = await APIUtil.getPlaylist(playlist_id)
  const playlist = await response.json()
  dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist })
}