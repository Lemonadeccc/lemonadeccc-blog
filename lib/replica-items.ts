export type ReplicaItem = {
  href: string;
  mediaType: "scene" | "video";
  project: string;
  label: string;
  projectId?: string;
  aspectRatio: string;
  width?: string;
  height?: string;
  scale?: number;
  dpi?: number;
  fps?: 15 | 24 | 30 | 60 | 120;
  sdkUrl?: string;
  videoSrc?: string;
};

// const UNICORN_SDK_URL =
//   "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@2.1.4/dist/unicornStudio.umd.js";
const REPLICA_VIDEO_BASE_URL = "https://imgbed.lemonadec.cc";

export const replicaItems: ReplicaItem[] = [
  // {
  //   mediaType: "scene",
  //   href: "#replica-grxexcjizoqxcpekj9jb",
  //   project: "Unicorn Replica 01",
  //   label: "GrXeXCjiZoQxcPekj9Jb",
  //   projectId: "GrXeXCjiZoQxcPekj9Jb",
  //   aspectRatio: "1440 / 900",
  //   width: "1440px",
  //   height: "900px",
  //   scale: 1,
  //   dpi: 1.5,
  //   sdkUrl: UNICORN_SDK_URL,
  // },
  // {
  //   mediaType: "scene",
  //   href: "#replica-d6urabrd5dx0xawbn2f9",
  //   project: "Unicorn Replica 02",
  //   label: "D6URabRd5dX0xawbn2F9",
  //   projectId: "D6URabRd5dX0xawbn2F9",
  //   aspectRatio: "1920 / 1080",
  //   width: "1920px",
  //   height: "1080px",
  //   scale: 0.8,
  //   dpi: 1,
  //   fps: 60,
  //   sdkUrl: UNICORN_SDK_URL,
  // },
  // {
  //   mediaType: "scene",
  //   href: "#replica-sivtvrxizqqzrzinnuki",
  //   project: "Unicorn Replica 03",
  //   label: "sIvTvRxizqQZRZinNuKI",
  //   projectId: "sIvTvRxizqQZRZinNuKI",
  //   aspectRatio: "1440 / 900",
  //   width: "1440px",
  //   height: "900px",
  //   scale: 1,
  //   dpi: 1.5,
  //   sdkUrl: UNICORN_SDK_URL,
  // },
  {
    mediaType: "video",
    href: "#replica-ducky-3d",
    project: "Replica: Ducky 3D",
    label: "Ducky 3D / Blender",
    aspectRatio: "1920 / 1080",
    videoSrc: `${REPLICA_VIDEO_BASE_URL}/bkg.mp4`,
  },
];
