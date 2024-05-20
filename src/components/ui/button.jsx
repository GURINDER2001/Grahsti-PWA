import React from 'react'

const Button = ({ varaiant, text, ...props }) => {

    switch (varaiant) {
        case "primary":
            return (
                <button className='bg-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-2 block w-full disabled:opacity-50' {...props}>{text}</button>
            )
        case "secondary":
            return (
                <button className='bg-blue-100 text-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-2 block w-full' {...props}>{text}</button>
            )
        case "ghost":
            return (
                <button className='text-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-2 block w-full' {...props}>{text}</button>
            )
        case "accent":
            return (
                <button className='bg-accent-color py-3 text-center rounded-full text-white font-bold mx-auto mt-2 block w-full' {...props}>{text}</button>
            )
        case "close":
            return (
                <button className=' transition ease-in-out w-8  duration-150 focus:outline-none absolute -right-2 -top-2 m-6 z-10 bg-gray-100 text-gray-300 font-bold rounded-full p-1' {...props}>{text}</button>
            )
        default:
            return (
                <button className='bg-primary-color py-3 text-center rounded-full text-white font-bold mx-auto mt-2 block w-full' {...props}>{text}</button>
            );
    }

}

export default Button