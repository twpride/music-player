

import React, { useEffect,useRef, createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'


const VisualizerDiv = styled.div`
  width:800px;
`

export default function Visualizer({ audSource }) {
  
  const [canvSize, setCanvSize] = useState([800,400])
  const songD = useSelector(state => state.entities.songD);
  const playlistD = useSelector(state => state.entities.playlistD);
  const track = useSelector(state => state.player.track);

  audSource[0].fftSize = 8192;
  const bufferLength = audSource[0].frequencyBinCount 
  // const maxFreq = audSource[0].context.sampleRate /2;
  // const cellFreqPitch = maxFreq/(bufferLength-1)

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
  },[])

  function startRenderer() {
    let canvas = canvasRef.current;
    requestAnimationFrame(startRenderer);
    audSource[0].getByteFrequencyData(dataArray)
  
    const ctx = canvas.getContext("2d")
    const h = canvas.height
    const w = canvas.width
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, w, h);
    var barWidth = 1;
    var barHeight;
    var x = 0;

      // ctx.fillStyle = 'rgb(255,255,255)';
      // ctx.fillRect(x,h-barHeight/2,barWidth,barHeight);
      ctx.strokeStyle = "#FF0000";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(800, 400);
    ctx.stroke(); 

    for(var i = 0; i < bufferLength; i++) {
    // sixteenloc = Math.floor(16000/cellFreqPitch)
    // for(var i = sixteenloc-100; i < sixteenloc+100; i++) {
      barHeight = dataArray[i]/2*5;
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(x,h-barHeight/2,barWidth,barHeight);
      x += barWidth + 1;
    }
  }

  return <VisualizerDiv>
    <canvas
      width = {canvSize[0]}
      height = {canvSize[1]}
      ref={canvasRef}
    />
    {/* <img src={albumArt} /> */}
  </VisualizerDiv>
}
