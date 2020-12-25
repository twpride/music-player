import React from 'react';
import styled from 'styled-components';

export const Spinner = ({ size, color }) => (
  <StyledSpinner viewBox={`0 0 ${size} ${size}`} size={size} color={color}>
    <circle
      className="path"
      cx={`${size / 2}`}
      cy={`${size / 2}`}
      r={`${size * 0.4}`}
      fill="none"
      strokeWidth={`${size * 0.08}`}
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  /* margin: -25px 0 0 -25px; */
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  
  & .path {
    stroke: ${props => props.color};
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const SvgWrapper = styled.div`
  cursor: pointer;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  &:hover svg {
    fill:${props => props.hoverColor};
  }
  svg {
    fill:${props => props.color};
  }
`;


export const HoverPlus = ({ size, color, hoverColor}) => (
  <SvgWrapper color={color} hoverColor={hoverColor}>
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </svg>
  </SvgWrapper>
)


export const HoverPlaylist = ({ size, color, hoverColor}) => (
  <SvgWrapper color={color} hoverColor={hoverColor}>
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <path
        d="M14 6H4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zm0 4H4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zM4 16h6c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM19 6c-1.1 0-2 .9-2 2v6.18c-.31-.11-.65-.18-1-.18-1.84 0-3.28 1.64-2.95 3.54.21 1.21 1.2 2.2 2.41 2.41 1.9.33 3.54-1.11 3.54-2.95V8h2c.55 0 1-.45 1-1s-.45-1-1-1h-2z" />
    </svg>
  </SvgWrapper>
)