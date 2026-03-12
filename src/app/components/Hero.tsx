import React from 'react'

const Hero = () => {
  return (
    <div className="flex h-full min-h-0 flex-1">
      <div className="app-container flex h-full min-h-0 flex-1 flex-col justify-center py-2 sm:py-3 md:py-0">
        <div className="mx-4 text-[clamp(32px,9vw,56px)] leading-[0.95] sm:mx-8 md:mx-10 md:inline-flex md:w-fit md:text-[clamp(64px,10vh,120px)] md:whitespace-nowrap">
          Lemon&apos;s learning Library.
        </div>
        <div className="hero-line-draw mx-4 mt-3 w-full max-w-full flex translate-x-[0.08em] flex-col items-start gap-2 pl-4 text-[clamp(15px,4vw,22px)] leading-[1.45] sm:mx-8 md:mx-10 md:mt-2 md:w-fit md:pl-5 md:text-[clamp(22px,4.8vh,48px)] md:leading-[1.35]">
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
          Learning and sharing some articles about AI, development.
          <br />
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
