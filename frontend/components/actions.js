import * as APIUtil from './api_util';
export const RECEIVE_SONG = "RECEIVE_SONG"
export const RECEIVE_SONGS = "RECEIVE_SONGS"
export const RECEIVE_SONG_URL = "RECEIVE_SONG_URL"
export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST"
export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST"
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

export const receivePlaylist = (id, playlist) => ({
  type: RECEIVE_PLAYLIST,
  id,
  playlist
})

export const updatePlaylist = (id, dragIdx, hoverIdx) => ({
  type: RECEIVE_PLAYLIST,
  id,
  dragIdx,
  hoverIdx
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
    .then(linkedList => {
      console.log(linkedList)
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

      return sortedList;
    })
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