import { GameJamSubmission } from '../entities/GameJamSubmission';

/** Badge text for a jam: its name plus the year, unless the name already says it. */
export function formatJamLabel({ jamName, jamYear }: Pick<GameJamSubmission, 'jamName' | 'jamYear'>): string {
  if (jamYear === undefined || jamName.includes(String(jamYear))) {
    return jamName;
  }
  return `${jamName} · ${jamYear}`;
}
