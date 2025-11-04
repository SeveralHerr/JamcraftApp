import { Card, Title, Text, Badge, Divider, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BlogPostMetadata } from '../../entities/BlogPost';

interface BlogPostCardProps {
  post: BlogPostMetadata;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const cardBackground = colorScheme === 'dark' ? theme.colors.dark[7] : theme.white;
  const borderColor = colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray?.[2] || '#e6e6e6';
  const dividerColor = colorScheme === 'dark' ? '#1a2733' : undefined;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      component="article"
      style={{
        background: cardBackground,
        border: `1px solid ${borderColor}`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <Link
            to={`/blog/${post.slug}`}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <Title
              order={3}
              c="#ededed"
              style={{ marginBottom: 6 }}
            >
              {post.title}
            </Title>
          </Link>

          {post.date && (
            <Text size="sm" c="dimmed">
              {new Date(post.date).toLocaleDateString()}
            </Text>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                style={{
                  background: '#f6924b',
                  color: '#fff'
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <Text>
          <ReactMarkdown>{post.excerpt}</ReactMarkdown>
        </Text>
      </div>

      <Divider
        my="md"
        style={{ borderColor: dividerColor }}
      />
    </Card>
  );
}
