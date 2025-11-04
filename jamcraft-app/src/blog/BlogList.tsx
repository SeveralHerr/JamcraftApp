import { Container, Title, Text, Stack, Divider } from '@mantine/core';
import { useBlogPosts } from './ui/hooks/useBlogPosts';
import { BlogPostCard } from './ui/components/BlogPostCard';

export function BlogList() {
  const { posts, loading } = useBlogPosts();

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title
            order={1}
            c="#ededed"
            ta="left"
            style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            Blog
          </Title>
          <Text c="gray.5" ta="left" mt="xs">
            Thoughts, tutorials, and updates
          </Text>
        </div>

        <Divider color="#1a2733" />

        <Stack gap="lg">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}

          {posts.length === 0 && (
            <Text c="dimmed">No posts yet.</Text>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
