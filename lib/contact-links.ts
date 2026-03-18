export type ContactItem = {
  label: string;
  value: string;
  href: string;
  noteKey: "github" | "x";
};

export type FriendLink = {
  name: string;
  github: string;
  website?: string;
  description: string;
};

export const contactItems: ContactItem[] = [
  {
    label: "GitHub",
    value: "@Lemonadeccc",
    href: "https://github.com/Lemonadeccc",
    noteKey: "github",
  },
  {
    label: "X",
    value: "@Lemonadecccc",
    href: "https://x.com/Lemonadecccc",
    noteKey: "x",
  },
];

export const friendLinks: FriendLink[] = [
  {
    name: "ztkuaikuai",
    github: "https://github.com/ztkuaikuai",
    website: "https://blog.kuaikuaitz.top/",
    description: "Becoming a Front-End Engineer",
  },
  {
    name: "Panzer-Jack",
    github: "https://github.com/Panzer-Jack",
    website: "https://blog.panzer-jack.cn/",
    description: "A Pragmatistic Dreamer.",
  },
  {
    name: "cos",
    github: "https://github.com/yusixian",
    website: "https://blog.cosine.ren/",
    description: "FE / ACG / remote",
  },
  {
    name: "MapleCity1314",
    github: "https://github.com/MapleCity1314",
    website: "https://icstudio.top/",
    description: "Web3 Full-stack Architect",
  },
];
