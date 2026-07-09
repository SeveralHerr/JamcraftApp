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

  it('should render name, description, and platform badge', () => {
    render(<PortfolioProjectCard project={project} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A project for testing.')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('should open the project URL when clicked', async () => {
    const user = userEvent.setup();
    render(<PortfolioProjectCard project={project} />);

    await user.click(screen.getByText('Test Project'));

    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/project',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('should show a reveal button and block navigation for NSFW projects', async () => {
    const user = userEvent.setup();
    render(<PortfolioProjectCard project={{ ...project, isNSFW: true }} />);

    expect(screen.getByRole('button', { name: /nsfw — reveal/i })).toBeInTheDocument();

    await user.click(screen.getByText('Test Project'));
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('should allow navigation after revealing NSFW content', async () => {
    const user = userEvent.setup();
    render(<PortfolioProjectCard project={{ ...project, isNSFW: true }} />);

    await user.click(screen.getByRole('button', { name: /nsfw — reveal/i }));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /nsfw — reveal/i })).not.toBeInTheDocument();
    });

    await user.click(screen.getByText('Test Project'));
    expect(openSpy).toHaveBeenCalledWith(
      'https://example.com/project',
      '_blank',
      'noopener,noreferrer'
    );
  });
});
