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


const StyledSvg = styled.svg`
  cursor: pointer;
  &:hover {
    fill:${props => props.hoverColor};
  }
  fill:${props => props.color};
`;

export const Hover = ({ size, scale, color, hoverColor, Comp, origSize }) => {
  const offset = -origSize * (1 / scale - 1) / 2;
  const length = origSize / scale;
  return <StyledSvg
    viewBox={`${offset} ${offset} ${length} ${length}`}
    width={size} height={size} {...{ color, hoverColor }}>
    <Comp />
  </StyledSvg>
}

export const SvgWrapper = ({ size, scale, Comp, origSize }) => {
  const offset = -origSize * (1 / scale - 1) / 2;
  const length = origSize / scale;
  return <svg viewBox={`${offset} ${offset} ${length} ${length}`}
    width={size} height={size}
  >
    <Comp />
  </svg>
}



export const HoverAccount = props => <Hover {...props} origSize={16} Comp={
  () => <>
    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
    <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
  </>
} />

export const HoverGithub = props => <Hover {...props} origSize={24} Comp={
  () => <>
    <path
      d="M 12.039683,-1.9101289e-4 C 5.3777255,-1.9101289e-4 0,5.3774113 0,12.039218 c 0,5.297339 3.451376,9.792052 8.267249,11.397306 0.642117,0.08027 0.802646,-0.240787 0.802646,-0.561839 v -2.08683 C 5.698783,21.510219 4.9764025,19.1826 4.9764025,19.1826 4.4145508,17.818134 3.6119047,17.41682 3.6119047,17.41682 c -1.1237034,-0.722365 0.080268,-0.722365 0.080268,-0.722365 1.2039691,0.08027 1.8460852,1.203942 1.8460852,1.203942 C 6.581697,19.74444 8.347518,19.1826 9.069898,18.86155 9.150168,18.058922 9.471221,17.577345 9.872544,17.256295 7.2238131,16.935244 4.4145544,15.891828 4.4145544,11.316853 c 0,-1.284203 0.4815874,-2.4078819 1.2039678,-3.2105099 C 5.4579935,7.7852929 5.0566705,6.581352 5.6987902,4.8958348 c 0,0 1.0434391,-0.3210508 3.2908468,1.2039409 0.963175,-0.2407882 2.006614,-0.4013137 3.050053,-0.4013137 1.04344,0 2.086879,0.1605255 3.050053,0.4013137 2.327673,-1.5249917 3.290848,-1.2039409 3.290848,-1.2039409 0.642116,1.6855172 0.240793,2.8894581 0.08027,3.2105083 0.802645,0.802628 1.203968,1.9263069 1.203968,3.2105099 0,4.655239 -2.809259,5.618391 -5.45799,5.939442 0.401323,0.401313 0.802646,1.123678 0.802646,2.247357 v 3.29077 c 0,0.321051 0.240793,0.722365 0.802646,0.56184 4.815872,-1.605255 8.186984,-6.099967 8.186984,-11.397307 C 24.079385,5.3774113 18.701654,-1.9101289e-4 12.039696,-1.9101289e-4 Z"
    />
  </>
} />

export const HoverLinkedin = props => <Hover {...props} origSize={24} Comp={
  () => <>
    <path
      d="M 20.449136,20.449793 H 16.893088 V 14.88096 c 0,-1.32794 -0.02371,-3.037409 -1.849517,-3.037409 -1.852109,0 -2.135482,1.446844 -2.135482,2.940731 v 5.665141 H 9.35204 V 8.9976456 h 3.413807 v 1.5650064 h 0.04778 c 0.696095,-1.1901624 1.990397,-1.9010004 3.368247,-1.8498564 3.604203,0 4.26874,2.3706614 4.26874,5.4547444 z M 5.3396305,7.4322684 C 3.5010137,7.4325984 2.5801652,5.2099932 3.8798725,3.9098412 5.1795802,2.6096868 7.40255,3.5297232 7.40288,5.3683104 7.4030845,6.5079984 6.4793362,7.4320632 5.3396305,7.4322684 M 7.1176553,20.449793 H 3.5579016 V 8.9976456 H 7.1176553 Z M 22.221976,0.0028368 H 1.7709868 C 0.8044308,-0.0080724 0.0117962,0.7661496 0,1.7326788 V 22.268164 c 0.011388,0.966996 0.803963,1.741982 1.7709868,1.731695 H 22.221976 C 23.190912,24.012003 23.986586,23.237069 24,22.268164 V 1.7311968 C 23.986188,0.7627584 23.190444,-0.011418 22.221976,0.0013548"
    />
  </>
} />





export const SearchIcon = props => <SvgWrapper {...props} origSize={24} Comp={
  () => <>
    <path
      d="m 17.152659,15.09434 h -1.084048 l -0.38422,-0.370498 C 17.02916,13.15952 17.838765,11.128645 17.838765,8.9193825 17.838765,3.9931389 13.845626,0 8.919383,0 3.9931389,0 0,3.9931389 0,8.9193825 c 0,4.9262435 3.9931389,8.9193825 8.919383,8.9193825 2.209262,0 4.240137,-0.809605 5.804459,-2.154374 l 0.370498,0.38422 v 1.084048 L 21.955403,24 24,21.955403 Z m -8.233276,0 c -3.4168101,0 -6.1749576,-2.758148 -6.1749576,-6.1749575 0,-3.4168096 2.7581475,-6.1749571 6.1749576,-6.1749571 3.416809,0 6.174957,2.7581475 6.174957,6.1749571 0,3.4168095 -2.758148,6.1749575 -6.174957,6.1749575 z"
    />
  </>
} />

export const HoverPlaylist = props => <SvgWrapper {...props} origSize={24} Comp={
  () => <>
    <path
      d="M14 6H4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zm0 4H4c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1zM4 16h6c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM19 6c-1.1 0-2 .9-2 2v6.18c-.31-.11-.65-.18-1-.18-1.84 0-3.28 1.64-2.95 3.54.21 1.21 1.2 2.2 2.41 2.41 1.9.33 3.54-1.11 3.54-2.95V8h2c.55 0 1-.45 1-1s-.45-1-1-1h-2z"
    />
  </>
} />


export const HoverPlus = props => <Hover {...props} origSize={16} Comp={
  () => <>
    <path
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
    />
    <path
      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
    />
  </>
} />






