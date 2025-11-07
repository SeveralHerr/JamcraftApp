import { GameJamSubmission } from '../entities/GameJamSubmission';

export class GetGameJamSubmissions {
  constructor(private gameJamSubmissionsData: GameJamSubmission[]) {}

  execute(): GameJamSubmission[] {
    return this.gameJamSubmissionsData;
  }

  executeByYear(year: number): GameJamSubmission[] {
    return this.gameJamSubmissionsData.filter(
      (submission) => submission.jamYear === year
    );
  }

  executeSortedByYear(): GameJamSubmission[] {
    return [...this.gameJamSubmissionsData].sort((a, b) => {
      if (a.jamYear === undefined) return 1;
      if (b.jamYear === undefined) return -1;
      return b.jamYear - a.jamYear;
    });
  }
}
