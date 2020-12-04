

import React, { useEffect,useRef, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'


const VisualizerDiv = styled.div``

export default function Visualizer({ audSource }) {

  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);

  // audSource.fftSize = 4096;
  audSource.fftSize = 16384;
  const bufferLength = audSource.frequencyBinCount 
  let dataArray = new Uint8Array(bufferLength)
  audSource.getByteTimeDomainData(dataArray)

  let canvasRef = useRef();

  let [albumArt, setAlbumArt] = useState(null);

  useEffect(() => {
    // let canvas = document.getElementById('canvv')
    startRenderer()
  },[])

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

  function startRenderer() {
    let canvas = canvasRef.current;
    requestAnimationFrame(startRenderer);
    audSource.getByteFrequencyData(dataArray)
    // audSource.getByteTimeDomainData(dataArray)
  
    const ctx = canvas.getContext("2d")
    const h = canvas.height
    const w = canvas.width
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, w, h);
    var barWidth = (w / bufferLength)*3;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]/2*5;

      // ctx.fillStyle = 'rgb(' + (barHeight) + ',50,50)';
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(x,h-barHeight/2,barWidth,barHeight);

      x += barWidth + 1;
    }
    ctx.font = '48px serif';

    ctx.fillText(Math.max(...dataArray), 10, 50);
  }

  return <VisualizerDiv>
    <canvas
      width={1200}
      height={400}
      ref={canvasRef}
    />
    {/* <img src={albumArt} /> */}
  </VisualizerDiv>
}
