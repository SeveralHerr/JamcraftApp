import { describe, it, expect } from 'vitest';
import { render, screen } from '../test/helpers/test-utils';
import { CommissionsSection } from './CommissionsSection';

describe('CommissionsSection', () => {
  it('renders the #commissions section with its h2 and the Atomic Robot showcase', () => {
    const { container } = render(<CommissionsSection />);

    expect(container.querySelector('section#commissions')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 2, name: 'Commissions' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /Atomic Robot/ })).toBeInTheDocument();
  });
});
