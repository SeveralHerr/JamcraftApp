import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '../../test/helpers/test-utils';
import { Section } from './Section';

describe('Section', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('should render an anchor-targetable section with its title and content', () => {
    const { container } = render(
      <Section id="projects" title="Projects">
        <p>Body</p>
      </Section>,
    );

    expect(container.querySelector('section#projects')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('should hold its entrance animation until scrolled into view', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn(function () {
        return { observe: vi.fn(), disconnect: vi.fn() };
      }),
    );
    const { container } = render(<Section id="podcasts">x</Section>);

    expect(container.querySelector('section#podcasts')).toHaveAttribute('data-revealed', 'false');
  });
});
