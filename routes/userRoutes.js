import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    res.sendResponse(users);
  } catch (err) {
    res.sendError(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.sendError("User not found", 404);
    res.sendResponse(user);
  } catch (err) {
    res.sendError(err.message);
  }
});

// Create a new user
router.post("/", createUserValid, async (req, res) => {
  try {
    const newUser = await userService.create(req.body);
    res.sendResponse(newUser);
  } catch (err) {
    res.sendError(err.message);
  }
});

router.patch("/:id", updateUserValid, async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);
    if (!updatedUser) return res.sendError("User not found", 404);
    res.sendResponse(updatedUser);
  } catch (err) {
    res.sendError(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await userService.delete(req.params.id);
    if (!removedUser) return res.sendError("User not found", 404);
    res.sendResponse(removedUser);
  } catch (err) {
    res.sendError(err.message);
  }
});

export { router };
