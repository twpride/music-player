import * as APIUtil from './api_util';
export const RECEIVE_SONG = "RECEIVE_SONG"
export const RECEIVE_SONGS = "RECEIVE_SONGS"

export const receiveSong = ( song ) => ({
    type: RECEIVE_SONG,
    song
})

export const receiveSongs = ( songs ) => ({
    type: RECEIVE_SONGS,
    songs
})

export const createSong = song => dispatch => (
  APIUtil.createSong(song)
    .then(newSong => dispatch(receiveSong(newSong)))
)

export const getSongs = () => dispatch => (
  APIUtil.getSongs()
    .then(newSong => dispatch(receiveSongs(newSong)))
)