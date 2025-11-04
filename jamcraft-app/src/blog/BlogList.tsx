import { Container, Title, Text, Stack } from '@mantine/core';
import { useBlogPosts } from './ui/hooks/useBlogPosts';
import { BlogPostCard } from './ui/components/BlogPostCard';

export function BlogList() {
  const { posts, loading } = useBlogPosts();

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

  return (
    <Container size="lg" py="xl" px={{ base: 'md', sm: 'xl' }}>
      <Stack gap={48}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            marginBottom: '3rem'
          }}>
            <Title
              order={1}
              c="#ededed"
              ta="center"
              style={{
                fontSize: '3.5rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: '1rem'
              }}
            >
              Blog
            </Title>
            <Text
              c="dimmed"
              ta="center"
              size="lg"
              style={{
                fontSize: '1.125rem',
                opacity: 0.7,
                letterSpacing: '0.01em',
                lineHeight: 1.6
              }}
            >
              Thoughts, tutorials, and updates
            </Text>
          </div>

          <Stack gap={24}>
            {posts.map((post, index) => (
              <div
                key={post.slug}
                style={{
                  animation: `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s both`
                }}
              >
                <BlogPostCard post={post} />
              </div>
            ))}

            {posts.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                opacity: 0.5
              }}>
                <Text c="dimmed" size="lg">
                  No posts yet.
                </Text>
              </div>
            )}
          </Stack>
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

        .card-accent {
          pointer-events: none;
        }

        article:hover .card-accent {
          transform: scaleX(1) !important;
        }
      `}</style>
    </Container>
  );
}
