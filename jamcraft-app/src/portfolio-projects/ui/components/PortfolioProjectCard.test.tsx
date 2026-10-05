import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/helpers/test-utils';
import userEvent from '@testing-library/user-event';
import { PortfolioProjectCard } from './PortfolioProjectCard';
import { PortfolioProject } from '../../entities/PortfolioProject';

describe('PortfolioProjectCard', () => {
  const project: PortfolioProject = {
    id: 'test-project',
    name: 'Test Project',
    description: 'A project for testing.',
    screenshotUrl: '/assets/test-screenshot.jpg',
    projectUrl: 'https://example.com/project',
    platform: 'github',
  };

  let openSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    openSpy.mockRestore();
  });

  it('should show a platform icon tile instead of an image when there is no screenshot', () => {
    render(<PortfolioProjectCard project={{ ...project, screenshotUrl: null }} />);

    expect(screen.queryByRole('img', { name: 'Test Project' })).not.toBeInTheDocument();
    expect(screen.getByTestId('platform-icon-tile')).toBeInTheDocument();
  });

  it('should render name, description, and platform badge', () => {
    render(<PortfolioProjectCard project={project} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A project for testing.')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('should be a keyboard-focusable secure link to the project', () => {
    render(<PortfolioProjectCard project={project} />);

    const link = screen.getByRole('link', { name: 'Test Project' });
    expect(link).toHaveAttribute('href', 'https://example.com/project');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('should hide the link behind a reveal button for NSFW projects', () => {
    render(<PortfolioProjectCard project={{ ...project, isNSFW: true }} />);

    expect(screen.getByRole('button', { name: /nsfw — reveal/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Test Project' })).not.toBeInTheDocument();
  });

  it('should become a link after revealing NSFW content', async () => {
    const user = userEvent.setup();
    render(<PortfolioProjectCard project={{ ...project, isNSFW: true }} />);

    await user.click(screen.getByRole('button', { name: /nsfw — reveal/i }));

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Test Project' })).toHaveAttribute(
        'href',
        'https://example.com/project',
      );
    });
  });
});
