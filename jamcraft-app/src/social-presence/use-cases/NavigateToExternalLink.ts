import { NavigationService } from '../services/BrowserNavigationService';

export class NavigateToExternalLink {
  constructor(private navigationService: NavigationService) {}

  execute(url: string): void {
    // Business rule: Validate URL before navigation
    if (!this.isValidUrl(url)) {
      console.error('Invalid URL provided:', url);
      return;
    }

    this.navigationService.openInNewTab(url);
  }

  private isValidUrl(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      // Security: Only allow http and https protocols
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false;
    }
  }
}
