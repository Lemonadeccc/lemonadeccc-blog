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
      id: "blender-ascii-video-geometry-nodes",
      title: "Blender ASCII Video - Geometry Nodes",
      summary:
        "An ASCII-art video experiment in Blender, transforming footage into character-based motion using geometry nodes.",
      author: "Ewan Qian",
      duration: "00:11",
      tags: [
        { key: "bilibili", label: "Bilibili" },
        { key: "blender", label: "Blender" },
      ],
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1AMVnz1Ebx&page=1&high_quality=1&danmaku=0&autoplay=0&t=0&poster=0&fjw=0",
      sourceUrl:
        "https://www.bilibili.com/video/BV1AMVnz1Ebx/?spm_id_from=333.1387.upload.video_card.click&vd_source=396c5ae1f75ee6199b8320de985b0e70",
      aspectRatio: "16 / 9",
    },
    {
      id: "ether-fragments",
      title: "Ether Fragments",
      summary:
        "A short visual piece focused on an intentional sense of destined fragmentation, rendered as a compact moving-image study.",
      author: "Ewan Qian",
      duration: "00:26",
      tags: [
        { key: "bilibili", label: "Bilibili" },
        { key: "art-film", label: "Art Film" },
      ],
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1j94y1h7m3&page=1&high_quality=1&danmaku=0&autoplay=0&t=0&poster=0&fjw=0",
      sourceUrl:
        "https://www.bilibili.com/video/BV1j94y1h7m3/?spm_id_from=333.1387.upload.video_card.click&vd_source=396c5ae1f75ee6199b8320de985b0e70",
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
      id: "blender-ascii-video-geometry-nodes",
      title: "Blender ASCII 字符视频 几何节点",
      summary:
        "一个 Blender ASCII 艺术实验，把普通视频转成基于字符的动态画面，核心做法是几何节点驱动的视频变换。",
      author: "钱誉文EwanQian",
      duration: "00:11",
      tags: [
        { key: "bilibili", label: "Bilibili" },
        { key: "blender", label: "Blender" },
      ],
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1AMVnz1Ebx&page=1&high_quality=1&danmaku=0&autoplay=0&t=0&poster=0&fjw=0",
      sourceUrl:
        "https://www.bilibili.com/video/BV1AMVnz1Ebx/?spm_id_from=333.1387.upload.video_card.click&vd_source=396c5ae1f75ee6199b8320de985b0e70",
      aspectRatio: "16 / 9",
    },
    {
      id: "ether-fragments",
      title: "Ether Fragments 以太碎片",
      summary:
        "一段强调“命中注定的破碎感”的短片视觉实验，作为 Inspiration 里的另一条 B 站动态影像参考。",
      author: "钱誉文EwanQian",
      duration: "00:26",
      tags: [
        { key: "bilibili", label: "Bilibili" },
        { key: "art-film", label: "艺术短片" },
      ],
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1j94y1h7m3&page=1&high_quality=1&danmaku=0&autoplay=0&t=0&poster=0&fjw=0",
      sourceUrl:
        "https://www.bilibili.com/video/BV1j94y1h7m3/?spm_id_from=333.1387.upload.video_card.click&vd_source=396c5ae1f75ee6199b8320de985b0e70",
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
