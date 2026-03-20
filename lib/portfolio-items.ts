export type PortfolioItem = {
  left: string;
  right: string;
  project: string;
  label: string;
  image: string;
  href: string;
  aspectRatio: string;
};

const PORTFOLIO_IMAGE_BASE_URL = "https://imgbed.lemonadec.cc/2026/03";

export const portfolioItems: PortfolioItem[] = [
  {
    left: "pr-agent",
    right: "vibe coding 4h",
    project: "AI Code Review",
    label: "03/10/2026",
    image: `${PORTFOLIO_IMAGE_BASE_URL}/img6.png`,
    href: "https://pr-agent.condevtools.com/",
    aspectRatio: "1600 / 774",
  },
  {
    left: "condev-ui",
    right: "UI Components",
    project: "UI Components",
    label: "01/06/2026",
    image: `${PORTFOLIO_IMAGE_BASE_URL}/img1.jpg`,
    href: "https://ui.condevtools.com/",
    aspectRatio: "1920 / 922",
  },
  {
    left: "condev-monitor",
    right: "Monitoring System",
    project: "Infra Monitoring",
    label: "12/30/2025",
    image: `${PORTFOLIO_IMAGE_BASE_URL}/img2.jpg`,
    href: "https://monitor.condevtools.com/",
    aspectRatio: "1920 / 918",
  },
  {
    left: "GEN 3D ASSETS",
    right: "Generate Platform",
    project: "3D Generation With AI",
    label: "08/30/2025",
    image: `${PORTFOLIO_IMAGE_BASE_URL}/img4.jpg`,
    href: "https://gen-3-d-assests-web.vercel.app/",
    aspectRatio: "1920 / 928",
  },
];
