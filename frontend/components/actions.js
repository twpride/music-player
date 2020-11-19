import * as APIUtil from './api_util';
export const RECEIVE_SONG = "RECEIVE_SONG"
export const RECEIVE_SONG_D = "RECEIVE_SONG_D"
export const RECEIVE_SONG_URL = "RECEIVE_SONG_URL"
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST"
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST"
export const RECEIVE_PLAYLIST_TITLE_D = "RECEIVE_PLAYLIST_TITLE_D"

export const receiveSong = (song) => ({
  type: RECEIVE_SONG,
  song
})

export const receiveSongD = (songD) => ({
  type: RECEIVE_SONG_D,
  songD
})

export const loadSongUrl = (url) => ({
  type: RECEIVE_SONG_URL,
  url
})

export const receivePlaylist = (id, playlist) => ({
  type: RECEIVE_PLAYLIST,
  id,
  playlist
})

export const receivePlaylistTitleD = (playlistTitleD) => ({
  type: RECEIVE_PLAYLIST_TITLE_D,
  playlistTitleD
})

export const updatePlaylist = (id, dragIdx, hoverIdx) => ({
  type: RECEIVE_PLAYLIST,
  id,
  dragIdx,
  hoverIdx
})

export const postSongs = songs => dispatch => (
  APIUtil.postSongs(songs)
    .then(response => response.json())
    .then(songD => dispatch(receiveSongD(songD)))
)

export const editSongs = (song)=> dispatch => (
  APIUtil.editSongs(song)
    .then(response => response.json())
    .then(songD => dispatch(receiveSongD(songD)))
)

export const getSongD = () => dispatch => (
  APIUtil.getSongD()
    .then(response => response.json())
    .then(songD => {
      dispatch(receiveSongD(songD))
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
  APIUtil.createPlaylist(playlist)
    .then(response => response.json())
    .then(songD => dispatch(receiveSongD(songD)))
)

export const getPlaylist = id => async dispatch => {
  const response = await APIUtil.getPlaylist(id)
  const linkedList = await response.json()
  let sortedList = [];
  let map = new Map();
  let currentId = null;

  // index the linked list by previous_item_id
  for (let i = 0; i < linkedList.length; i++) {
    let item = linkedList[i];
    if (item[2] === null) {
      currentId = item[1];
      sortedList.push(item);
    } else {
      map.set(item[2], i);
    }
  }

  while (sortedList.length < linkedList.length) {
    // get the item with a previous item ID referencing the current item
    let nextItem = linkedList[map.get(currentId)];
    sortedList.push(nextItem);
    currentId = nextItem[1];
  }

  dispatch(receivePlaylist(id, sortedList))
}



export const getPlaylistTitleD = () => dispatch => (
  APIUtil.getPlaylistTitleD()
    .then(response => response.json())
    .then(titleD => {
      dispatch(receivePlaylistTitleD(titleD))
    })
)