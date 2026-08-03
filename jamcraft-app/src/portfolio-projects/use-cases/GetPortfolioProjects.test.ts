import { describe, it, expect } from 'vitest';
import { GetPortfolioProjects } from './GetPortfolioProjects';

describe('GetPortfolioProjects', () => {
  it('should return projects with required properties', () => {
    const useCase = new GetPortfolioProjects();
    const [firstProject] = useCase.execute();

    expect(firstProject).toHaveProperty('id');
    expect(firstProject).toHaveProperty('name');
    expect(firstProject).toHaveProperty('description');
    expect(firstProject).toHaveProperty('screenshotUrl');
    expect(firstProject).toHaveProperty('projectUrl');
    expect(firstProject).toHaveProperty('platform');
  });

  it('should return unique project ids', () => {
    const useCase = new GetPortfolioProjects();
    const ids = useCase.execute().map(project => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should only use safe http(s) project urls', () => {
    const useCase = new GetPortfolioProjects();
    const result = useCase.execute();

    result.forEach(project => {
      expect(new URL(project.projectUrl).protocol).toMatch(/^https?:$/);
    });
  });

  it('should only reference local or https screenshots', () => {
    const useCase = new GetPortfolioProjects();
    const result = useCase.execute();

    result.forEach(project => {
      if (project.screenshotUrl !== null) {
        expect(project.screenshotUrl).toMatch(/^(\/assets\/|https:\/\/)/);
      }
    });
  });

  it('should include the Gather itch.io game', () => {
    const useCase = new GetPortfolioProjects();
    const gather = useCase.execute().find(project => project.id === 'gather');

    expect(gather).toBeDefined();
    expect(gather?.platform).toBe('itch');
    expect(gather?.projectUrl).toBe('https://severalherr.itch.io/gather');
  });

  it('should include the Godot self-test harness repository', () => {
    const useCase = new GetPortfolioProjects();
    const harness = useCase.execute().find(project => project.id === 'godot-selftest-harness');

    expect(harness).toBeDefined();
    expect(harness?.platform).toBe('github');
    expect(harness?.projectUrl).toBe('https://github.com/SeveralHerr/godot-selftest-harness');
  });

  it('should return consistent data on multiple calls', () => {
    const useCase = new GetPortfolioProjects();

    expect(useCase.execute()).toEqual(useCase.execute());
  });
});
