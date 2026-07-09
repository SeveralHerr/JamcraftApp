import { SpeakingEngagement } from '../entities/SpeakingEngagement';

export class GetSpeakingEngagements {
  constructor(private speakingEngagementsData: SpeakingEngagement[]) {}

  execute(): SpeakingEngagement[] {
    return this.speakingEngagementsData;
  }

  executeSortedByYear(): SpeakingEngagement[] {
    return [...this.speakingEngagementsData].sort((a, b) => b.year - a.year);
  }
}
