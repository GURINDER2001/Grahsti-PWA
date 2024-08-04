import React, { useEffect } from 'react'
import Button from './button'

const BottomCard = (props:any) => {

    const s ={
        root : 
        //  -bottom-[1000px] 
            `fixed bg-white z-20
            p-5  pt-4 left-0 right-0 rounded-tl-2xl rounded-tr-2xl shadow-all-round-strong  duration-500`
          ,
          
          active :
            " bottom-0 duration-500"
          ,
          rootWrapper :
            "fixed left-0 right-[100vw] bottom-[100vh] top-0 transition-opacity duration-10000 overflow-hidden"
            // opacity-0 z-[-100]
          ,
          
          backdrop: " bg-zinc-900",
          
          
          activeWrapper :
            " right-0 bottom-0 opacity-100 transition-opacity duration-500 z-[100]"
          ,
        //   header {
        //     @apply flex justify-between mb-5;
        //   }
          
          
    }
    const { children, active, close, backdrop = true } = props
    const rootClassName = `${s.root} ${s.active}`
    // cn(s.root, {
    //   [s.active]: active,
    // })
    const wrapperClassName = `${s.rootWrapper} ${s.active} ${s.backdrop}`
    // cn(s.rootWrapper, {
    //   [s.activeWrapper]: active,
    //   [s.backdrop]: backdrop,
    // })
  
    useEffect(() => {
      if (active) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      }
      return () => {
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
      }
    }, [active])
    return (
      <div >
        <div
          className={'fixed left-0 right-0 bottom-0 top-0 z-10 transition-opacity duration-500  bg-zinc-500/25 backdrop-blur-sm'}
        //   onClick={close}
        ></div>
        <div className={rootClassName}>
          <Button varaiant={'close'} text='X' onClick={close} aria-label="Close panel" className={" transition ease-in-out w-8  duration-150 focus:outline-none absolute -right-2 -top-2 m-6 z-10 bg-gray-100 text-gray-300 font-bold rounded-full p-1"}/>
  
          {children}
        </div>
      </div>
    )
}

export default BottomCard