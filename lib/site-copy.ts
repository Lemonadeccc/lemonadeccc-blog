import type { Metadata } from "next";
import type { SiteLocale } from "./site-locale";

const siteCopy = {
  en: {
    metadata: {
      home: {
        title: "Lemonadeccc",
        description: "My Role — Developer",
      },
      archive: {
        title: "Archive | Lemonadeccc",
        description: "Posts, portfolio, and more.",
      },
      info: {
        title: "Info | Lemonadeccc",
        description: "About Lemonadeccc — Developer, Builder.",
      },
      contact: {
        title: "Contact | Lemonadeccc",
        description: "Get in touch.",
      },
    },
    nav: {
      archive: "Archive",
      info: "Info",
      contact: "Contact",
    },
    footer: {
      studioName: "Lemonadeccc",
    },
    home: {
      hero: {
        eyebrow: "Welcome to ——",
        title: "Lemonadeccc",
        byline: "My Role ——",
        roleA: "Developer",
        roleB: "",
        introLineA:
          "A collection of the best resources for learning development",
        introLineB: "from the Internet, hand-picked and created by me",
        subscribeLineA:
          "Learning and sharing some articles about AI, development.",
        subscribeLineB:
          "If you like my project or ideas, you can subscribe to my",
        rssFeedEnLabel: "RSS feed",
        rssDividerLabel: "or",
        rssFeedZhLabel: "RSS feed (zh-CN)",
      },
      recentTitle: "Most Recent Works",
      featuredTitle: "Featured Works",
      featuredCta: "View Full Portfolio →",
      representationTitle: "Representation",
    },
    archive: {
      title: "Archive.",
      intro: [
        "A running ledger of notes, portfolio fragments, replicas, and references.",
        "Each section is a different cut through the same body of work — writing, images, saved influence, and process traces.",
      ],
      tabs: {
        posts: "Posts.",
        portfolio: "Portfolio.",
        replica: "Replica.",
        liked: "Liked.",
        inspiration: "Inspiration.",
      },
      emptyState: {
        noPosts: "No posts yet",
        comingSoon: "Coming soon",
      },
      backToArchive: "← Back to archive",
    },
    info: {
      paragraphs: [
        "Lemonadeccc is a developer and builder working across frontend systems, visual interfaces, and AI-assisted workflows. This site collects writing, portfolio fragments, experiments, and references that sit between engineering and design.",
        "The practice is driven by learning in public and turning abstract ideas into usable systems. Most projects begin as notes, sketches, or references, then evolve into code, layouts, tooling, or longer-form documentation.",
        "Rather than present a polished studio biography, this page functions as a working profile. It is a record of decisions, iterations, and the kinds of problems that keep showing up across product work, creative coding, and internet publishing.",
        "The throughline is simple: make things that are clear, durable, and worth revisiting, whether they ship as a page, a component system, a prototype, or a written breakdown.",
      ],
    },
    contact: {
      heroTitle: "Contact.",
      heroLead:
        "For product collaboration, frontend systems, AI tooling, and long-form engineering work, this is the direct point of contact.",
      heroBody:
        "The layout keeps the same editorial rhythm as the rest of the site: denser information, stronger separators, and cleaner link treatment.",
      heroAsideLead:
        "GitHub is the best entry point for code and project context. X works better for short messages, links, and quick follow-ups.",
      heroAsideBody:
        "If you are reaching out from a project page or archive post, include the relevant link so the conversation starts with the right context.",
      sections: {
        introLeft: "Get in Touch",
        introRight: "Contact Directory",
        channels: "Primary Channels",
        friends: "Friend Links",
        site: "Site Directory",
        notes: "Notes",
      },
      notes: {
        github: "Code, experiments, and public repos.",
        x: "Short updates, links, and faster replies.",
      },
      siteLinks: {
        archive: "Posts, portfolio, and references.",
        work: "Selected projects and project detail pages.",
        info: "Profile, links, and surrounding context.",
      },
      closingLead:
        "This page intentionally stays lean: fewer cards, more structure, and enough context to route people into the right place without fighting the rest of the site.",
      closingBody:
        "For deeper work samples, the archive portfolio tab now carries the image-led browsing pattern instead of the previous hover-preview list.",
    },
    workDetail: {
      projectNotFound: "Project Not Found",
      creditList: "Credit List",
    },
  },
  zh: {
    metadata: {
      home: {
        title: "Lemonadeccc",
        description: "我的角色 —— Developer",
      },
      archive: {
        title: "归档 | Lemonadeccc",
        description: "文章、作品与灵感归档。",
      },
      info: {
        title: "信息 | Lemonadeccc",
        description: "关于 Lemonadeccc —— 开发者、创作者。",
      },
      contact: {
        title: "联系 | Lemonadeccc",
        description: "联系方式与链接。",
      },
    },
    nav: {
      archive: "归档",
      info: "信息",
      contact: "联系",
    },
    footer: {
      studioName: "Lemonadeccc",
      madeIn: "制作于",
      madePlace: "美国加州旧金山",
    },
    home: {
      hero: {
        eyebrow: "欢迎来到 ——",
        title: "Lemonadeccc",
        byline: "我的角色 ——",
        roleA: "Developer",
        roleB: "",
        introLineA: "这里收集了互联网上值得看的资源",
        introLineB: "挑选、整理并持续维护",
        subscribeLineA: "也会分享一些关于 AI、设计与开发的文章。",
        subscribeLineB: "如果你喜欢我的项目或想法，可以订阅我的",
        rssFeedEnLabel: "RSS 订阅（英文）",
        rssDividerLabel: "或",
        rssFeedZhLabel: "RSS 订阅（中文）",
      },
      recentTitle: "最新作品",
      featuredTitle: "精选作品",
      featuredCta: "查看完整作品集 →",
      representationTitle: "代理信息",
    },
    archive: {
      title: "归档.",
      intro: [
        "这里汇集了文章、作品碎片、复刻实验与灵感存档。",
        "每个标签都是同一条创作脉络的不同切面：写作、图像、收藏与过程记录。",
      ],
      tabs: {
        posts: "文章.",
        portfolio: "作品.",
        replica: "复刻.",
        liked: "收藏.",
        inspiration: "灵感.",
      },
      emptyState: {
        noPosts: "暂时还没有文章",
        comingSoon: "即将上线",
      },
      backToArchive: "← 返回归档",
    },
    info: {
      paragraphs: [
        "Lemonadeccc 是一名围绕前端系统、界面表达与 AI 辅助工作流展开实践的开发者与创作者。这个站点主要用来整理写作、作品碎片、实验记录与长期保留的参考资料。",
        "整体方法更接近公开学习和持续迭代：把抽象想法逐步落成可用系统，让笔记、草图、参考和代码最终汇入真实可运行的页面、组件、工具或文章。",
        "与其说这是传统意义上的个人简介页，不如说它更像一份持续更新的工作档案。这里记录的是判断过程、修改痕迹，以及在产品、创意编程和内容发布中反复出现的问题。",
        "贯穿这些内容的标准很直接：做清晰、耐用、值得回看的东西，无论最后交付的是页面、组件系统、原型，还是一篇拆解文章。",
      ],
    },
    contact: {
      heroTitle: "联系.",
      heroLead:
        "如果你想聊产品合作、前端系统、AI 工具链或偏长期的工程项目，这里是最直接的入口。",
      heroBody:
        "页面版式延续了站点整体的编辑式节奏：信息更密、分隔更明确、链接也更克制。",
      heroAsideLead:
        "GitHub 更适合查看代码与项目上下文；X 更适合短消息、链接和快速跟进。",
      heroAsideBody:
        "如果你是从某个项目页或 archive 文章页过来的，最好把对应链接一起带上，方便直接进入上下文。",
      sections: {
        introLeft: "联系入口",
        introRight: "联系方式",
        channels: "主要渠道",
        friends: "友情链接",
        site: "站点目录",
        notes: "说明",
      },
      notes: {
        github: "代码、实验和公开仓库。",
        x: "短动态、链接，以及更快的回复。",
      },
      siteLinks: {
        archive: "文章、作品与灵感归档。",
        work: "精选项目与项目详情页。",
        info: "个人简介、外链与补充信息。",
      },
      closingLead:
        "这个页面刻意保持克制：更少的卡片、更清晰的结构，以及足够把人引导到正确位置的信息。",
      closingBody:
        "如果想继续看作品，archive 里的 portfolio 标签现在已经换成了图片优先的浏览方式。",
    },
    workDetail: {
      projectNotFound: "未找到项目",
      creditList: "名单",
    },
  },
} as const;

export type SiteCopy = (typeof siteCopy)[SiteLocale];

export function getSiteCopy(locale: SiteLocale): SiteCopy {
  return siteCopy[locale];
}

export function getPageMetadata(
  locale: SiteLocale,
  page: keyof SiteCopy["metadata"],
): Metadata {
  return siteCopy[locale].metadata[page];
}
