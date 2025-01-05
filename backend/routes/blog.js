import express from "express";
import { createBlog, deleteBlog, getBlog, updatedBlog } from "../controller/blog.controller.js";

const router = express.Router();

router.get("/", getBlog);
router.post("/", createBlog);
router.put("/:id", updatedBlog);
router.delete("/:id", deleteBlog);

export default router;