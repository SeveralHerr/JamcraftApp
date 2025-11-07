import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserNavigationService } from './BrowserNavigationService';

describe('BrowserNavigationService', () => {
  let service: BrowserNavigationService;

  beforeEach(() => {
    service = new BrowserNavigationService();
    vi.clearAllMocks();
  });

  it('should open URL in new tab with security attributes', () => {
    const url = 'https://example.com';
    service.openInNewTab(url);

    expect(window.open).toHaveBeenCalledWith(
      url,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should handle multiple consecutive calls', () => {
    service.openInNewTab('https://first.com');
    service.openInNewTab('https://second.com');

    expect(window.open).toHaveBeenCalledTimes(2);
  });

  it('should use noopener to prevent window.opener access', () => {
    service.openInNewTab('https://example.com');

    const callArgs = (window.open as any).mock.calls[0];
    expect(callArgs[2]).toContain('noopener');
  });

  it('should use noreferrer to prevent referrer leaking', () => {
    service.openInNewTab('https://example.com');

    const callArgs = (window.open as any).mock.calls[0];
    expect(callArgs[2]).toContain('noreferrer');
  });
});
