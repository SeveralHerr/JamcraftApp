Jamcraft blog content directory

Place Markdown files here for blog posts. Recommended frontmatter:

---
# title: string
# date: YYYY-MM-DD or ISO
# slug: short-url-friendly-slug
# tags: [array, of, tags]
---

Filename convention: `YYYY-MM-DD-your-slug.md` — this makes chronological ordering straightforward.

Rendering notes:
- The app can either load these at build-time (import.meta.glob) or fetch them from `public/blog/` at runtime if you prefer an external generation step.
- Use relative image paths if you store images in `public/assets/blog/<slug>/` so they resolve correctly at runtime.

Pagination guidance:
- If you expect more than ~10 posts, enable pagination (page size 5 or 10). Otherwise a single page listing is fine.

Security & size limits:
- Keep individual posts under ~2–3 MB (images are the main cause).
- Sanitize any HTML pasted into posts; prefer Markdown.

