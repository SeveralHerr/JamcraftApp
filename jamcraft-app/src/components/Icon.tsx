interface IconProps {
  name: 'in' | 'gh' | 'itch' | 'yt' | 'bsky' | 'mail' | 'arrow' | 'mic' | 'talk' | 'play' | 'ext' | 'controller' | 'dot';
  size?: number;
  color?: string;
  stroke?: number;
}

export function Icon({ name, size = 18, color = 'currentColor', stroke = 1.6 }: IconProps) {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'in':
      return <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7"/></svg>;
    case 'gh':
      return <svg {...p}><path d="M9 19c-4 1.5-4-2-6-2M15 22v-3.5a2 2 0 0 0-.5-1.5c3 0 6-2 6-5.5a4 4 0 0 0-1-3c.3-.8.3-2 0-3 0 0-1 0-3 1.5a10 10 0 0 0-6 0C8.5 5 7.5 5 7.5 5c-.4 1-.4 2 0 3a4 4 0 0 0-1 3c0 3.5 3 5.5 6 5.5a2 2 0 0 0-.5 1.5V22"/></svg>;
    case 'itch':
      return <svg {...p}><path d="M3 7l2-3h14l2 3M3 7v2a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0V7M5 9v10h14V9"/><path d="M9 14h6"/></svg>;
    case 'yt':
      return <svg {...p}><rect x="2" y="6" width="20" height="12" rx="3"/><path d="M10 9l5 3-5 3z" fill={color}/></svg>;
    case 'bsky':
      return <svg {...p}><path d="M12 13c-2-5-5-7-7-7 0 3 0 6 2 8 1 1 3 1.5 5 1.5s4-.5 5-1.5c2-2 2-5 2-8-2 0-5 2-7 7z"/><path d="M12 13v8"/></svg>;
    case 'mail':
      return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case 'arrow':
      return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'mic':
      return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>;
    case 'talk':
      return <svg {...p}><path d="M4 5h16v10H8l-4 4z"/></svg>;
    case 'play':
      return <svg {...p}><path d="M6 4l14 8-14 8z" fill={color}/></svg>;
    case 'ext':
      return <svg {...p}><path d="M14 4h6v6M20 4L10 14M18 14v6H4V6h6"/></svg>;
    case 'controller':
      return <svg {...p}><path d="M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5.5 1.5L14 13h-4l-2.5 2.5A3 3 0 0 1 2 14v-2a4 4 0 0 1 4-4z"/><path d="M8 11v2M7 12h2M15 12h.01M17 13h.01"/></svg>;
    case 'dot':
      return <svg {...p}><circle cx="12" cy="12" r="4" fill={color}/></svg>;
    default:
      return null;
  }
}
