import { useParams, Link } from 'react-router-dom';
import { Container, Title, Text, Button, Stack, Badge, Divider } from '@mantine/core';
import ReactMarkdown from 'react-markdown';
import { useBlogPost } from './ui/hooks/useBlogPost';

export function BlogPost() {
  const { slug } = useParams();
  const { post, loading, notFound } = useBlogPost(slug);

  if (loading) {
    return (
      <Container size="lg" py="xl">
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (notFound || !post) {
    return (
      <Container size="lg" py="xl">
        <Stack gap="md">
          <Text c="dimmed">Post not found.</Text>
          <Button
            component={Link}
            to="/blog"
            variant="subtle"
            style={{
              color: '#f6924b'
            }}
          >
            Back to blog
          </Button>
        </Stack>
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
              fontWeight: 'bold'
            }}
          >
            {post.title}
          </Title>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.75rem' }}>
            {post.date && (
              <Text size="sm" c="dimmed">
                {new Date(post.date).toLocaleDateString()}
              </Text>
            )}

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
        </div>

        <Divider color="#1a2733" />

        <div style={{ color: '#ededed' }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <Divider color="#1a2733" />

        <Button
          component={Link}
          to="/blog"
          variant="subtle"
          style={{
            color: '#f6924b',
            alignSelf: 'flex-start'
          }}
        >
          Back to blog
        </Button>
      </Stack>
    </Container>
  );
}
