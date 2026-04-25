import type { Talk, TalkKind } from '../entities/Talk';

export type TalkFilter = 'all' | TalkKind;

export class GetTalks {
  constructor(private readonly talks: Talk[]) {}

  execute(filter: TalkFilter = 'all'): Talk[] {
    if (filter === 'all') return this.talks;
    return this.talks.filter(t => t.kind === filter);
  }

  countByKind(): { all: number; Podcast: number; Talk: number } {
    return {
      all: this.talks.length,
      Podcast: this.talks.filter(t => t.kind === 'Podcast').length,
      Talk: this.talks.filter(t => t.kind === 'Talk').length,
    };
  }
}
