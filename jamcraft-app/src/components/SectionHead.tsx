import { FadeUp } from './FadeUp';

interface SectionHeadProps {
  title: string;
  kicker?: string;
  countLabel?: string;
}

export function SectionHead({ title, kicker, countLabel }: SectionHeadProps) {
  return (
    <FadeUp>
      <div style={{ marginBottom: 36 }}>
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingBottom: 18,
          borderBottom: '1px solid var(--line)',
        }}>
          <div>
            {kicker && (
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--fg-faint)',
                marginBottom: 10,
              }}>
                {kicker}
              </div>
            )}
            <h2 style={{
              margin: 0,
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              {title}<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
          </div>
          {countLabel && (
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--fg-dim)',
              letterSpacing: '.12em',
              textAlign: 'right',
            }}>
              <span style={{ color: 'var(--accent)' }}>●</span> {countLabel}
            </div>
          )}
        </div>
      </div>
    </FadeUp>
  );
}
