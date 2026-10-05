import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/helpers/test-utils';
import { MobileNav } from './MobileNav';
import { SECTIONS } from '../../config/sections';
import { EXTERNAL_LINKS } from '../../config/routes';

describe('MobileNav', () => {
  it('should link every section', () => {
    render(<MobileNav onNavigate={vi.fn()} />);

    SECTIONS.forEach((section) => {
      expect(screen.getByRole('link', { name: section.label })).toHaveAttribute('href', `#${section.id}`);
    });
  });

  it('should close the drawer when a section is chosen', () => {
    const onNavigate = vi.fn();
    render(<MobileNav onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('link', { name: SECTIONS[1].label }));

    expect(onNavigate).toHaveBeenCalledOnce();
  });

  it('should invite visitors to the Jamcraft Discord', () => {
    render(<MobileNav onNavigate={vi.fn()} />);

    expect(screen.getByRole('link', { name: /join the jamcraft discord server/i })).toHaveAttribute(
      'href',
      EXTERNAL_LINKS.discord,
    );
  });
});
