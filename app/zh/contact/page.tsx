import type { Metadata } from "next";
import { ContactPageView } from "@/components/pages/ContactPageView";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("zh", "contact");

export default function ZhContactPage() {
  return <ContactPageView locale="zh" />;
}
