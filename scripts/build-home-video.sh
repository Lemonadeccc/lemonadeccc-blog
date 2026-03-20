#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOME_DIR="$ROOT_DIR/public/home"
FFMPEG_BIN="${FFMPEG_BIN:-/opt/homebrew/bin/ffmpeg}"

if [[ ! -x "$FFMPEG_BIN" ]]; then
  echo "ffmpeg not found at $FFMPEG_BIN" >&2
  exit 1
fi

OUTPUT="$HOME_DIR/home.mp4"

"$FFMPEG_BIN" -y \
  -t 3 -i "$HOME_DIR/1.mov" \
  -i "$HOME_DIR/2.mov" \
  -i "$HOME_DIR/3.mov" \
  -t 3 -i "$HOME_DIR/4.mov" \
  -t 3 -i "$HOME_DIR/5.mov" \
  -t 3 -i "$HOME_DIR/6.mov" \
  -ss 43 -t 2 -i "$HOME_DIR/7.mov" \
  -t 3 -i "$HOME_DIR/8.MP4" \
  -i "$HOME_DIR/9.mov" \
  -t 3 -i "$HOME_DIR/10.mov" \
  -t 3 -i "$HOME_DIR/11.mov" \
  -t 3 -i "$HOME_DIR/12.MP4" \
  -filter_complex "\
[0:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v0];\
[1:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v1];\
[2:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v2];\
[3:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v3];\
[4:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v4];\
[5:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v5];\
[6:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v6];\
[7:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v7];\
[8:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v8];\
[9:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v9];\
[10:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v10];\
[11:v]scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,fps=30,setsar=1,format=yuv420p[v11];\
[v0][v1][v2][v3][v4][v5][v6][v7][v8][v9][v10][v11]concat=n=12:v=1:a=0[v]" \
  -map "[v]" \
  -an \
  -c:v libx264 \
  -preset medium \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUTPUT"

echo "Created $OUTPUT"
