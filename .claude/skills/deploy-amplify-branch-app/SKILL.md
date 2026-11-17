---
name: deploy-amplify-branch-app
description: Ship a small standalone web app (e.g. an event sign-up) from an orphan branch of JamcraftApp to its own Amplify Gen 2 app and a jamcraft.io subdomain. Use when the user wants a quick custom app "on jamcraft" that needs a shared database without logins.
---

# Standalone app on an orphan branch + Amplify Gen 2

1. `git worktree add --orphan -b <name> ../<name>-app`, put the app in a subfolder (monorepo root for Amplify).
2. Frontend: Vite + TS. Backend: `amplify/data/resource.ts` with `allow.publicApiKey()` when guests must not sign in.
3. Keep a `DishRepository`-style interface with an in-memory implementation so tests and `npm run dev` work with no AWS.
4. Load `amplify_outputs.json` via `import.meta.glob` so the build works with or without it.
5. `amplify.yml`: backend `npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID`, frontend test + build.
6. CSP in `customHttp.yml`: `connect-src` needs `https://*.amazonaws.com wss://*.amazonaws.com` for AppSync.
7. Verify the backend locally without AWS: `CDK_CONTEXT_JSON='{"amplify-backend-name":"x","amplify-backend-namespace":"y","amplify-backend-type":"branch"}' CDK_OUTDIR=/tmp/cdk npx tsx amplify/backend.ts`.

## Gotchas

- vitest 4 + @aws-amplify/backend crashed npm's resolver (`reading 'edgesOut'`); vitest 3 works.
- Amplify's packages give a lockfile `npm ci` rejects; use `npm install` in amplify.yml.
- The cloud sandbox can't reach AWS APIs (proxy blocks sts.amazonaws.com): push the branch and have the user connect it in the Amplify console.
