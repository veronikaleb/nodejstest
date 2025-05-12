import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const fightResult = await fightersService.startFight(req.body);
    res.sendResponse(fightResult);
  } catch (err) {
    res.sendError(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const fightHistory = await fightersService.getFightHistory();
    res.sendResponse(fightHistory);
  } catch (err) {
    res.sendError(err.message);
  }
});

export { router };

