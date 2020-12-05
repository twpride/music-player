

import React, { useEffect, useRef, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'


const AlbumArtImg = styled.img`
  max-width:500px;
  object-fit:scale-down;
  margin:auto;
/* flex-grow:1; */
`

export default function Visualizer({  }) {
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
      setAlbumArt(song.album_art_url)
    }
  }, [track])



  return <AlbumArtImg src={albumArt} />

}
