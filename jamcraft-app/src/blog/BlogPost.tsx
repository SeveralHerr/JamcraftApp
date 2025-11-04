import { useParams, Link } from 'react-router-dom';
import { Container, Title, Text, Button, Stack, Badge } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import ReactMarkdown from 'react-markdown';
import { useBlogPost } from './ui/hooks/useBlogPost';

export function BlogPost() {
  const { slug } = useParams();
  const { post, loading, notFound } = useBlogPost(slug);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}>
          <Text
            c="dimmed"
            size="lg"
            style={{
              opacity: 0.6,
              letterSpacing: '0.02em'
            }}
          >
            Loading...
          </Text>
        </div>
      </Container>
    );
  }

  if (notFound || !post) {
    return (
      <Container size="lg" py="xl">
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '4rem 2rem'
        }}>
          <Stack gap="xl">
            <Text
              c="dimmed"
              size="xl"
              style={{
                fontSize: '1.5rem',
                opacity: 0.7
              }}
            >
              Post not found.
            </Text>
            <Button
              component={Link}
              to="/blog"
              variant="subtle"
              leftSection={<IconArrowLeft size={18} />}
              style={{
                color: '#f6924b',
                alignSelf: 'center',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem'
              }}
            >
              Back to blog
            </Button>
          </Stack>
        </div>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl" px={{ base: 'md', sm: 'xl' }}>
      <article style={{
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        <Button
          component={Link}
          to="/blog"
          variant="subtle"
          leftSection={<IconArrowLeft size={18} />}
          style={{
            color: 'rgba(246, 146, 75, 0.8)',
            marginBottom: '2rem',
            padding: '0.5rem 1rem',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#f6924b';
            (e.currentTarget as HTMLElement).style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = 'rgba(246, 146, 75, 0.8)';
            (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
          }}
        >
          Back to blog
        </Button>

        <Stack gap={32}>
          <header style={{
            marginBottom: '1.5rem',
            animation: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) both'
          }}>
            <Title
              order={1}
              c="#ededed"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: '1.5rem'
              }}
            >
              {post.title}
            </Title>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {post.date && (
                <Text
                  size="sm"
                  c="dimmed"
                  style={{
                    fontSize: '0.95rem',
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

              {post.tags && post.tags.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
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
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, #f6924b, rgba(246, 146, 75, 0.3))',
              marginTop: '2rem',
              borderRadius: '2px'
            }} />
          </header>

          <div
            className="blog-content"
            style={{
              color: 'rgba(237, 237, 237, 0.9)',
              lineHeight: 1.8,
              fontSize: '1.125rem',
              animation: 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both'
            }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </Stack>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .blog-content h1,
          .blog-content h2,
          .blog-content h3,
          .blog-content h4 {
            color: #ededed;
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            line-height: 1.3;
          }

          .blog-content h1 { font-size: 2.25rem; }
          .blog-content h2 { font-size: 1.875rem; }
          .blog-content h3 { font-size: 1.5rem; }
          .blog-content h4 { font-size: 1.25rem; }

          .blog-content p {
            margin-bottom: 1.5rem;
          }

          .blog-content a {
            color: #f6924b;
            text-decoration: none;
            border-bottom: 1px solid rgba(246, 146, 75, 0.3);
            transition: all 0.2s ease;
          }

          .blog-content a:hover {
            border-bottom-color: #f6924b;
          }

          .blog-content code {
            background: rgba(255, 255, 255, 0.05);
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.95em;
            font-family: 'Monaco', 'Courier New', monospace;
            color: #f6924b;
          }

          .blog-content pre {
            background: rgba(26, 27, 30, 0.8);
            padding: 1.5rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 2rem 0;
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .blog-content pre code {
            background: none;
            padding: 0;
            color: rgba(237, 237, 237, 0.9);
          }

          .blog-content blockquote {
            border-left: 3px solid #f6924b;
            padding-left: 1.5rem;
            margin: 2rem 0;
            color: rgba(237, 237, 237, 0.7);
            font-style: italic;
          }

          .blog-content ul,
          .blog-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
          }

          .blog-content li {
            margin-bottom: 0.75rem;
          }

          .blog-content img {
            max-width: 100%;
            border-radius: 8px;
            margin: 2rem 0;
          }

          .blog-content hr {
            border: none;
            height: 1px;
            background: rgba(255, 255, 255, 0.1);
            margin: 3rem 0;
          }
        `}</style>
      </article>
    </Container>
  );
}
