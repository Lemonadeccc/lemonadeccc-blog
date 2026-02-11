import React from 'react'

const Hero = () => {
  return (
    <div className="border-t-1 border-t-white flex-1 flex">
      <div className="app-container flex-1">
        <div className="w-full flex text-[64px] md:text-[128px]">
          Lemonadeccc's learning Library.
        </div>
        <div className="ml-5 pl-5 w-full flex flex-col text-[28px] border-l-2 border-l-white gap-2 leading-[1.4]">
          a collection of the best resources for learning frontend development from the Internet,
          handle-picked and created by <a className="font-semibold underline underline-offset-4 decoration-2" href="https://github.com/Lemonadeccc">Lemonadeccc</a>
        </div>
      </div>
    </div >

  )
}

export default Hero
