import type { Metadata } from "next";
import { InfoPageView } from "@/components/pages/InfoPageView";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("zh", "info");

export default function ZhInfoPage() {
  return <InfoPageView locale="zh" />;
}
