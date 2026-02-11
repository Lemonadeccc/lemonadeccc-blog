import React from 'react'

const Hero = () => {
  return (
    <div className="flex-1 flex">
      <div className="app-container flex-1">
        <div className="inline-flex w-fit text-[64px] md:text-[128px] whitespace-nowrap">
          Lemon's learning Library.
        </div>
        <div className="ml-5 pl-5 w-fit max-w-full flex flex-col items-start text-[48px] border-l-2 border-l-white gap-2 leading-[1.4]">
          a collection of the best resources for learning development from the Internet,
          handle-picked and created by <a className="font-semibold hover-wipe inline-block" href="https://github.com/Lemonadeccc" target="_blank" rel="noreferrer noopener">Lemonadeccc</a>
          Learning and sharing some articles about AI, animation, and deployment.
        </div>
      </div>
    </div >

  )
}

export default Hero
