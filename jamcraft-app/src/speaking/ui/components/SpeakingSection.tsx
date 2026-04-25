import { useState, useMemo } from 'react';
import { FadeUp } from '../../../components/FadeUp';
import { SectionHead } from '../../../components/SectionHead';
import { Icon } from '../../../components/Icon';
import { GetTalks, type TalkFilter } from '../../use-cases/GetTalks';
import { talks } from '../../data/talks-data';
import type { Talk } from '../../entities/Talk';

const getTalks = new GetTalks(talks);
const FILTERS: { key: TalkFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'Podcast', label: 'Podcasts' },
  { key: 'Talk', label: 'Talks' },
];

export function SpeakingSection() {
  const [filter, setFilter] = useState<TalkFilter>('all');
  const counts = useMemo(() => getTalks.countByKind(), []);
  const filtered = useMemo(() => getTalks.execute(filter), [filter]);

  const getCount = (key: TalkFilter) => {
    if (key === 'all') return counts.all;
    return counts[key as keyof typeof counts] as number;
  };

  return (
    <section id="speaking" aria-label="Speaking and Podcasts" style={{ padding: '72px 0 96px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <SectionHead
          title="Speaking & Podcasts"
          kicker="On air · On stage"
          countLabel={`${talks.length} appearances · 2025—26`}
        />

        <FadeUp delay={80}>
          <div role="group" aria-label="Filter by type" style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                style={{
                  padding: '7px 14px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  background: filter === f.key ? 'var(--accent-subtle)' : 'transparent',
                  color: filter === f.key ? 'var(--accent)' : 'var(--fg-dim)',
                  border: `1px solid ${filter === f.key ? 'var(--accent)' : 'var(--line-strong)'}`,
                  transition: 'all .2s',
                }}
              >
                {f.label} <span style={{ opacity: .6 }}>({getCount(f.key)})</span>
              </button>
            ))}
          </div>
        </FadeUp>

        <div>
          {filtered.map((t, i) => <TalkRow key={t.id} talk={t} index={i} />)}
          <div style={{ borderTop: '1px solid var(--line)' }} />
        </div>
      </div>
    </section>
  );
}

function TalkRow({ talk, index }: { talk: Talk; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <FadeUp delay={index * 40}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="talk-row"
        style={{
          display: 'grid',
          gridTemplateColumns: '64px 1fr 220px 110px 28px',
          gap: 24,
          padding: '26px 12px',
          borderTop: '1px solid var(--line)',
          alignItems: 'start',
          cursor: 'pointer',
          transition: 'all .25s ease',
          background: hover ? `linear-gradient(90deg, var(--accent-trace), transparent 60%)` : 'transparent',
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          color: hover ? 'var(--accent)' : 'var(--fg-faint)',
          paddingTop: 8,
          transition: 'color .25s',
          letterSpacing: '.05em',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '.18em',
              padding: '4px 10px',
              borderRadius: 2,
              background: talk.kind === 'Podcast' ? 'var(--accent-dim)' : 'var(--line)',
              color: talk.kind === 'Podcast' ? 'var(--accent)' : 'var(--fg-medium)',
              textTransform: 'uppercase',
            }}>
              <Icon name={talk.kind === 'Podcast' ? 'mic' : 'talk'} size={10} stroke={2} />
              {talk.kind}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--fg-faint)' }}>
              {talk.length}
            </span>
          </div>

          <div style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: '-0.015em',
            lineHeight: 1.2,
            marginBottom: 8,
          }}>
            {talk.title}
          </div>

          <div style={{
            fontSize: 14,
            lineHeight: 1.55,
            color: 'var(--fg-dim)',
            maxHeight: hover ? 120 : 0,
            opacity: hover ? 1 : 0,
            overflow: 'hidden',
            transition: 'all .35s ease',
          }}>
            {talk.blurb}
          </div>
        </div>

        <div style={{ fontSize: 14, color: 'var(--fg-medium)', paddingTop: 6 }}>{talk.venue}</div>

        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--fg-faint)',
          textAlign: 'right',
          paddingTop: 8,
          letterSpacing: '.05em',
        }}>
          {talk.date}
        </div>

        <div style={{
          color: hover ? 'var(--accent)' : 'var(--fg-faint)',
          paddingTop: 6,
          transition: 'all .25s',
          transform: hover ? 'translateX(4px)' : 'none',
        }}>
          <Icon name="arrow" size={16} />
        </div>
      </article>

      <style>{`
        @media (max-width: 860px) {
          .talk-row { grid-template-columns: 48px 1fr !important; gap: 14px !important; }
          .talk-row > :nth-child(3),
          .talk-row > :nth-child(4),
          .talk-row > :nth-child(5) { display: none !important; }
        }
        @media (max-width: 560px) {
          .talk-row { padding: 20px 8px !important; }
        }
      `}</style>
    </FadeUp>
  );
}
