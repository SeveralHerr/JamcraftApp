import { NavigationService } from '../services/BrowserNavigationService';

/** Security: only https links leave the site (blocks javascript:, data:, file: and plaintext http:). */
export function isSafeExternalUrl(url: string): boolean {
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export class NavigateToExternalLink {
  constructor(private navigationService: NavigationService) {}

  execute(url: string): void {
    // Business rule: Validate URL before navigation
    if (!isSafeExternalUrl(url)) {
      console.error('Invalid URL provided:', url);
      return;
    }

    this.navigationService.openInNewTab(url);
  }
}
