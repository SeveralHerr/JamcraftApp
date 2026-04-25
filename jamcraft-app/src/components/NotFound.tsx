export function NotFound() {
  return (
    <div style={{
      maxWidth: 560,
      margin: '80px auto',
      padding: '0 24px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontFamily: "'Fraunces', serif", marginBottom: 16 }}>
        404 - Page Not Found
      </h1>
      <p style={{ color: 'var(--fg-dim, rgba(232,230,225,.65))', marginBottom: 24 }}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'var(--accent, #f59e0b)',
          color: 'var(--bg)',
          fontFamily: 'inherit',
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Go back home
      </a>
    </div>
  );
}
