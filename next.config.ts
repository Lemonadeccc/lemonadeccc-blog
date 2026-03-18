import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "freight.cargo.site" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "blog.kuaikuaitz.top" },
      { protocol: "https", hostname: "blog.cosine.ren" },
      { protocol: "https", hostname: "imgbed.lemonadec.cc" },
    ],
  },
};

export default withMDX(nextConfig);
