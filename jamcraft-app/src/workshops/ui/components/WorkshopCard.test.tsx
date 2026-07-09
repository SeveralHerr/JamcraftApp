import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { WorkshopCard } from './WorkshopCard';
import { Workshop } from '../../entities/Workshop';

describe('WorkshopCard', () => {
  const workshop: Workshop = {
    id: 'test-workshop',
    title: 'A Great Workshop',
    description: 'A workshop about testing.',
    eventUrl: 'https://example.com/workshop',
    date: 'June 2026',
    year: 2026,
    collaborators: ['A Collaborator'],
    format: 'Free online workshop',
  };

  it('should render title, format, and date', () => {
    render(<WorkshopCard workshop={workshop} />);

    expect(screen.getByText('A Great Workshop')).toBeInTheDocument();
    expect(screen.getByText('Free online workshop · June 2026')).toBeInTheDocument();
  });

  it('should render only the date when no format is set', () => {
    render(<WorkshopCard workshop={{ ...workshop, format: undefined }} />);

    expect(screen.getByText('June 2026')).toBeInTheDocument();
  });

  it('should link the whole card to the event URL', () => {
    render(<WorkshopCard workshop={workshop} />);

    const link = screen.getByRole('link', { name: 'A Great Workshop' });
    expect(link).toHaveAttribute('href', 'https://example.com/workshop');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should use noopener and noreferrer on the external link', () => {
    render(<WorkshopCard workshop={workshop} />);

    const link = screen.getByRole('link', { name: 'A Great Workshop' });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });
});
