import type { Metadata } from "next";
import {
  generateWorkDetailMetadata,
  generateWorkDetailStaticParams,
  WorkDetailPageView,
} from "@/components/pages/WorkDetailPageView";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return generateWorkDetailStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateWorkDetailMetadata("en", slug);
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  return <WorkDetailPageView slug={slug} locale="en" />;
}
