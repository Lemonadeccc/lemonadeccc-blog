#!/usr/bin/env python3
import argparse
import re
import sys
from pathlib import Path

SOURCE_LOCALE = "en"
TARGET_LOCALE = "zh"
REQUIRED_KEYS = ("title", "type", "project", "date", "summary")

FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n?", re.DOTALL)
FIELD_RE = re.compile(r"^([A-Za-z0-9_-]+)\s*:", re.MULTILINE)
HEADING_RE = re.compile(r"^\s*#{1,6}\s", re.MULTILINE)
CODE_FENCE_RE = re.compile(r"^\s*```", re.MULTILINE)
LOCAL_LINK_RE = re.compile(r"\((/[^)\s]+)\)")
LOCAL_ATTR_RE = re.compile(r"""(?:src|href)=["'](/[^"']+)["']""")


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        print(f"[ERROR] File not found: {path}")
        sys.exit(1)


def split_frontmatter(text: str, label: str) -> tuple[str, str]:
    match = FRONTMATTER_RE.match(text)
    if not match:
        print(f"[ERROR] Missing or invalid frontmatter in {label}")
        sys.exit(1)
    return match.group(1), text[match.end() :]


def parse_keys(frontmatter: str) -> list[str]:
    return FIELD_RE.findall(frontmatter)


def has_post_locale(path: Path, locale: str) -> bool:
    parts = path.as_posix().split("/")
    for i in range(len(parts) - 2):
        if parts[i] == "content" and parts[i + 1] == "posts" and parts[i + 2] == locale:
            return True
    return False


def collect_local_paths(body: str) -> set[str]:
    return set(LOCAL_LINK_RE.findall(body)) | set(LOCAL_ATTR_RE.findall(body))


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate translated MDX structure for en->zh workflow.")
    parser.add_argument("--source", required=True, help="Path to source English MDX/MD file.")
    parser.add_argument("--target", required=True, help="Path to target Chinese MDX/MD file.")
    args = parser.parse_args()

    source_path = Path(args.source)
    target_path = Path(args.target)
    errors: list[str] = []

    if not has_post_locale(source_path, SOURCE_LOCALE):
        errors.append(f"source path must be under content/posts/{SOURCE_LOCALE}: {source_path}")
    if not has_post_locale(target_path, TARGET_LOCALE):
        errors.append(f"target path must be under content/posts/{TARGET_LOCALE}: {target_path}")
    if source_path.stem != target_path.stem:
        errors.append(f"slug mismatch: {source_path.stem} vs {target_path.stem}")

    source_text = read_text(source_path)
    target_text = read_text(target_path)
    source_fm, source_body = split_frontmatter(source_text, "source")
    target_fm, target_body = split_frontmatter(target_text, "target")

    source_keys = parse_keys(source_fm)
    target_keys = parse_keys(target_fm)
    for key in REQUIRED_KEYS:
        if key not in source_keys:
            errors.append(f"source frontmatter missing required key: {key}")
        if key not in target_keys:
            errors.append(f"target frontmatter missing required key: {key}")

    source_headings = len(HEADING_RE.findall(source_body))
    target_headings = len(HEADING_RE.findall(target_body))
    if source_headings != target_headings:
        errors.append(f"heading count mismatch: source={source_headings}, target={target_headings}")

    source_fences = len(CODE_FENCE_RE.findall(source_body))
    target_fences = len(CODE_FENCE_RE.findall(target_body))
    if source_fences != target_fences:
        errors.append(f"code fence count mismatch: source={source_fences}, target={target_fences}")

    source_paths = collect_local_paths(source_body)
    target_paths = collect_local_paths(target_body)
    missing_paths = sorted(source_paths - target_paths)
    if missing_paths:
        errors.append("missing local paths in target: " + ", ".join(missing_paths))

    if errors:
        for error in errors:
            print(f"[ERROR] {error}")
        return 1

    print("[OK] Translation structure check passed.")
    print(f"[OK] slug={source_path.stem} headings={source_headings} code_fences={source_fences}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
