import React from 'react'

const ArrowIcon = ({ dimension, color, directionClass = "rotate-0" }: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${directionClass}`} width={dimension} height={dimension} viewBox="0 0 24 24" fill="none">
      <path d="M17 12L8 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 8L7 12L11 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ArrowIcon


