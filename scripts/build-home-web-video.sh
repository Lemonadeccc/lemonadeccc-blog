#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOME_DIR="$ROOT_DIR/public/home"
INPUT="$HOME_DIR/home.mp4"
MP4_OUTPUT="$HOME_DIR/home-desktop.mp4"
WEBM_OUTPUT="$HOME_DIR/home-desktop.webm"
FFMPEG_BIN="${FFMPEG_BIN:-/opt/homebrew/bin/ffmpeg}"

if [[ ! -x "$FFMPEG_BIN" ]]; then
  echo "ffmpeg not found at $FFMPEG_BIN" >&2
  exit 1
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Missing input: $INPUT" >&2
  exit 1
fi

COMMON_FILTER="fps=30,format=yuv420p"

echo "Building desktop MP4..."
"$FFMPEG_BIN" -y \
  -i "$INPUT" \
  -an \
  -map_metadata -1 \
  -map_chapters -1 \
  -vf "$COMMON_FILTER" \
  -c:v libx264 \
  -preset slow \
  -crf 24 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$MP4_OUTPUT"

echo "Building desktop WebM..."
"$FFMPEG_BIN" -y \
  -i "$INPUT" \
  -an \
  -map_metadata -1 \
  -map_chapters -1 \
  -vf "$COMMON_FILTER" \
  -c:v libsvtav1 \
  -preset 8 \
  -crf 40 \
  -b:v 0 \
  "$WEBM_OUTPUT"

echo "Created:"
echo "  $MP4_OUTPUT"
echo "  $WEBM_OUTPUT"
