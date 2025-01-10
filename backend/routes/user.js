import express from "express";
import { createUser, getUser, updatedUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", createUser);
router.put("/:id", updatedUser);

export default router;