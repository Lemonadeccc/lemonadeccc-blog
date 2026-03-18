import fs from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";

type MdxProjectPageModule = {
  default: ComponentType;
  workPage?: {
    backgroundClassName?: string;
  };
};

export async function getMdxProjectPage(slug: string): Promise<
  | {
      Page: ComponentType;
      backgroundClassName: string;
    }
  | undefined
> {
  const filePath = path.join(process.cwd(), "content", "work", `${slug}.mdx`);

  try {
    await fs.access(filePath);
  } catch {
    return undefined;
  }

  const mdxModule = (await import(`@/content/work/${slug}.mdx`)) as MdxProjectPageModule;

  return {
    Page: mdxModule.default,
    backgroundClassName: mdxModule.workPage?.backgroundClassName ?? "bg-[#0d0d0d]",
  };
}
