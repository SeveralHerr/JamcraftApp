import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../test/helpers/test-utils';
import { SpeakingEngagementCard } from './SpeakingEngagementCard';
import { SpeakingEngagement } from '../../entities/SpeakingEngagement';

describe('SpeakingEngagementCard', () => {
  const engagement: SpeakingEngagement = {
    id: 'test-engagement',
    title: 'A Great Talk',
    description: 'A talk about testing.',
    eventName: 'Test Conf',
    location: 'Testville, USA',
    eventUrl: 'https://example.com/engagement',
    date: 'September 2026',
    year: 2026,
    format: 'Hands-On Session',
    collaborators: ['A Collaborator'],
  };

  it('should render title, event name, location, and date', () => {
    render(<SpeakingEngagementCard engagement={engagement} />);

    expect(screen.getByText('A Great Talk')).toBeInTheDocument();
    expect(screen.getByText('Test Conf · Testville, USA · September 2026')).toBeInTheDocument();
  });

  it('should link the whole card to the event URL', () => {
    render(<SpeakingEngagementCard engagement={engagement} />);

    const link = screen.getByRole('link', { name: 'A Great Talk' });
    expect(link).toHaveAttribute('href', 'https://example.com/engagement');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should use noopener and noreferrer on the external link', () => {
    render(<SpeakingEngagementCard engagement={engagement} />);

    const link = screen.getByRole('link', { name: 'A Great Talk' });
    expect(link.getAttribute('rel')).toContain('noopener');
    expect(link.getAttribute('rel')).toContain('noreferrer');
  });
});
