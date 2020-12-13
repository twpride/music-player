

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'


const AlbumArtDiv = styled.div`
  flex:.5 .5 50%;
  display:flex;
  width:10%;
  img {
    width:90%;
    height:auto;
    margin: auto;
    max-width:700px;
  }
`

export default function AlbumArt() {
  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);

  let [albumArt, setAlbumArt] = useState(null);

  useEffect(() => {
    if (track) {
      let song;
      if (track[0]) {
        song = songD[playlistD[track[0]][track[1]][0]];
      } else {
        song = Object.values(songD)[track[1]]
      }

      if (song.album_art_url && song.album_art_url!="n/a") {
        setAlbumArt(song.album_art_url)
      } else {
        setAlbumArt('https://music-player-1.s3-us-west-1.amazonaws.com/vinyl-album.jpg')
      }
    }
  }, [track])

  return <AlbumArtDiv>
    <img src={albumArt} />
    </AlbumArtDiv>

}
