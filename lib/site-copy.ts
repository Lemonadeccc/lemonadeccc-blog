import type { Metadata } from "next";
import type { SiteLocale } from "./site-locale";

const siteCopy = {
  en: {
    metadata: {
      home: {
        title: "GMUNK",
        description: "My Orange Blog — Developer",
      },
      archive: {
        title: "Archive | LEMONADE",
        description: "Posts, portfolio, and more.",
      },
      info: {
        title: "Info | GMUNK",
        description: "About GMUNK — Director, Digital Artist.",
      },
      contact: {
        title: "Contact | GMUNK",
        description: "Get in touch.",
      },
    },
    nav: {
      archive: "Archive",
      info: "Info",
      contact: "Contact",
    },
    footer: {
      studioName: "GMUNK Studio Inc.",
      madeIn: "Made in",
      madePlace: "San Francisco, California",
    },
    home: {
      hero: {
        eyebrow: "Welcome to ——",
        title: "LEMONADE",
        byline: "My Orange Blog ——",
        roleA: "Developer",
        roleB: "",
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
        "GMUNK is a globally renowned digital artist, live-action director and motion designer whose creativity and innovation span a unique range of mediums. The throughline in his work utilizes a fusion of psychedelic themes and richly textured palettes, and his signature lens-based style is enigmatic, atmospheric, and metaphysical — much like the Munky himself.",
        "His ethos is driven by his desire to learn and be uncomfortable. He continuously seeks to apply his foundation in motion design to new mediums, with new collaborators. The results of these labors often take beautiful and unexpected forms as short films, installations, digital art, data visualizations, commercials, music videos, title sequences and various applications of motion design.",
        "GMUNK's work has been exhibited and sold at Christie's, Sotheby's and in fine-art galleries around the world. His early Flash and Motion Design work set the bar for experimentation in the medium and has been studied in schools internationally for over two decades. His projection-mapping opus BOX is one of the most viral short films ever made and won prestigious awards including the Cannes Grand Prix and Siggraph's Best in Show.",
        "His work often centers around themes of identity, the subconscious, and our human connection to technology.",
      ],
    },
    contact: {
      heroTitle: "Contact.",
      heroLead:
        "For product collaboration, frontend systems, AI tooling, and long-form engineering work, this is the direct point of contact.",
      heroBody:
        "The layout follows the same editorial rhythm as Collect: denser information, stronger separators, and cleaner link treatment.",
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
        title: "GMUNK",
        description: "我的橘子博客 —— Developer",
      },
      archive: {
        title: "归档 | LEMONADE",
        description: "文章、作品与灵感归档。",
      },
      info: {
        title: "信息 | GMUNK",
        description: "关于 GMUNK —— 导演、数字艺术家。",
      },
      contact: {
        title: "联系 | GMUNK",
        description: "联系方式与链接。",
      },
    },
    nav: {
      archive: "归档",
      info: "信息",
      contact: "联系",
    },
    footer: {
      studioName: "GMUNK Studio Inc.",
      madeIn: "制作于",
      madePlace: "美国加州旧金山",
    },
    home: {
      hero: {
        eyebrow: "欢迎来到 ——",
        title: "LEMONADE",
        byline: "我的橘子博客 ——",
        roleA: "Developer",
        roleB: "",
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
        "GMUNK 是享誉全球的数字艺术家、实拍导演与动态设计师，创作横跨多种媒介。其作品持续以迷幻主题、浓郁肌理与标志性的镜头语言构建出神秘、氛围化且带有形而上气质的视觉世界。",
        "他的创作方法始终围绕“主动走向不适与学习”展开，不断把动态设计的基础能力迁移到新的媒介、合作方式与技术语境中。因此，他的成果常以短片、装置、数字艺术、数据可视化、商业广告、音乐录像、片头序列等意想不到的形式出现。",
        "GMUNK 的作品已在 Christie's、Sotheby's 及全球多家艺术机构展出和售卖。其早期 Flash 与动态图形作品长期被国际院校研究；而投影映射代表作 BOX 也成为极具传播力的短片之一，并获得戛纳大奖与 Siggraph Best in Show 等重要奖项。",
        "他的作品常常围绕身份、潜意识，以及人类与技术之间的关系展开。",
      ],
    },
    contact: {
      heroTitle: "联系.",
      heroLead:
        "如果你想聊产品合作、前端系统、AI 工具链或偏长期的工程项目，这里是最直接的入口。",
      heroBody:
        "页面版式沿用了 Collect 的编辑式节奏：信息更密、分隔更明确、链接也更克制。",
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
  page: keyof SiteCopy["metadata"]
): Metadata {
  return siteCopy[locale].metadata[page];
}
