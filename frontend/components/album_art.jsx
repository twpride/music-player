

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'



export const SpinningRecord = ({ xx, color }) => {
  const size= 800;
  const od=700;
  const id=30;
  const r=(od+id)/4;
  const sw=(od-id)/2;

  const od2=240;
  const id2=20;
  const r2=(od2+id2)/4;
  const sw2=(od2-id2)/2;

  return <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <circle
      className="path"
      cx={`${size/2}`}
      cy={`${size/2}`}
      r={r}
      fill="none"
      strokeWidth={sw}
      stroke="#111"
    />
      <circle
      className="path"
      cx={`${size/2}`}
      cy={`${size/2}`}
      r={r2}
      fill="none"
      strokeWidth={sw2}
      stroke="#ad0f37"
    />
  </svg>
};






const AlbumArtDiv = styled.div`
  flex:1 1 50%;
  display:flex;
  img, svg {
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
      if (!song) song = {};

      if (song.album_art_url && song.album_art_url != "n/a") {
        setAlbumArt(song.album_art_url)
      } else {
        // setAlbumArt('https://raw.githubusercontent.com/twpride/music-player-1/main/assets/vinyl-album.png')
        setAlbumArt(null)
      }
    }
  }, [track])

  return <AlbumArtDiv>
    {albumArt ?
      <img src={albumArt} /> :
      <SpinningRecord size={100} color="#ad0f37" />
    }
  </AlbumArtDiv>

}
