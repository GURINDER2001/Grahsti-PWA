import React from 'react'

const CircularBadge = ({letter, ...props}) => {
  return (
    <div className='w-10 h-10 leading-10 mx-auto font-bold rounded-full text-center self-center bg-yellow-100'>{letter}</div>
  )
}

export default CircularBadge