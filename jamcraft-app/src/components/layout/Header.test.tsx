import { describe, it, expect, vi } from 'vitest';
import { AppShell } from '@mantine/core';
import { render, screen } from '../../test/helpers/test-utils';
import { Header, MAIN_CONTENT_ID, MOBILE_NAV_ID } from './Header';
import { SECTIONS } from '../../config/sections';

// Header renders an AppShell.Header, which needs an AppShell ancestor
function renderHeader(props: React.ComponentProps<typeof Header>) {
  return render(
    <AppShell header={{ height: 60 }}>
      <Header {...props} />
    </AppShell>
  );
}

describe('Header', () => {
  it('should render a nav anchor for every section', () => {
    renderHeader({ navOpened: false, onToggleNav: vi.fn() });

    SECTIONS.forEach((section) => {
      const link = screen.getByRole('link', { name: section.label });
      expect(link).toHaveAttribute('href', `#${section.id}`);
    });
  });

  it('should start with a skip link to the main content for keyboard users', () => {
    renderHeader({ navOpened: false, onToggleNav: vi.fn() });

    const [firstLink] = screen.getAllByRole('link');
    expect(firstLink).toHaveTextContent('Skip to content');
    expect(firstLink).toHaveAttribute('href', `#${MAIN_CONTENT_ID}`);
  });

  it('should render the logo linking back to the top', () => {
    renderHeader({ navOpened: false, onToggleNav: vi.fn() });

    const logoLink = screen.getByRole('link', { name: /back to top/i });
    expect(logoLink).toHaveAttribute('href', '#home');
  });

  it('should render an accessible burger toggle', () => {
    const onToggleNav = vi.fn();
    renderHeader({ navOpened: false, onToggleNav });

    const burger = screen.getByLabelText(/toggle navigation/i);
    burger.click();
    expect(onToggleNav).toHaveBeenCalled();
  });

  it.each([true, false])('should expose the drawer state (opened=%s) via aria-expanded', (navOpened) => {
    renderHeader({ navOpened, onToggleNav: vi.fn() });

    // hiddenFrom="sm" hides it from role queries in happy-dom, so query by label.
    const burger = screen.getByLabelText(/toggle navigation/i);
    expect(burger).toHaveAttribute('aria-expanded', String(navOpened));
    expect(burger).toHaveAttribute('aria-controls', MOBILE_NAV_ID);
  });
});
