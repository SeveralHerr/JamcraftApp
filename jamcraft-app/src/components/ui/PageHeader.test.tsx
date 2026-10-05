import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/helpers/test-utils';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('should render the section title as an h2 (the page h1 is the hero name)', () => {
    render(<PageHeader title="Projects" />);

    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
  });

  it('should render the subtitle when given', () => {
    render(<PageHeader title="Projects" subtitle="Things I built" />);

    expect(screen.getByText('Things I built')).toBeInTheDocument();
  });

  it('should render a decorative accent bar under the title', () => {
    render(<PageHeader title="Projects" />);

    expect(screen.getByTestId('page-header-accent')).toHaveAttribute('aria-hidden', 'true');
  });
});
