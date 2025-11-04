import { useEffect, useState } from "react";
import { useMantineTheme, useMantineColorScheme, Container, Title, Text, Badge, Card, Stack, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type PostMeta = {
  title: string;
  date?: string;
  slug: string;
  tags?: string[];
  content: string;
  path: string;
};

// Vite glob - loads raw markdown files from the content directory
const mdFiles = import.meta.glob("../content/blog/*.md", { as: "raw" });

function parseFrontmatter(raw: string) {
  const fm: Record<string, unknown> = { title: "", date: undefined, slug: "", tags: [] };
  if (!raw.startsWith("---")) return fm;
  const end = raw.indexOf("---", 3);
  if (end === -1) return fm;
  const block = raw.slice(3, end).trim();
  const lines = block.split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    let val = m[2].trim();
    if ((val.startsWith("\"") && val.endsWith("\"")) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key === "tags") {
      try {
        const parsed = JSON.parse(val.replace(/([a-zA-Z0-9_-]+)(?=,|\]|$)/g, '"$1"'));
        fm.tags = Array.isArray(parsed) ? parsed : [];
      } catch {
        fm.tags = val.replace(/\[|\]|\s/g, "").split(',').filter(Boolean);
      }
    } else {
      fm[key] = val;
    }
  }
  return fm;
}

function stripFrontmatter(raw: string) {
  if (!raw.startsWith("---")) return raw;
  const end = raw.indexOf("---", 3);
  if (end === -1) return raw;
  return raw.slice(end + 3).trim();
}

export function BlogList() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  // primaryColorArray was previously used for title/badge coloring; not needed now.

  useEffect(() => {
    const entries = Object.entries(mdFiles) as [string, () => Promise<string>][];
    Promise.all(
      entries.map(([path, resolver]) =>
        resolver().then((raw) => {
          const filename = path.split("/").pop() || path;
          // skip README or non-post files
          if (/README/i.test(filename)) return null;
          const meta = parseFrontmatter(raw);
          const content = stripFrontmatter(raw);
          const rawSlug = typeof meta.slug === "string" ? meta.slug : undefined;
          let slug = rawSlug ?? filename.replace(/\.md$/, "");
          slug = slug.replace(/^\d{4}-\d{2}-\d{2}-?/, "");
          return {
            title: meta.title || slug,
            date: meta.date,
            slug,
            tags: meta.tags || [],
            content,
            path,
          } as PostMeta | null;
        })
      )
    ).then((list) => {
      const filtered = list.filter(Boolean) as PostMeta[];
      filtered.sort((a, b) => {
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
      });
      setPosts(filtered);
    });
  }, []);

  return (
    <Container size="md" py="md">
      <Title order={2} my="md" style={{ textAlign: "center" }}>
        Blog
      </Title>

      <Stack>
        {posts.map((p) => (
          <Card
            key={p.slug}
            shadow="sm"
            padding="lg"
            radius="md"
            component="article"
            style={{
              background: colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
              border: `1px solid ${colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray ? theme.colors.gray[2] : '#e6e6e6'}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <Link to={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
                  <Title order={3} style={{ marginBottom: 6, color: '#ededed' }}>
                    {p.title}
                  </Title>
                </Link>
                {p.date && (
                  <Text size="sm" color="dimmed">
                    {new Date(p.date).toLocaleDateString()}
                  </Text>
                )}
              </div>

              <div>
                {p.tags?.map((t) => (
                  <Badge key={t} ml="xs" style={{ background: '#f6924b', color: '#fff' }}>
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text>
                <ReactMarkdown>{p.content.split(/\n\s*\n/)[0]}</ReactMarkdown>
              </Text>
            </div>

            <Divider my="md" style={{ borderColor: colorScheme === 'dark' ? '#1a2733' : undefined }} />
          </Card>
        ))}

        {posts.length === 0 && <Text color="dimmed">No posts yet.</Text>}
      </Stack>
    </Container>
  );
}
