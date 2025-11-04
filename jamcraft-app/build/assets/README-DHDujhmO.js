const e=`Jamcraft blog content directory\r
\r
Place Markdown files here for blog posts. Recommended frontmatter:\r
\r
---\r
# title: string\r
# date: YYYY-MM-DD or ISO\r
# slug: short-url-friendly-slug\r
# tags: [array, of, tags]\r
---\r
\r
Filename convention: \`YYYY-MM-DD-your-slug.md\` — this makes chronological ordering straightforward.\r
\r
Rendering notes:\r
- The app can either load these at build-time (import.meta.glob) or fetch them from \`public/blog/\` at runtime if you prefer an external generation step.\r
- Use relative image paths if you store images in \`public/assets/blog/<slug>/\` so they resolve correctly at runtime.\r
\r
Pagination guidance:\r
- If you expect more than ~10 posts, enable pagination (page size 5 or 10). Otherwise a single page listing is fine.\r
\r
Security & size limits:\r
- Keep individual posts under ~2–3 MB (images are the main cause).\r
- Sanitize any HTML pasted into posts; prefer Markdown.\r
\r
`;export{e as default};
