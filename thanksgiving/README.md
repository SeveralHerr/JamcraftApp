# Thanksgiving potluck sign-up

Guests open the link, tap a course, type their dish and name. No account needed.
Vite + TypeScript frontend, Amplify Gen 2 Data backend (DynamoDB + AppSync, public API key).

- Change the courses or date: `src/signup/data/menu-config.ts`, push, Amplify redeploys.
- Host mode (edit/remove anyone's dish): add `#host` to the URL.
- Local preview without AWS: `npm install && npm run dev`, open `/?demo` for sample data. Nothing is saved.
- Tests: `npm test -- --run` (also run by the Amplify build).

## Deploy (one time, AWS console)

1. Amplify console → Create new app → GitHub → `SeveralHerr/JamcraftApp`, branch `thanksgiving`.
   Check "My app is a monorepo" with root `thanksgiving`. Amplify reads `amplify.yml` at the repo root.
2. Let Amplify create a service role (Gen 2 deploys the backend with it).
3. After the first deploy: Hosting → Custom domains → `jamcraft.io`, subdomain `thanksgiving` → this branch.
   If jamcraft.io's DNS is in Route 53 in the same account, Amplify adds the records itself.

## Notes

- The API key expires after 90 days; redeploying renews it.
- Anyone with the link can add, edit or delete dishes (same as a shared sheet). The page is `noindex`.
