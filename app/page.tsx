import type { Metadata } from "next";
import { HomePageView } from "@/components/pages/HomePageView";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("en", "home");

export default function HomePage() {
  return <HomePageView locale="en" />;
}
