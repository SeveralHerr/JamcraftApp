import { Card, Title, Text, Badge, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BlogPostMetadata } from '../../entities/BlogPost';

interface BlogPostCardProps {
  post: BlogPostMetadata;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const cardBackground = colorScheme === 'dark' ? 'rgba(26, 27, 30, 0.6)' : theme.white;
  const borderColor = colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : theme.colors.gray?.[2] || '#e6e6e6';

  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block'
      }}
    >
      <Card
        shadow="none"
        padding="xl"
        radius="lg"
        component="article"
        style={{
          background: cardBackground,
          border: `1px solid ${borderColor}`,
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(-2px)';
          target.style.borderColor = 'rgba(246, 146, 75, 0.4)';
          target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLElement;
          target.style.transform = 'translateY(0)';
          target.style.borderColor = borderColor;
          target.style.boxShadow = 'none';
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1.5rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ flex: 1 }}>
            <Title
              order={2}
              c="#ededed"
              style={{
                marginBottom: '0.75rem',
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.3
              }}
            >
              {post.title}
            </Title>

            {post.date && (
              <Text
                size="sm"
                c="dimmed"
                style={{
                  fontSize: '0.875rem',
                  letterSpacing: '0.01em',
                  opacity: 0.7
                }}
              >
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'flex-end'
            }}>
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="light"
                  style={{
                    background: 'rgba(246, 146, 75, 0.12)',
                    color: '#f6924b',
                    border: '1px solid rgba(246, 146, 75, 0.2)',
                    fontWeight: 500,
                    textTransform: 'lowercase',
                    letterSpacing: '0.02em',
                    padding: '0.5rem 0.875rem',
                    fontSize: '0.8rem'
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div style={{
          marginTop: '1rem',
          color: 'rgba(237, 237, 237, 0.8)',
          lineHeight: 1.7,
          fontSize: '1rem'
        }}>
          <ReactMarkdown>{post.excerpt}</ReactMarkdown>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #f6924b 0%, rgba(246, 146, 75, 0.4) 100%)',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          className="card-accent"
        />
      </Card>
    </Link>
  );
}
