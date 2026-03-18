import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compile, run } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import * as runtime from "react/jsx-runtime";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { getDateLocaleForPosts } from "@/lib/postLocale";
import { getSiteCopy } from "@/lib/site-copy";
import { localizeHref, type SiteLocale } from "@/lib/site-locale";

type MdxModule = {
  default: React.ComponentType<{ components?: Record<string, unknown> }>;
};

function MdxImage({ alt = "", className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={["my-8 h-auto w-full rounded-sm border border-white/10", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

function getMdxComponents(locale: SiteLocale) {
  function MdxLink({
    href = "",
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const isExternal =
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//") ||
      href.startsWith("mailto:");

    const cls = "underline underline-offset-4 text-white/80 hover:text-white transition-colors";

    if (isExternal) {
      return (
        <a {...props} href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    const localizedHref = href.startsWith("/") ? localizeHref(href, locale) : href;
    return <Link href={localizedHref} className={cls}>{children}</Link>;
  }

  return {
    a: MdxLink,
    img: MdxImage,
    video: (props: React.VideoHTMLAttributes<HTMLVideoElement>) => (
      <video
        {...props}
        controls={props.controls ?? true}
        className={[
          "my-8 h-auto w-full rounded-sm border border-white/10 bg-black",
          props.className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    ),
    iframe: (props: React.IframeHTMLAttributes<HTMLIFrameElement>) => (
      <iframe
        {...props}
        className={[
          "my-8 aspect-video w-full rounded-sm border border-white/10 bg-black",
          props.className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    ),
    table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
      <div className="my-8 overflow-x-auto">
        <table
          {...props}
          className={[
            "w-full border-collapse text-left text-sm text-white/80",
            props.className,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </div>
    ),
    th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <th
        {...props}
        className={[
          "border border-white/10 bg-white/[0.05] px-3 py-2 font-semibold text-white",
          props.className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    ),
    td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <td
        {...props}
        className={[
          "border border-white/10 px-3 py-2 align-top",
          props.className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
      <hr {...props} className="my-10 border-0 border-t border-white/10" />
    ),
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 {...props} className="mt-12 text-2xl font-bold tracking-tight text-white" />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h3 {...props} className="mt-10 text-xl font-semibold tracking-tight text-white" />
    ),
    h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h4 {...props} className="mt-8 text-lg font-semibold tracking-tight text-white" />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p {...props} className="text-base leading-8 text-white/80" />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
      <ul {...props} className="list-disc space-y-2 pl-6 text-white/80" />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
      <ol {...props} className="list-decimal space-y-2 pl-6 text-white/80" />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
      <blockquote
        {...props}
        className="my-8 border-l border-white/20 pl-5 text-lg leading-8 text-white/70 italic"
      />
    ),
    pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
      <pre
        {...props}
        className="my-8 overflow-x-auto rounded-sm border border-white/10 bg-white/[0.04] p-4 text-sm text-white/90"
      />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <code {...props} className="rounded-sm bg-white/[0.08] px-1.5 py-0.5 text-[0.9em] text-white" />
    ),
  };
}

async function compileMdx(source: string) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: process.env.NODE_ENV === "development",
    remarkPlugins: [remarkGfm],
  });
  const mod = (await run(compiled, { ...runtime, baseUrl: import.meta.url })) as MdxModule;
  return mod.default;
}

export async function generatePostStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generatePostMetadata(
  locale: SiteLocale,
  slug: string
): Promise<Metadata> {
  const post = await getPostBySlug(slug, locale);
  if (!post) {
    return {
      title: locale === "zh" ? "未找到文章 | LEMONADE" : "Post Not Found | LEMONADE",
    };
  }

  return {
    title: `${post.title} | LEMONADE`,
    description: post.summary || `${post.type} — ${post.date}`,
  };
}

export async function PostDetailPageView({
  slug,
  locale,
}: {
  slug: string;
  locale: SiteLocale;
}) {
  const post = await getPostBySlug(slug, locale);
  if (!post) notFound();

  const copy = getSiteCopy(locale);
  const MDXContent = await compileMdx(post.content);
  const mdxComponents = getMdxComponents(locale);
  const formatter = new Intl.DateTimeFormat(getDateLocaleForPosts(locale), {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return (
    <>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-[#0d0d0d] text-white">
        <div className="mx-auto max-w-5xl px-4 pb-20 pt-24 sm:px-10">
          <Link
            href={localizeHref("/archive", locale)}
            className="inline-block text-xs uppercase tracking-[0.24em] text-white/45 transition-colors hover:text-white"
          >
            {copy.archive.backToArchive}
          </Link>

          <header className="mt-10 border-b border-white/10 pb-8">
            <p className="text-xs uppercase tracking-[0.28em] text-white/40">
              {post.type}
              {" / "}
              <time dateTime={post.date}>{formatter.format(new Date(post.date))}</time>
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {post.title}
            </h1>
            {post.summary && (
              <p className="mt-4 max-w-3xl text-base leading-8 text-white/55">{post.summary}</p>
            )}
          </header>

          <div className="mt-10 space-y-5">
            <MDXContent components={mdxComponents} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
