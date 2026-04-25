import { useState, useMemo } from 'react';
import { FadeUp } from '../../../components/FadeUp';
import { SectionHead } from '../../../components/SectionHead';
import { Icon } from '../../../components/Icon';
import { GetGames } from '../../use-cases/GetGames';
import { games } from '../../data/games-data';
import type { Game } from '../../entities/Game';

const getGames = new GetGames(games);

export function GamesSection() {
  const allGames = useMemo(() => getGames.execute(), []);
  const [viewAllHover, setViewAllHover] = useState(false);

  return (
    <section
      id="games"
      aria-label="Games"
      style={{
        padding: '72px 0 96px',
        background: 'linear-gradient(180deg, transparent, rgba(245,158,11,.015) 50%, transparent)',
      }}
    >
      <div className="games-section-inner" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <SectionHead
          title="Games"
          kicker="jamcraft.io · Godot 4"
          countLabel={`${allGames.length} titles · playable`}
        />

        <div
          className="games-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}
        >
          {allGames.map((g, i) => <GameCard key={g.id} game={g} index={i} />)}
        </div>

        <FadeUp delay={200}>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <a
              href="https://jamcraft.itch.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all games on jamcraft.io"
              onMouseEnter={() => setViewAllHover(true)}
              onMouseLeave={() => setViewAllHover(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: '.15em',
                textTransform: 'uppercase',
                border: `1px solid ${viewAllHover ? 'var(--accent)' : 'var(--line-strong)'}`,
                color: viewAllHover ? 'var(--accent)' : 'var(--fg-dim)',
                transition: 'all .2s',
              }}
            >
              View all on jamcraft.io <Icon name="ext" size={12} />
            </a>
          </div>
        </FadeUp>
      </div>

      <style>{`
        @media (max-width: 860px) { .games-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .games-grid { grid-template-columns: 1fr !important; } .games-section-inner { padding: 0 24px !important; } }
      `}</style>
    </section>
  );
}

function GameCard({ game, index }: { game: Game; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <FadeUp delay={index * 60}>
      <a
        href={game.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${game.title}, ${game.tag}, ${game.year}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'block',
          background: 'var(--bg-2)',
          border: `1px solid ${hover ? 'var(--accent-glow)' : 'var(--line)'}`,
          transition: 'all .25s ease',
          cursor: 'pointer',
          transform: hover ? 'translateY(-4px)' : 'none',
          boxShadow: hover ? '0 18px 40px -20px rgba(0,0,0,.5)' : 'none',
          textDecoration: 'none',
        }}
      >
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              height: 180,
              background: game.gradient,
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 8px, transparent 8px 16px)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 10,
              left: 12,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '.08em',
              color: 'rgba(255,255,255,.55)',
              textTransform: 'uppercase',
            }}>
              {game.tag} · {game.year}
            </div>
          </div>

          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            background: hover ? 'var(--bg-overlay)' : 'transparent',
            transition: 'background .25s',
          }}>
            <div style={{
              opacity: hover ? 1 : 0,
              transform: hover ? 'scale(1)' : 'scale(.9)',
              transition: 'all .25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 18px',
              background: 'var(--accent)',
              color: 'var(--bg)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              <Icon name="play" size={12} color="var(--bg)" /> Play
            </div>
          </div>
        </div>

        <div style={{ padding: '20px 22px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--fg)',
            }}>
              {game.title}
            </div>
            <div style={{
              opacity: hover ? 1 : 0,
              transition: 'opacity .2s',
              color: 'var(--accent)',
              transform: hover ? 'translate(2px, -2px)' : 'none',
            }}>
              <Icon name="ext" size={14} />
            </div>
          </div>

          <div style={{ fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.55, marginBottom: 14 }}>
            {game.blurb}
          </div>

          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: 'var(--fg-faint)',
            letterSpacing: '.18em',
            textTransform: 'uppercase',
          }}>
            jamcraft.io →
          </div>
        </div>
      </a>
    </FadeUp>
  );
}
