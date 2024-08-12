import React from 'react'

const MiscIcon = ({ dimension, color }: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={dimension} height={dimension} viewBox="0 0 20 20" fill="none">
      <path fill={color} fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm10.01 4a1 1 0 01-1 1H10a1 1 0 110-2h.01a1 1 0 011 1zM11 6a1 1 0 10-2 0v5a1 1 0 102 0V6z" />
    </svg>
  )
}

export default MiscIcon


