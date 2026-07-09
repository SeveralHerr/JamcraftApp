#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR/jamcraft-app"
npm install

# The sandbox ships a pre-installed Chromium that may not match the
# @playwright/test version pinned in package.json, so pointing Playwright
# at it directly avoids a failed/blocked "playwright install" download.
if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PLAYWRIGHT_CHROMIUM_PATH=/opt/pw-browsers/chromium" >> "$CLAUDE_ENV_FILE"
fi
