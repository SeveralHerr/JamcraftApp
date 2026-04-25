interface PortraitFrameProps {
  src: string;
  alt?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function PortraitFrame({ src, alt, size = 380, style }: PortraitFrameProps) {
  return (
    <div style={{
      position: 'relative',
      width: size,
      height: size,
      maxWidth: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
      background: 'var(--bg-2)',
      boxShadow: `0 0 0 2px var(--accent), 0 30px 80px -20px rgba(0,0,0,.6)`,
      ...style,
    }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}
