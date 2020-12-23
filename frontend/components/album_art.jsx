

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'


const AlbumArtDiv = styled.div`
  flex:1 1 50%;
  display:flex;
  img {
    margin:auto;
    max-height:90%;
    max-width:90%;
  }
`

export default function AlbumArt() {
  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);
  const songs_playlist = useSelector(state => state.entities.playlistD.songs_playlist)
  let [albumArt, setAlbumArt] = useState(null);

  useEffect(() => {
    if (track) {
      let song;
      if (track[0]) {
        song = songD[playlistD[track[0]][track[1]][0]];
      } else {
        // song = songD[songs_playlist[[track[1]]]]
        song = Object.values(songD)[track[1]]
      }

      if (song.album_art_url && song.album_art_url!="n/a") {
        setAlbumArt(song.album_art_url)
      } else {
        setAlbumArt('https://raw.githubusercontent.com/twpride/music-player-1/main/assets/vinyl-album.jpg')
      }
    }
  }, [track])

  return <AlbumArtDiv>
    <img src={albumArt} />
    </AlbumArtDiv>

}
