import React, { useEffect, useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'


export default function Aud() {


  return <audio
    // controls
    crossOrigin="anonymous"
    autoPlay src={songUrl}
    onEnded={skip(1)}
    onTimeUpdate={handleTimeUpdate}
  />
}