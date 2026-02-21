#!/usr/bin/env python3
import argparse
import json
from pathlib import Path


def read_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return None
    except json.JSONDecodeError:
        return None


def to_text(value) -> str:
    return value.strip() if isinstance(value, str) else ""


def ensure_under_root(root: Path, rel_path: str) -> Path | None:
    candidate = (root / rel_path).resolve()
    root_resolved = root.resolve()
    if candidate == root_resolved or root_resolved in candidate.parents:
        return candidate
    return None


def validate_localized_field(resource: dict, field_name: str, file_label: str, errors: list[str]) -> None:
    raw = resource.get(field_name)
    if not isinstance(raw, dict):
        errors.append(f"{file_label}: {field_name} must be an object with en/zh keys")
        return

    en_value = to_text(raw.get("en"))
    zh_value = to_text(raw.get("zh"))

    if not en_value:
        errors.append(f"{file_label}: {field_name}.en is empty")
    if not zh_value:
        errors.append(f"{file_label}: {field_name}.zh is empty")


def validate_tags(resource: dict, file_label: str, errors: list[str]) -> None:
    tags = resource.get("tags")
    if not isinstance(tags, list):
        return

    for idx, tag in enumerate(tags):
        if isinstance(tag, str):
            continue

        if not isinstance(tag, dict):
            errors.append(f"{file_label}: tags[{idx}] must be string or object")
            continue

        label = tag.get("label")
        if not isinstance(label, dict):
            continue

        en_value = to_text(label.get("en"))
        zh_value = to_text(label.get("zh"))
        if en_value and not zh_value:
            errors.append(f"{file_label}: tags[{idx}].label.zh is empty while label.en exists")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate EN->ZH translation coverage for content/resources video JSON files."
    )
    parser.add_argument("--index", required=True, help="Path to content/resources/resources.json")
    parser.add_argument("--root", required=True, help="Path to content/resources root directory")
    args = parser.parse_args()

    index_path = Path(args.index)
    resources_root = Path(args.root)

    errors: list[str] = []
    checked_files = 0

    index_data = read_json(index_path)
    if not isinstance(index_data, dict):
        print(f"[ERROR] Invalid or missing index file: {index_path}")
        return 1

    order = index_data.get("order")
    if not isinstance(order, list):
        print(f"[ERROR] Invalid index format: missing array field 'order' in {index_path}")
        return 1

    for i, item in enumerate(order):
        if not isinstance(item, dict):
            errors.append(f"order[{i}] must be an object")
            continue

        rel_file = to_text(item.get("file"))
        entry_id = to_text(item.get("id")) or f"order[{i}]"
        if not rel_file:
            errors.append(f"{entry_id}: missing 'file'")
            continue

        file_path = ensure_under_root(resources_root, rel_file)
        if file_path is None:
            errors.append(f"{entry_id}: file path escapes resources root: {rel_file}")
            continue

        data = read_json(file_path)
        if not isinstance(data, dict):
            errors.append(f"{entry_id}: invalid or missing resource JSON: {file_path}")
            continue

        checked_files += 1
        file_label = f"{entry_id} ({rel_file})"

        validate_localized_field(data, "title", file_label, errors)
        validate_localized_field(data, "summary", file_label, errors)
        validate_tags(data, file_label, errors)

    if errors:
        for error in errors:
            print(f"[ERROR] {error}")
        return 1

    print(f"[OK] Translation coverage check passed for {checked_files} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
