import * as APIUtil from '../util/api_util';
import { login } from '../util/session_api_util';
import { session_act } from '../reducers/session_reducer'
import { ent_act } from '../reducers/root_reducer'


export const postSongs = songs => dispatch => (
  APIUtil.postSongs(songs)
    .then(response => response.json())
    .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }))
)

export const editSongs = song => dispatch => (
  APIUtil.editSongs(song)
    .then(response => response.json())
    .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }))
)

export const editPlaylist = playlistEdit => dispatch => (
  APIUtil.editPlaylist(playlistEdit)
    .then(response => response.json())
    .then(playlistTitleD => dispatch({ type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD}))
)

export const getSongD = () => dispatch => (
  APIUtil.getSongD()
    .then(response => response.json())
    .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }))
)

export const getSongUrl = id => dispatch => (
  APIUtil.getSongUrl(id)
    .then(response => response.json())
    .then(url => dispatch({ type: ent_act.RECEIVE_SONG_URL, url }))
)

export const getPlaylistTitleD = () => dispatch => (
  APIUtil.getPlaylistTitleD()
    .then(response => response.json())
    .then(playlistTitleD => dispatch(
      { type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD }
    ))
)


export const getPlaylist = playlist_id => async dispatch => {
  const response = await APIUtil.getPlaylist(playlist_id)
  const linkedList = await response.json()
  const playlist = orderPlaylist(linkedList)

  dispatch({ type: ent_act.RECEIVE_PLAYLIST, playlist_id, playlist })
}

export const orderPlaylist = (linkedList) => {
  let playlist = [];
  let map = new Map();
  let currentId = null;
  // index the linked list by previous_item_id 
  // we use prev because we rely on prev==null to identify list head
  for (let i = 0; i < linkedList.length; i++) {
    let item = linkedList[i];
    if (item[2] === null) {
      currentId = item[1];
      playlist.push(item);
    } else {
      map.set(item[2], i);
    }
  }
  while (playlist.length < linkedList.length) {
    // get the item with a previous item ID referencing the current item
    let nextItem = linkedList[map.get(currentId)];
    playlist.push(nextItem);
    currentId = nextItem[1];
  }
  return playlist
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