export interface NavigationService {
  openInNewTab(url: string): void;
}

export class BrowserNavigationService implements NavigationService {
  openInNewTab(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
