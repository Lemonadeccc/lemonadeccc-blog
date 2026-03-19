import "server-only";

import type { LikedVideo } from "./liked-videos";
import type { SiteLocale } from "./site-locale";

const inspirationVideos: Record<SiteLocale, LikedVideo[]> = {
  en: [
    {
      id: "the-giants-point-clouds-excerpts",
      title: "The Giants - Point Clouds Animations (Excerpts)",
      summary:
        'Point-cloud animation excerpts created for the documentary film "THE GIANTS", built from lidar captures of Tasmania\'s giant trees.',
      author: "Alex Le Guillou",
      duration: "03:42",
      tags: [
        { key: "vimeo", label: "Vimeo" },
        { key: "motion", label: "Motion" },
      ],
      embedUrl: "https://player.vimeo.com/video/771804254?quality=4k&initial_quality=4k",
      sourceUrl: "https://vimeo.com/771804254",
      aspectRatio: "16 / 9",
    },
    {
      id: "rc-lightweiss-kun",
      title: "RC, Lightweiss - Kun (Music Video By Ewan Qian)",
      summary:
        "A music video by Ewan Qian for RC and Lightweiss, added as a second moving-image reference in Inspiration.",
      author: "LightweissDNB",
      duration: "--",
      tags: [
        { key: "youtube", label: "YouTube" },
        { key: "music-video", label: "Music Video" },
      ],
      embedUrl: "https://www.youtube.com/embed/U_5NQWVzuEw",
      sourceUrl: "https://www.youtube.com/watch?v=U_5NQWVzuEw",
      aspectRatio: "16 / 9",
    },
    {
      id: "marathon-art-style-breakdown",
      title: "Marathon Art Style Breakdown",
      summary:
        "A focused breakdown of Marathon's visual language, tracing how graphic realism, branding systems, and color discipline shape its world.",
      author: "Jake The Alright",
      duration: "15:30",
      tags: [
        { key: "youtube", label: "YouTube" },
        { key: "game-art", label: "Game Art" },
      ],
      embedUrl: "https://www.youtube.com/embed/JHApRRthYgQ",
      sourceUrl: "https://www.youtube.com/watch?v=JHApRRthYgQ",
      aspectRatio: "16 / 9",
    },
    {
      id: "touchdesigner-audio-prisms",
      title: "How to Make Audio Prisms in TouchDesigner",
      summary:
        "A TouchDesigner study focused on building audio-driven prism visuals, added as another process-oriented moving-image reference.",
      author: "Noah Shipman",
      duration: "--",
      tags: [
        { key: "youtube", label: "YouTube" },
        { key: "touchdesigner", label: "TouchDesigner" },
      ],
      embedUrl: "https://www.youtube.com/embed/tZt1SQUZl6U",
      sourceUrl: "https://www.youtube.com/watch?v=tZt1SQUZl6U",
      aspectRatio: "16 / 9",
    },
  ],
  zh: [
    {
      id: "the-giants-point-clouds-excerpts",
      title: "The Giants - 点云动画片段",
      summary:
        "为纪录片《THE GIANTS》制作的点云动画片段，基于塔斯马尼亚巨树的地面与无人机激光雷达采集数据生成。",
      author: "Alex Le Guillou",
      duration: "03:42",
      tags: [
        { key: "vimeo", label: "Vimeo" },
        { key: "motion", label: "动态" },
      ],
      embedUrl: "https://player.vimeo.com/video/771804254?quality=4k&initial_quality=4k",
      sourceUrl: "https://vimeo.com/771804254",
      aspectRatio: "16 / 9",
    },
    {
      id: "rc-lightweiss-kun",
      title: "RC, Lightweiss - Kun（Ewan Qian 音乐录像）",
      summary:
        "Ewan Qian 为 RC 与 Lightweiss 制作的音乐录像，作为 Inspiration 里的第二条动态影像参考。",
      author: "LightweissDNB",
      duration: "--",
      tags: [
        { key: "youtube", label: "YouTube" },
        { key: "music-video", label: "音乐录像" },
      ],
      embedUrl: "https://www.youtube.com/embed/U_5NQWVzuEw",
      sourceUrl: "https://www.youtube.com/watch?v=U_5NQWVzuEw",
      aspectRatio: "16 / 9",
    },
    {
      id: "marathon-art-style-breakdown",
      title: "Marathon 美术风格拆解",
      summary:
        "一条围绕 Marathon 视觉语言的拆解视频，重点分析它如何通过 graphic realism、品牌系统和配色控制建立世界观。",
      author: "Jake The Alright",
      duration: "15:30",
      tags: [
        { key: "youtube", label: "YouTube" },
        { key: "game-art", label: "游戏美术" },
      ],
      embedUrl: "https://www.youtube.com/embed/JHApRRthYgQ",
      sourceUrl: "https://www.youtube.com/watch?v=JHApRRthYgQ",
      aspectRatio: "16 / 9",
    },
    {
      id: "touchdesigner-audio-prisms",
      title: "如何在 TouchDesigner 里制作 Audio Prisms",
      summary:
        "一个围绕 TouchDesigner 的音频驱动棱镜视觉实验，作为 Inspiration 里的另一条偏过程类动态影像参考。",
      author: "Noah Shipman",
      duration: "--",
      tags: [
        { key: "youtube", label: "YouTube" },
        { key: "touchdesigner", label: "TouchDesigner" },
      ],
      embedUrl: "https://www.youtube.com/embed/tZt1SQUZl6U",
      sourceUrl: "https://www.youtube.com/watch?v=tZt1SQUZl6U",
      aspectRatio: "16 / 9",
    },
  ],
};

export async function getInspirationVideos(locale: SiteLocale): Promise<LikedVideo[]> {
  return inspirationVideos[locale];
}
