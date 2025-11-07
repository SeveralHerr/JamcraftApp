import { describe, it, expect } from 'vitest';
import { GetGameJamSubmissions } from './GetGameJamSubmissions';
import { GameJamSubmission } from '../entities/GameJamSubmission';

describe('GetGameJamSubmissions', () => {
  const mockSubmissions: GameJamSubmission[] = [
    {
      id: 'game-1',
      name: 'Test Game 1',
      description: 'First game',
      coverImageUrl: 'https://example.com/game1.png',
      gameUrl: 'https://example.com/game1',
      jamName: 'Game Jam 2022',
      jamYear: 2022,
    },
    {
      id: 'game-2',
      name: 'Test Game 2',
      description: 'Second game',
      coverImageUrl: 'https://example.com/game2.png',
      gameUrl: 'https://example.com/game2',
      jamName: 'Game Jam 2021',
      jamYear: 2021,
    },
    {
      id: 'game-3',
      name: 'Test Game 3',
      description: 'Third game',
      coverImageUrl: 'https://example.com/game3.png',
      gameUrl: 'https://example.com/game3',
      jamName: 'Another Jam',
    },
  ];

  it('should return all game jam submissions', () => {
    const useCase = new GetGameJamSubmissions(mockSubmissions);
    const result = useCase.execute();

    expect(result).toEqual(mockSubmissions);
    expect(result).toHaveLength(3);
  });

  it('should filter submissions by year', () => {
    const useCase = new GetGameJamSubmissions(mockSubmissions);
    const result = useCase.executeByYear(2022);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Game 1');
    expect(result[0].jamYear).toBe(2022);
  });

  it('should return empty array when no submissions match the year', () => {
    const useCase = new GetGameJamSubmissions(mockSubmissions);
    const result = useCase.executeByYear(2020);

    expect(result).toHaveLength(0);
  });

  it('should sort submissions by year in descending order', () => {
    const useCase = new GetGameJamSubmissions(mockSubmissions);
    const result = useCase.executeSortedByYear();

    expect(result).toHaveLength(3);
    expect(result[0].jamYear).toBe(2022);
    expect(result[1].jamYear).toBe(2021);
    expect(result[2].jamYear).toBeUndefined();
  });

  it('should handle empty submissions array', () => {
    const useCase = new GetGameJamSubmissions([]);
    const result = useCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
