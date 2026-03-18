import type { Metadata } from "next";
import { ContactPageView } from "@/components/pages/ContactPageView";
import { getPageMetadata } from "@/lib/site-copy";

export const metadata: Metadata = getPageMetadata("en", "contact");

export default function ContactPage() {
  return <ContactPageView locale="en" />;
}
