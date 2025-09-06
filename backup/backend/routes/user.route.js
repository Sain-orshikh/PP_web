import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile, updateUser, followUnfollowUser, getSuggestedUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",protectRoute,getUserProfile);
router.get("/suggested",protectRoute,getSuggestedUsers);
router.post("/update",protectRoute,updateUser);
router.post("/follow/:id",protectRoute,followUnfollowUser);

export default router;