import type { Game } from '../entities/Game';

export class GetGames {
  constructor(private readonly games: Game[]) {}

  execute(): Game[] {
    return this.games;
  }
}
