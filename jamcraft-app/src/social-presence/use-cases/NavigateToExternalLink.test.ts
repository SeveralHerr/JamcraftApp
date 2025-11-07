import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NavigateToExternalLink } from './NavigateToExternalLink';
import type { NavigationService } from '../services/BrowserNavigationService';

describe('NavigateToExternalLink', () => {
  let mockNavigationService: NavigationService;
  let useCase: NavigateToExternalLink;

  beforeEach(() => {
    mockNavigationService = {
      openInNewTab: vi.fn(),
    };
    useCase = new NavigateToExternalLink(mockNavigationService);
  });

  it('should open valid URL in new tab', () => {
    const validUrl = 'https://example.com';
    useCase.execute(validUrl);

    expect(mockNavigationService.openInNewTab).toHaveBeenCalledWith(validUrl);
    expect(mockNavigationService.openInNewTab).toHaveBeenCalledOnce();
  });

  it('should not navigate when URL is invalid', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    useCase.execute('not-a-valid-url');

    expect(mockNavigationService.openInNewTab).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Invalid URL provided:', 'not-a-valid-url');

    consoleSpy.mockRestore();
  });

  it('should handle various valid URL formats', () => {
    const validUrls = [
      'https://example.com',
      'http://example.com',
      'https://example.com/path',
      'https://example.com?query=param',
      'https://subdomain.example.com',
    ];

    validUrls.forEach(url => {
      mockNavigationService.openInNewTab = vi.fn();
      useCase = new NavigateToExternalLink(mockNavigationService);
      useCase.execute(url);
      expect(mockNavigationService.openInNewTab).toHaveBeenCalledWith(url);
    });
  });

  it('should reject invalid URLs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidUrls = [
      '',
      ' ',
      'not a url',
      'javascript:alert(1)',
    ];

    invalidUrls.forEach(url => {
      mockNavigationService.openInNewTab = vi.fn();
      useCase = new NavigateToExternalLink(mockNavigationService);
      useCase.execute(url);
      expect(mockNavigationService.openInNewTab).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('should prevent XSS via javascript: protocol', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    useCase.execute('javascript:alert("XSS")');

    expect(mockNavigationService.openInNewTab).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
