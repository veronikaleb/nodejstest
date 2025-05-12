import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  try {
    const fighters = fighterService.getAll();
    res.sendResponse(fighters);
  } catch (err) {
    res.sendError("Error fetching fighters", 500);
  }
});

router.get("/:id", (req, res) => {
  try {
    const fighter = fighterService.getById(req.params.id);
    if (!fighter) return res.sendError("Fighter not found", 404);
    res.sendResponse(fighter);
  } catch (err) {
    res.sendError("Error fetching fighter", 500);
  }
});

router.post("/", createFighterValid, (req, res) => {
  try {
    const newFighter = fighterService.create(req.body);
    res.sendResponse(newFighter);
  } catch (err) {
    res.sendError(err.message, 400);
  }
});

router.patch("/:id", updateFighterValid, (req, res) => {
  try {
    const updatedFighter = fighterService.update(req.params.id, req.body);
    res.sendResponse(updatedFighter);
  } catch (err) {
    res.sendError(err.message, 400);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const deletedFighter = fighterService.delete(req.params.id);
    if (!deletedFighter) return res.sendError("Fighter not found", 404);
    res.sendResponse(deletedFighter);
  } catch (err) {
    res.sendError("Error deleting fighter", 500);
  }
});

export { router };

