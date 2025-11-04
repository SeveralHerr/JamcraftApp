import '@mantine/carousel/styles.css';
import { Container, Text, Stack } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconSparkles } from '@tabler/icons-react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useTestimonials } from './ui/hooks/useTestimonials';
import { TestimonialCard } from './ui/components/TestimonialCard';
import { PageHeader } from '../components/ui/PageHeader';
import { colors, typography } from '../theme';

export function TestimonialsPage() {
  const { testimonials } = useTestimonials();
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Container size="xl" py="xl" px={{ base: 'md', sm: 'xl' }}>
      <Stack gap="xl">
        {/* Header with Satire Disclaimer */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: `linear-gradient(45deg, ${colors.brand.primary}, #8b5cf6)`,
                borderRadius: '24px',
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.bold,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
                color: 'white',
                boxShadow: '0 4px 20px rgba(246, 146, 75, 0.3)',
              }}
            >
              <IconSparkles size={16} />
              AI-Generated Satire
            </div>
          </div>

          <PageHeader
            title="Testimonials"
            subtitle="What if Jony Ive reviewed this portfolio?"
            align="center"
          />

          <Text
            c={colors.text.subtle}
            size="sm"
            ta="center"
            style={{
              fontSize: typography.fontSize.sm,
              fontStyle: 'italic',
              lineHeight: typography.lineHeight.relaxed,
              opacity: 0.7,
              marginTop: '0.5rem',
            }}
          >
            (Spoiler: He didn't. Claude Code did. These are satirical, AI-generated quotes.)
          </Text>
        </div>

        {/* Carousel */}
        <div
          style={{
            animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both',
            maxWidth: '1000px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Carousel
            slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
            slideGap={{ base: 'sm', sm: 'md' }}
            loop
            align="start"
            slidesToScroll={1}
            withIndicators
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            styles={{
              control: {
                backgroundColor: colors.background.glass,
                backdropFilter: 'blur(10px)',
                border: `2px solid ${colors.brand.primary}`,
                color: colors.brand.primary,
                opacity: 1,
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: colors.brand.primary,
                  color: 'white',
                  transform: 'scale(1.1)',
                  boxShadow: '0 0 20px rgba(246, 146, 75, 0.5)',
                },
                '&[data-inactive]': {
                  opacity: 0,
                  cursor: 'default',
                },
              },
              indicator: {
                width: '12px',
                height: '12px',
                backgroundColor: colors.border.primary,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&[data-active]': {
                  width: '32px',
                  backgroundColor: colors.brand.primary,
                },
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Carousel.Slide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>

        {/* Footer Disclaimer */}
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            background: colors.background.glass,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${colors.border.primary}`,
            borderRadius: '12px',
            maxWidth: '700px',
            margin: '0 auto',
            animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both',
          }}
        >
          <Text
            size="sm"
            c={colors.text.tertiary}
            style={{
              lineHeight: typography.lineHeight.relaxed,
            }}
          >
            <strong>Disclaimer:</strong> These testimonials are fictional and generated by Claude Code (Anthropic's AI assistant)
            for entertainment purposes. Jony Ive has never reviewed this portfolio. Any resemblance to actual statements
            by real people is purely coincidental and satirical in nature.
          </Text>
        </div>
      </Stack>
    </Container>
  );
}
