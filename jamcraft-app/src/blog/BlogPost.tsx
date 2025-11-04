import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Title, Text, Button } from "@mantine/core";
import ReactMarkdown from "react-markdown";

const mdFiles = import.meta.glob("../content/blog/*.md", { as: "raw" });

function parseFrontmatter(raw: string) {
  const fm: { title?: string; date?: string; slug?: string; tags?: string[] } = {};
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
        fm.tags = Array.isArray(parsed) ? parsed as string[] : [];
      } catch {
        fm.tags = val.replace(/\[|\]|\s/g, "").split(',').filter(Boolean);
      }
    } else {
      if (key === "title") fm.title = val;
      else if (key === "date") fm.date = val;
      else if (key === "slug") fm.slug = val;
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

export function BlogPost() {
  const { slug } = useParams();
  const [content, setContent] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ title?: string; date?: string; slug?: string; tags?: string[] } | null>(null);
  useEffect(() => {
    const entries = Object.entries(mdFiles) as [string, () => Promise<string>][];
    Promise.all(
      entries.map(([path, resolver]) => resolver().then((raw) => ({ path, raw })))
    ).then((list) => {
      // find by frontmatter.slug or filename
      for (const item of list) {
        const fm = parseFrontmatter(item.raw);
        const rawSlug = typeof fm.slug === "string" ? fm.slug : undefined;
        let candidate = rawSlug ?? item.path.split("/").pop()!.replace(/\.md$/, "");
        candidate = candidate.replace(/^\d{4}-\d{2}-\d{2}-?/, "");
        if (candidate === slug) {
          setMeta(fm);
          setContent(stripFrontmatter(item.raw));
          return;
        }
      }
      // not found
      setContent(null);
    });
  }, [slug]);

  if (content === null && meta === null) {
    return (
      <Container size="md">
        <Text color="dimmed">Post not found.</Text>
        <Button component={Link} to="/blog" variant="subtle" mt="md">
          Back to blog
        </Button>
      </Container>
    );
  }

  return (
    <Container size="md">
      <Title order={2} my="md" style={{ color: '#ededed' }}>
        {meta?.title ?? "Untitled"}
      </Title>
      <Text size="sm" color="dimmed">
        {meta && typeof meta.date === "string" ? new Date(meta.date).toLocaleDateString() : ""}
      </Text>
      <div style={{ marginTop: 16 }}>
        <ReactMarkdown>{content || ''}</ReactMarkdown>
      </div>
    </Container>
  );
}
