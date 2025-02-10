import express from 'express';
import { addEmail } from '../controllers/notifyuser.controller.js';

const router = express.Router();

router.post("/add", addEmail);

export default router;