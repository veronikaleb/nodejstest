import { v4 as uuid } from 'uuid';
import { FIGHTER } from "../models/fighter.js";
import { FighterRepository } from "../repositories/fighterRepository.js";

const fighterRepo = new FighterRepository();

export const fighterService = {
  getAll: () => fighterRepo.getAll(),
  getById: (id) => fighterRepo.getById(id),
  
  create: (fighterData) => {
    if (fighterRepo.findByName(fighterData.name)) {
      throw new Error("Fighter with this name already exists");
    }
    const newFighter = { ...fighterData, id: uuid(), health: fighterData.health || 85 };
    return fighterRepo.create(newFighter);
  },

  update: (id, updatedData) => {
    const fighter = fighterRepo.getById(id);
    if (!fighter) throw new Error("Fighter not found");
    return fighterRepo.update(id, updatedData);
  },

  delete: (id) => {
    const fighter = fighterRepo.delete(id);
    if (!fighter) throw new Error("Fighter not found");
    return fighter;
  }
};
