import { v4 as uuid } from 'uuid';
import { fightRepository } from "../repositories/fightRepository.js";
import { FighterRepository } from "../repositories/fighterRepository.js";

const fighterRepo = new FighterRepository();
const fightRepo = fightRepository;

class FightersService {
  getAllFights() {
    return fightRepo.getAll();
  }
  getFightById(id) {
    return fightRepo.getById(id);
  }

  // Create a new fight
  createFight(fighter1Id, fighter2Id) {
    const fighter1 = fighterRepo.getById(fighter1Id);
    const fighter2 = fighterRepo.getById(fighter2Id);

    if (!fighter1 || !fighter2) {
      throw new Error("One or both fighters not found");
    }

    const fighter1Health = fighter1.health;
    const fighter2Health = fighter2.health;

    const fighter1Power = fighter1.power;
    const fighter2Power = fighter2.power;

    let winner = null;
    let loser = null;

    if (fighter1Power > fighter2Power) {
      winner = fighter1;
      loser = fighter2;
    } else {
      winner = fighter2;
      loser = fighter1;
    }

    const fightResult = {
      id: uuid(),
      fighter1: fighter1.name,
      fighter2: fighter2.name,
      winner: winner.name,
      loser: loser.name,
      result: `${winner.name} won!`,
      date: new Date(),
    };

    // Save fight history
    return fightRepo.create(fightResult);
  }

  // Delete a fight record
  deleteFight(id) {
    const fight = fightRepo.delete(id);
    if (!fight) {
      throw new Error("Fight not found");
    }
    return fight;
  }
}

const fightersService = new FightersService();

export { fightersService };
