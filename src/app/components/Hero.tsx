import React from 'react'

const Hero = () => {
  return (
    <div className="flex-1 flex">
      <div className="app-container flex-1 py-4 md:py-0">
        <div className="mx-4 text-[42px] leading-[0.95] sm:mx-8 sm:text-[56px] md:mx-10 md:inline-flex md:w-fit md:text-[128px] md:whitespace-nowrap">
          Lemon&apos;s learning Library.
        </div>
        <div className="mx-4 mt-5 w-full max-w-full flex flex-col items-start gap-2 border-l-2 border-l-white pl-4 text-[18px] leading-[1.5] sm:mx-8 sm:text-[22px] md:mx-[3.75rem] md:mt-0 md:w-fit md:pl-5 md:text-[48px] md:leading-[1.4]">
          A collection of the best resources for learning development from the Internet,
          handle-picked and created by <a className="font-extrabold hover-wipe inline-block" href="https://github.com/Lemonadeccc" target="_blank" rel="noreferrer noopener">Lemonadeccc</a>
          Learning and sharing some articles about AI, animation, and deployment.
          <br />
          If you like my project or ideas, you can subscribe to my{' '}
          <a
            href="/rss.xml"
            target="_blank"
            rel="noreferrer noopener"
            className="hover-wipe inline-block font-extrabold text-white"
          >
            RSS feed
          </a>
          {' '}or{' '}
          <a
            href="/rss-zh.xml"
            target="_blank"
            rel="noreferrer noopener"
            className="hover-wipe inline-block font-extrabold text-white"
          >
            RSS feed (zh-CN)
          </a>
        </div>
      </div>
    </div >

  )
}

export default Hero
