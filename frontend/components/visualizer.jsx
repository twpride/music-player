

import React, { useEffect, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'


const VisualizerDiv = styled.div``

export default function Visualizer({audSource}) {

  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);

  let visualizer;
  let canvas = createRef();

  let [albumArt, setAlbumArt] = useState(null);
  useEffect(() => {
    // visualizer = butterchurn.createVisualizer(audSource.context, canvas.current , {
    //   width: 400,
    //   height: 400,
    //   pixelRatio: window.devicePixelRatio || 1,
    //   textureRatio: 1,
    // });

    // visualizer.loadPreset(presetArr[2], 0)


    // visualizer.connectAudio(audSource)
    // startRenderer()
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

  function startRenderer() {
    requestAnimationFrame(() => startRenderer());
    visualizer.render();
  }

  return <VisualizerDiv>
    {/* <canvas
      width={400}
      height={400}
      ref={canvas}
    /> */}
    <img src={albumArt}/>
  </VisualizerDiv>
}
