interface FrontmatterData {
  title?: string;
  date?: string;
  slug?: string;
  tags?: string[];
}

export function parseFrontmatter(raw: string): FrontmatterData {
  const fm: FrontmatterData = {};

  if (!raw.startsWith('---')) {
    return fm;
  }

  const endIndex = raw.indexOf('---', 3);
  if (endIndex === -1) {
    return fm;
  }

  const frontmatterBlock = raw.slice(3, endIndex).trim();
  const lines = frontmatterBlock.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/);
    if (!match) continue;

    const key = match[1].trim();
    let value = match[2].trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (key === 'tags') {
      fm.tags = parseTags(value);
    } else if (key === 'title') {
      fm.title = value;
    } else if (key === 'date') {
      fm.date = value;
    } else if (key === 'slug') {
      fm.slug = value;
    }
  }

  return fm;
}

function parseTags(value: string): string[] {
  try {
    const jsonValue = value.replace(/([a-zA-Z0-9_-]+)(?=,|\]|$)/g, '"$1"');
    const parsed = JSON.parse(jsonValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.replace(/\[|\]|\s/g, '').split(',').filter(Boolean);
  }
}

export function stripFrontmatter(raw: string): string {
  if (!raw.startsWith('---')) {
    return raw;
  }

  const endIndex = raw.indexOf('---', 3);
  if (endIndex === -1) {
    return raw;
  }

  return raw.slice(endIndex + 3).trim();
}

export function extractExcerpt(content: string): string {
  const firstParagraph = content.split(/\n\s*\n/)[0];
  return firstParagraph || '';
}

export function normalizeSlug(filename: string, frontmatterSlug?: string): string {
  if (frontmatterSlug) {
    return frontmatterSlug;
  }

  const withoutExtension = filename.replace(/\.md$/, '');
  const withoutDate = withoutExtension.replace(/^\d{4}-\d{2}-\d{2}-?/, '');

  return withoutDate;
}
