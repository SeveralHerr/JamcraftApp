import { useState, useEffect } from 'react';

interface SiteNavProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'games', label: 'Games' },
  { id: 'contact', label: 'Contact' },
];

export function SiteNav({ activeSection, onNavClick }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 30);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavClick(id);
    setMobileOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all .25s ease',
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '22px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a
          href="#home"
          onClick={e => { e.preventDefault(); handleNavClick('home'); }}
          aria-label="James Herr — Home"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          James Herr<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <nav aria-label="Main navigation" style={{ display: 'flex', gap: 34, fontSize: 14 }} className="site-desktop-nav">
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
              onClick={e => { e.preventDefault(); handleNavClick(link.id); }}
              onMouseEnter={() => setHoveredLink(link.id)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                color: activeSection === link.id ? 'var(--accent)' : hoveredLink === link.id ? 'var(--fg)' : 'var(--fg-dim)',
                position: 'relative',
                paddingBottom: 4,
                borderBottom: activeSection === link.id ? '1px solid var(--accent)' : '1px solid transparent',
                transition: 'color .2s, border-color .2s',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            className="site-available-badge"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--fg-faint)',
              letterSpacing: '.1em',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>●</span> AVAILABLE
          </div>

          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(o => !o)}
            className="site-mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--line-strong)',
              color: 'var(--fg)',
              padding: '8px 12px',
              cursor: 'pointer',
              fontSize: 13,
              letterSpacing: '.05em',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
            background: 'var(--bg-nav-mobile)',
            borderTop: '1px solid var(--line)',
          }}
          className="site-mobile-nav"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? 'page' : undefined}
              onClick={e => { e.preventDefault(); handleNavClick(link.id); }}
              style={{
                padding: '14px 0',
                borderBottom: '1px solid var(--line)',
                color: activeSection === link.id ? 'var(--accent)' : 'var(--fg)',
                fontFamily: "'Fraunces', serif",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <style>{`
        @media (max-width: 720px) {
          .site-desktop-nav { gap: 20px !important; font-size: 13px !important; }
          .site-available-badge { display: none !important; }
        }
        @media (max-width: 520px) {
          .site-desktop-nav { display: none !important; }
          .site-mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
