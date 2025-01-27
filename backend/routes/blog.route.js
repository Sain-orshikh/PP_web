import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createBlog, updateBlog, deleteBlog, fetchBlogs, checkBlogOwner } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/fetch", protectRoute, fetchBlogs);
router.post("/create", protectRoute, createBlog);
router.post("/update/:id", updateBlog);
router.delete("/delete/:id", protectRoute, deleteBlog);
router.get("/check/:id", protectRoute, checkBlogOwner);

export default router;