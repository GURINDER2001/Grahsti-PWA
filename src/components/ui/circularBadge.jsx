import React from 'react'

const CircularBadge = ({letter, colorClass = "bg-yellow-100", dimension = 10, ...props}) => {
  return (
    <div className={`w-10 h-10 leading-10 mx-auto font-bold rounded-full text-center self-center ${colorClass}`}>{letter}</div>
  )
}

export default CircularBadge