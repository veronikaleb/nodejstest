import { BaseRepository } from './baseRepository.js';

class FighterRepository extends BaseRepository {
  constructor() {
    super('fighters');
  }

  findByName(name) {
    return this.getAll().find(fighter => fighter.name.toLowerCase() === name.toLowerCase());
  }
}

const fighterRepository = new FighterRepository();

export { fighterRepository };
