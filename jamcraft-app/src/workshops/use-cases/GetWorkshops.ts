import { Workshop } from '../entities/Workshop';

export class GetWorkshops {
  constructor(private workshopsData: Workshop[]) {}

  execute(): Workshop[] {
    return this.workshopsData;
  }

  executeSortedByYear(): Workshop[] {
    return [...this.workshopsData].sort((a, b) => b.year - a.year);
  }
}
