

import React, { useEffect, useRef, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'


const VisualizerDiv = styled.div`
flex-grow:1;
canvas {
  width:100%;
  height:100%;
}
`

export default function Visualizer({ audSource }) {
  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);

  audSource[0].fftSize = 8192;
  audSource[0].minDecibels = -50;
  audSource[0].maxDecibels = 0;
  const bufferLength = audSource[0].frequencyBinCount
  const totalFreqRange = audSource[0].context.sampleRate / 2;
  const cellFreqPitch = totalFreqRange / (bufferLength - 1)


  const minFreq = 62.5;
  const maxFreq = 4000;
  const minIdx = Math.floor(minFreq / cellFreqPitch)
  const maxIdx = Math.floor(maxFreq / cellFreqPitch)
  console.log(minIdx,maxIdx,"minmax")
  // const logFreqRange = Math.log(maxFreq-minFreq)
  const logMinFreq = Math.log(minFreq);
  const logMaxFreq = Math.log(maxFreq);

  const logFreqRange = logMaxFreq-logMinFreq;

  const [plot_w, plot_h] = [1000, 1500]

  let cellXCoord = new Uint16Array(maxIdx - minIdx + 1)
  for (let i = 0; i < cellXCoord.length; i++) {
    const logFreqCoord= Math.log(minFreq+i*cellFreqPitch)-logMinFreq
    cellXCoord[i] = logFreqCoord/logFreqRange*plot_w
  }

  console.log(cellFreqPitch,'cellfreqpitch')


  let dataArray = new Uint8Array(bufferLength)
  audSource[0].getByteTimeDomainData(dataArray)

  console.log(dataArray.length, 'lgn')
  console.log(audSource[0].context.sampleRate, 'srrr')


  let canvasRef = useRef();

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


  useEffect(() => {
    startRenderer()
  }, [])

  function startRenderer() {
    requestAnimationFrame(startRenderer);
    audSource[0].getByteFrequencyData(dataArray)

    const ctx = canvas.getContext("2d")
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, plot_w, plot_h);
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.moveTo(cellXCoord[0], plot_h - dataArray[minIdx]);
    for (var i = minIdx+1; i <= maxIdx; i++) {
      const x = cellXCoord[i-minIdx] 
      ctx.lineTo(x, plot_h - dataArray[i]);
    }
    ctx.stroke()
  }

  return <VisualizerDiv>
    <canvas
      ref={canvasRef}
      width={plot_w}
      height={plot_h}
      id='canvas'
    />
    {/* <img src={albumArt} /> */}
  </VisualizerDiv>
}
