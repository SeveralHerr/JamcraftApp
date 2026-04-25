import { useState } from 'react';
import { FadeUp } from '../../../components/FadeUp';
import { PortraitFrame } from '../../../components/PortraitFrame';
import { Icon } from '../../../components/Icon';
import { profile } from '../../data/profile-data';
import { socialLinks } from '../../../social/data/social-links-data';

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export function HeroSection({ onScrollTo }: HeroSectionProps) {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<'speaking' | 'games' | null>(null);

  return (
    <section id="home" aria-label="Hero" style={{ position: 'relative', padding: '88px 0 120px' }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 48px',
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: 72,
          alignItems: 'center',
        }}
      >
        <FadeUp>
          <PortraitFrame src={profile.portraitSrc} alt={profile.portraitAlt} size={380} />
        </FadeUp>

        <div>
          <FadeUp delay={80}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
              marginBottom: 18,
            }}>
              Hello, I am
            </div>
          </FadeUp>

          <FadeUp delay={140}>
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.92,
              fontWeight: 700,
              letterSpacing: '-0.035em',
              margin: '0 0 28px',
            }}>
              James<br />Herr<span style={{ color: 'var(--accent)' }}>.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={200}>
            <p style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: 'var(--fg)',
              maxWidth: 620,
              margin: '0 0 24px',
            }}>
              {profile.longBio}
            </p>
          </FadeUp>

          <FadeUp delay={260}>
            <blockquote style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: 18,
              fontStyle: 'italic',
              fontSize: 14,
              color: 'var(--fg-dim)',
              maxWidth: 560,
              marginBottom: 32,
              margin: '0 0 32px',
            }}>
              "{profile.quote}"{' '}
              <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>
                — {profile.quoteAuthor}
              </span>
            </blockquote>
          </FadeUp>

          <FadeUp delay={320}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <button
                onClick={() => onScrollTo('speaking')}
                onMouseEnter={() => setHoveredBtn('speaking')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  border: 'none',
                  padding: '14px 22px',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  transition: 'transform .2s',
                  transform: hoveredBtn === 'speaking' ? 'translateY(-2px)' : 'none',
                }}
              >
                Book a talk <Icon name="arrow" size={14} />
              </button>
              <button
                onClick={() => onScrollTo('games')}
                onMouseEnter={() => setHoveredBtn('games')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  background: 'transparent',
                  color: hoveredBtn === 'games' ? 'var(--accent)' : 'var(--fg)',
                  border: `1px solid ${hoveredBtn === 'games' ? 'var(--accent)' : 'var(--line-strong)'}`,
                  padding: '14px 22px',
                  fontFamily: 'inherit',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all .2s',
                }}
              >
                See games
              </button>
            </div>
          </FadeUp>

          <FadeUp delay={380}>
            <ul aria-label="Social links" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
              {socialLinks.map((s, i) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    target={s.url.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={`${s.label} — ${s.handle}`}
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 6,
                      background: hoveredSocial === i ? 'var(--accent)' : 'var(--fg-icon)',
                      color: hoveredSocial === i ? 'var(--bg)' : 'var(--fg)',
                      border: '1px solid var(--line)',
                      display: 'grid',
                      placeItems: 'center',
                      cursor: 'pointer',
                      transition: 'all .18s ease',
                      transform: hoveredSocial === i ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <Icon name={s.icon} size={17} stroke={1.8} />
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 560px) {
          .hero-grid { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
