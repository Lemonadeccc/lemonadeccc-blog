import type { Metadata } from "next";
import { InfoPageView } from "@/components/pages/InfoPageView";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("en", "info");

export default function InfoPage() {
  return <InfoPageView locale="en" />;
}
