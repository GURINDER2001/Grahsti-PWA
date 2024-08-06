import React from 'react'

const Logo = ({size, color="#999999", ...props}:any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width={size} height={size} viewBox="0 0 233.000000 235.000000" preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,235.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
    <path d="M462 1897 l-142 -142 0 -440 0 -440 143 -143 142 -142 303 0 302 0 0 145 0 145 -205 0 -205 0 0 580 0 580 -98 0 -97 0 -143 -143z"/>
    <path d="M880 1895 l0 -145 175 0 174 0 3 -67 3 -68 240 0 240 0 3 66 3 66 -127 147 -127 146 -294 0 -293 0 0 -145z"/>
    <path d="M1057 1383 c-9 -8 -9 -236 -1 -257 5 -13 25 -16 120 -16 l114 0 0 -260 0 -260 213 2 212 3 3 398 2 397 -328 0 c-181 0 -332 -3 -335 -7z"/>
    </g>
    </svg>
  )
}

export default Logo