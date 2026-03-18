import type { Metadata } from "next";
import {
  generatePostMetadata,
  generatePostStaticParams,
  PostDetailPageView,
} from "@/components/pages/PostDetailPageView";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return generatePostStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generatePostMetadata("zh", slug);
}

export default async function ZhPostDetailPage({ params }: Props) {
  const { slug } = await params;
  return <PostDetailPageView slug={slug} locale="zh" />;
}
