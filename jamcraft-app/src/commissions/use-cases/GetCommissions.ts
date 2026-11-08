import { Commission } from '../entities/Commission';

export class GetCommissions {
  constructor(private commissionsData: Commission[]) {}

  executeSortedByYear(): Commission[] {
    return [...this.commissionsData].sort((a, b) => b.year - a.year);
  }
}
