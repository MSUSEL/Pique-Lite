#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

CURRENT_BRANCH="$(git branch --show-current)"
if [[ -z "${CURRENT_BRANCH}" ]]; then
  echo "Not on a branch. Abort."
  exit 1
fi

echo "[deploy] current branch: ${CURRENT_BRANCH}"
echo "[deploy] building (GH_PAGES=1) ..."

rm -rf build
GH_PAGES=1 bun run build:demo

node scripts/generate-gh-pages-index.mjs

# stage dist to tmp
TMP_DIR="/tmp/ghpages-dist"
rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"
cp -R build/client/* "${TMP_DIR}/"
rm -f "${TMP_DIR}/.DS_Store"

echo "[deploy] switching to gh-pages ..."
git checkout gh-pages

echo "[deploy] cleaning gh-pages working tree ..."
rm -rf ./* .DS_Store .gitignore .netlify src node_modules build || true

echo "[deploy] copying dist ..."
cp -R "${TMP_DIR}/"* .
rm -f .DS_Store

git add -A
if git diff --cached --quiet; then
  echo "[deploy] no changes to deploy."
else
  git commit -m "Deploy GH Pages"
  git push
fi

echo "[deploy] switching back to ${CURRENT_BRANCH} ..."
git checkout "${CURRENT_BRANCH}"

echo "[deploy] done ✅"
