import React from 'react'

const Hero = () => {
  return (
    <div className="flex h-full min-h-0 flex-1">
      <div className="app-container flex h-full min-h-0 flex-1 flex-col justify-start px-4 py-6 sm:px-8 sm:py-8 md:justify-center md:px-10 md:py-0">
        <div className="max-w-[11ch] text-[clamp(32px,13vw,58px)] leading-[0.95] sm:max-w-none md:inline-flex md:w-fit md:max-w-none md:text-[clamp(64px,10vh,120px)] md:whitespace-nowrap">
          Lemon&apos;s learning Library.
        </div>
        <div className="hero-line-draw mt-5 flex w-full max-w-[42rem] translate-x-0 flex-col items-start gap-2.5 pl-3 text-[clamp(15px,4.1vw,22px)] leading-[1.5] md:mt-2 md:w-fit md:max-w-none md:translate-x-[0.08em] md:pl-5 md:text-[clamp(22px,4.8vh,48px)] md:leading-[1.35]">
          A collection of the best resources for learning development from the Internet,
          handle-picked and created by{' '}
          <a
            className="font-extrabold hover-wipe inline-block"
            href="https://github.com/Lemonadeccc"
            target="_blank"
            rel="noreferrer noopener"
          >
            Lemonadeccc
          </a>
          {' '}
          Learning and sharing some articles about AI, development.
          {' '}
          If you like my project or ideas, you can subscribe to my{' '}
          <a
            href="/rss.xml"
            target="_blank"
            rel="noreferrer noopener"
            className="hover-wipe inline-block font-extrabold text-text"
          >
            RSS feed
          </a>
          {' '}
          or{' '}
          <a
            href="/rss-zh.xml"
            target="_blank"
            rel="noreferrer noopener"
            className="hover-wipe inline-block font-extrabold text-text"
          >
            RSS feed (zh-CN)
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
