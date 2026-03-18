export const TABLET_ROW_LAYOUT = [2, 2, 1];
export const DESKTOP_ROW_LAYOUT = [3, 2];
const THUMBNAIL_X_PADDING_REM = 0.2;

export function parseAspectRatio(value: string): number {
  const [width, height] = value.split("/").map((part) => Number(part.trim()));
  if (!width || !height) return 16 / 9;
  return width / height;
}

export function splitIntoRows<T>(items: T[], layout: number[]): T[][] {
  const rows: T[][] = [];
  let cursor = 0;

  for (const size of layout) {
    if (cursor >= items.length) break;
    rows.push(items.slice(cursor, cursor + size));
    cursor += size;
  }

  if (cursor < items.length) {
    rows.push(items.slice(cursor));
  }

  return rows;
}

export function buildWidthMap<T extends { href: string; aspectRatio: string }>(
  items: T[],
  layout: number[],
) {
  const rows = splitIntoRows(items, layout);
  const widthMap = new Map<string, string>();

  for (const row of rows) {
    const ratios = row.map((item) => parseAspectRatio(item.aspectRatio));
    const totalRatio = ratios.reduce((sum, ratio) => sum + ratio, 0);

    row.forEach((item, index) => {
      const widthPercent = (ratios[index] / totalRatio) * 100;
      const paddingOffsetRem =
        (ratios[index] / totalRatio) * row.length * THUMBNAIL_X_PADDING_REM;

      widthMap.set(
        item.href,
        `calc(${widthPercent.toFixed(4)}% - ${paddingOffsetRem.toFixed(4)}rem)`,
      );
    });
  }

  return widthMap;
}
