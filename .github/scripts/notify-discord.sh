#!/usr/bin/env bash
# Posts a Discord embed for Forge CI. Skips when DISCORD_WEBHOOK_URL is unset
# so local clones and secret-less forks do not fail the workflow.
set -euo pipefail

if [ -z "${DISCORD_WEBHOOK_URL:-}" ]; then
  echo "DISCORD_WEBHOOK_URL is not set; skipping Discord notify."
  exit 0
fi

NOTIFY_TITLE="${NOTIFY_TITLE:-CI update}"
NOTIFY_COLOR="${NOTIFY_COLOR:-3447003}"
NOTIFY_STAGE="${NOTIFY_STAGE:-}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-}"
PR_NUMBER="${PR_NUMBER:-}"
CHECK_RESULT="${CHECK_RESULT:-}"
E2E_RESULT="${E2E_RESULT:-}"
VERCEL_RESULT="${VERCEL_RESULT:-}"
DEPLOY_URL="${DEPLOY_URL:-}"
DEPLOY_ENV="${DEPLOY_ENV:-}"

REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}"
RUN_URL="${REPO_URL}/actions/runs/${GITHUB_RUN_ID}"
SHA_SHORT="$(printf '%s' "${GITHUB_SHA:-}" | cut -c1-7)"
BRANCH="${GITHUB_REF_NAME:-}"
ACTOR="${GITHUB_ACTOR:-}"

if [ -n "$PR_NUMBER" ] && [ "$PR_NUMBER" != "null" ]; then
  COMMIT_LINK="${REPO_URL}/pull/${PR_NUMBER}"
else
  COMMIT_LINK="${REPO_URL}/commit/${GITHUB_SHA}"
fi

DESCRIPTION="$(printf '%s' "$COMMIT_MESSAGE" | head -n 1 | cut -c1-300)"

payload="$(
  jq -n \
    --arg title "$NOTIFY_TITLE" \
    --argjson color "$NOTIFY_COLOR" \
    --arg description "$DESCRIPTION" \
    --arg branch "$BRANCH" \
    --arg actor "$ACTOR" \
    --arg sha "$SHA_SHORT" \
    --arg commit_link "$COMMIT_LINK" \
    --arg run_url "$RUN_URL" \
    --arg stage "$NOTIFY_STAGE" \
    --arg check "$CHECK_RESULT" \
    --arg e2e "$E2E_RESULT" \
    --arg vercel "$VERCEL_RESULT" \
    --arg deploy_url "$DEPLOY_URL" \
    --arg deploy_env "$DEPLOY_ENV" \
    --arg pr "$PR_NUMBER" \
    '
    def field(n; v):
      if (v | length) > 0 and v != "null" then {name: n, value: v, inline: true} else empty end;

    {
      embeds: [
        {
          title: $title,
          color: $color,
          url: $run_url,
          description: (if ($description | length) > 0 then $description else null end),
          fields: [
            field("Branch"; $branch),
            field("Actor"; $actor),
            field("Commit"; (if ($sha | length) > 0 then "[`" + $sha + "`](" + $commit_link + ")" else "" end)),
            field("PR"; (if ($pr | length) > 0 and $pr != "null" then "#" + $pr else "" end)),
            field("Stage"; $stage),
            field("Check"; $check),
            field("E2E"; $e2e),
            field("Vercel"; $vercel),
            field("Env"; $deploy_env),
            field("URL"; (if ($deploy_url | length) > 0 then $deploy_url else "" end))
          ]
        }
      ]
    }
    '
)"

curl -fsS -H "Content-Type: application/json" -d "$payload" "$DISCORD_WEBHOOK_URL"
echo "Discord notify sent ($NOTIFY_STAGE)."
