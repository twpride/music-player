

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
  let [albumArt, setAlbumArt] = useState(null);

  useEffect(() => {
    if (track) {
      let song = songD[playlistD[track[0]][track[1]][0]];
      if (!song) song={};

      if (song.album_art_url && song.album_art_url!="n/a") {
        setAlbumArt(song.album_art_url)
      } else {
        setAlbumArt('https://raw.githubusercontent.com/twpride/music-player-1/main/assets/vinyl-album.png')
      }
    }
  }, [track])

  return <AlbumArtDiv>
    <img src={albumArt} />
    </AlbumArtDiv>

}
