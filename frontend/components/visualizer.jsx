

import React, { useEffect, createRef } from 'react';
import styled from 'styled-components'


import butterchurn from 'butterchurn'
import butterchurnPresets from 'butterchurn-presets'


const VisualizerDiv = styled.div``

export default function Visualizer({audSource}) {


  let presets = {};
  Object.assign(presets, butterchurnPresets.getPresets());
  const presetArr = Object.values(presets)

  let visualizer;
  let canvas = createRef()

  useEffect(() => {

    visualizer = butterchurn.createVisualizer(audSource.context, canvas.current , {
      width: 400,
      height: 400,
      pixelRatio: window.devicePixelRatio || 1,
      textureRatio: 1,
    });

    visualizer.loadPreset(presetArr[0], 0)


    visualizer.connectAudio(audSource)
    startRenderer()
  }, [])

  function startRenderer() {
    requestAnimationFrame(() => startRenderer());
    visualizer.render();
  }

  return <VisualizerDiv>
    <canvas
      width={400}
      height={400}
      ref={canvas}
    />
  </VisualizerDiv>
}
