

import React, { useEffect, useState, useLayoutEffect, useRef, useCallback, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'








import butterchurn from 'butterchurn'
import butterchurnPresets from 'butterchurn-presets'


const VisualizerDiv = styled.div``

export default function Visualizer() {
  let visualizer;
  let canvas = createRef()
  useEffect(() => {



    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    audioGainNode = audioCtx.createGain()
    audioSourceNode = null




    const aud = document.querySelector('audio')
    visualizer = butterchurn.createVisualizer(aud.context, canvas.current, {
      width: 400,
      height: 400,
    })
  }, [])

  useEffect(()=>{
    if (props.audioSourceNode !== prevProps.audioSourceNode) {
      this.updateAudioSource()
    }

    if (props.isPlaying !== prevProps.isPlaying) {
      this.updatePlaying()
    }

    if (props.width !== prevProps.width || props.height !== prevProps.height) {
      this.visualizer.setRendererSize(props.width, props.height)
    }

    if (props.presetKey !== prevProps.presetKey) {
      this.visualizer.loadPreset(this.presets[props.presetKey], 1) // 2nd arg is # of seconds to blend presets
    }

    if (this.audioGainNode && props.sensitivity !== prevProps.sensitivity) {
      this.audioGainNode.gain.setValueAtTime(props.sensitivity, this.audioGainNode.context.currentTime)
    }
  })

  return <VisualizerDiv>
    <canvas
      width={400}
      height={400}
      ref={canvas}
    />
  </VisualizerDiv>
}
