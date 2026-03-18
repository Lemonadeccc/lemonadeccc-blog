import type { Metadata } from "next";
import { HomePageView } from "@/components/pages/HomePageView";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("zh", "home");

export default function ZhHomePage() {
  return <HomePageView locale="zh" />;
}
