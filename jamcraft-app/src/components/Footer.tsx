export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--line)',
      marginTop: 24,
      padding: '36px 48px 40px',
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '.15em',
          color: 'var(--fg-faint)',
        }}>
          <span style={{ color: 'var(--accent)' }}>●</span> JAMES HERR · 2026 · made with care
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--fg-faint)',
          letterSpacing: '.1em',
        }}>
          Godot 4 · Go · C# · React · Azure · Terraform
        </div>
      </div>
    </footer>
  );
}
