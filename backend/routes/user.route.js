import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",protectRoute,getUserProfile);
router.post("/update",protectRoute,updateUser);

export default router;