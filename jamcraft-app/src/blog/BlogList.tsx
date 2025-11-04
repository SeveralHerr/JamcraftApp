import { Container, Text, Stack } from '@mantine/core';
import { useBlogPosts } from './ui/hooks/useBlogPosts';
import { BlogPostCard } from './ui/components/BlogPostCard';
import { PageHeader } from '../components/ui/PageHeader';

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
            <PageHeader
              title="Blog"
              subtitle="Thoughts, tutorials, and updates"
              align="center"
            />
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
