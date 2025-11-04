import '@mantine/carousel/styles.css';
import { Container, Title, Text, Stack } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconSparkles } from '@tabler/icons-react';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { TESTIMONIALS_DATA } from '../testimonials/data/testimonials-data';
import { colors, typography } from '../theme';

const CATEGORY_COLORS = {
  craft: '#f6924b',
  vision: '#3b82f6',
  execution: '#10b981',
  innovation: '#8b5cf6',
} as const;

const CATEGORY_LABELS = {
  craft: 'Craft',
  vision: 'Vision',
  execution: 'Execution',
  innovation: 'Innovation',
} as const;

export function Testimonials() {
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
            animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) both',
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

          <Title
            order={1}
            c={colors.text.primary}
            style={{
              fontSize: typography.fontSize['6xl'],
              fontWeight: typography.fontWeight.bold,
              letterSpacing: typography.letterSpacing.tighter,
              lineHeight: typography.lineHeight.tight,
              marginBottom: '1rem',
            }}
          >
            Testimonials
          </Title>

          <Text
            c={colors.text.dimmed}
            size="xl"
            style={{
              fontSize: typography.fontSize.xl,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: '0.5rem',
            }}
          >
            What if Jony Ive reviewed this portfolio?
          </Text>

          <Text
            c={colors.text.subtle}
            size="sm"
            style={{
              fontSize: typography.fontSize.sm,
              fontStyle: 'italic',
              lineHeight: typography.lineHeight.relaxed,
              opacity: 0.7,
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
            {TESTIMONIALS_DATA.map((testimonial, index) => (
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

interface TestimonialCardProps {
  testimonial: typeof TESTIMONIALS_DATA[0];
  index: number;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const baseCategoryColor = CATEGORY_COLORS[testimonial.category];
  const categoryColor = testimonial.sentiment === 'critical' ? '#ef4444' : baseCategoryColor;

  return (
    <div
      style={{
        height: '100%',
        padding: '0 0.5rem',
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.background.glass} 0%, rgba(8, 27, 41, 0.6) 100%)`,
          backdropFilter: 'blur(20px)',
          border: `2px solid ${categoryColor}`,
          borderRadius: '16px',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 8px 40px ${categoryColor}30, inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        }}
      >
        {/* Symmetrical Corner Brackets (Closure Principle) */}
        {/* Top-Left Bracket */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            width: '40px',
            height: '40px',
            borderTop: `3px solid ${categoryColor}`,
            borderLeft: `3px solid ${categoryColor}`,
            borderTopLeftRadius: '12px',
            opacity: 0.6,
          }}
        />
        {/* Top-Right Bracket */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '40px',
            height: '40px',
            borderTop: `3px solid ${categoryColor}`,
            borderRight: `3px solid ${categoryColor}`,
            borderTopRightRadius: '12px',
            opacity: 0.6,
          }}
        />
        {/* Bottom-Left Bracket */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            width: '40px',
            height: '40px',
            borderBottom: `3px solid ${categoryColor}`,
            borderLeft: `3px solid ${categoryColor}`,
            borderBottomLeftRadius: '12px',
            opacity: 0.6,
          }}
        />
        {/* Bottom-Right Bracket */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            width: '40px',
            height: '40px',
            borderBottom: `3px solid ${categoryColor}`,
            borderRight: `3px solid ${categoryColor}`,
            borderBottomRightRadius: '12px',
            opacity: 0.6,
          }}
        />

        {/* Figure/Ground: Elevated Content Container */}
        <div
          style={{
            background: `radial-gradient(ellipse at center, ${categoryColor}08 0%, transparent 70%)`,
            borderRadius: '12px',
            padding: '1.5rem',
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          {/* AI Badge with Symmetry */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${categoryColor}30, ${categoryColor}10)`,
                border: `1px solid ${categoryColor}`,
                borderRadius: '20px',
                padding: '0.3rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: `0 4px 12px ${categoryColor}40`,
              }}
            >
              <IconSparkles size={12} color={categoryColor} />
              <Text
                size="xs"
                style={{
                  color: categoryColor,
                  fontWeight: typography.fontWeight.bold,
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: typography.letterSpacing.wider,
                }}
              >
                Claude AI
              </Text>
              <IconSparkles size={12} color={categoryColor} />
            </div>
          </div>

          {/* Category Badge - Centered for Symmetry */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                padding: '0.4rem 1.2rem',
                background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}cc)`,
                borderRadius: '20px',
                boxShadow: `0 4px 16px ${categoryColor}50, inset 0 1px 0 rgba(255, 255, 255, 0.3)`,
              }}
            >
              <Text
                size="xs"
                style={{
                  color: 'white',
                  fontWeight: typography.fontWeight.bold,
                  textTransform: 'uppercase',
                  letterSpacing: typography.letterSpacing.widest,
                  textShadow: `0 1px 2px rgba(0, 0, 0, 0.3)`,
                  fontSize: '0.7rem',
                }}
              >
                {CATEGORY_LABELS[testimonial.category]}
              </Text>
            </div>
          </div>

          {/* Quote - Centered Text for Figure/Ground */}
          <Text
            style={{
              fontSize: typography.fontSize.base,
              lineHeight: typography.lineHeight.relaxed,
              color: colors.text.primary,
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '0.5rem 1rem',
              textShadow: `0 2px 4px rgba(0, 0, 0, 0.3)`,
              position: 'relative',
              zIndex: 3,
              flex: 1,
              marginBottom: 'auto',
            }}
          >
            {testimonial.quote}
          </Text>

          {/* Attribution - Centered with Symmetrical Divider */}
          <div
            style={{
              marginTop: '1rem',
              textAlign: 'center',
            }}
          >
            {/* Symmetrical Divider Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${categoryColor}, transparent)`,
                }}
              />
            </div>

            <Text
              size="xs"
              style={{
                color: colors.text.dimmed,
                fontSize: typography.fontSize.xs,
                marginBottom: '0.25rem',
                fontStyle: 'italic',
              }}
            >
              {testimonial.context}
            </Text>
            <Text
              size="xs"
              style={{
                color: categoryColor,
                fontSize: '0.65rem',
                fontWeight: typography.fontWeight.bold,
                textTransform: 'uppercase',
                letterSpacing: typography.letterSpacing.wide,
              }}
            >
              — Fictional Jony Ive (via Claude Code)
            </Text>
          </div>
        </div>

        {/* Background Pattern for Figure/Ground Depth */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(circle at 20% 20%, ${categoryColor}15 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, ${categoryColor}10 0%, transparent 50%)`,
            borderRadius: '20px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}
