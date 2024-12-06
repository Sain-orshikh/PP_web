import express from "express";
import { createProduct, deleteProduct, getProduct, updatedProduct } from "../controller/product.js";

const router = express.Router;

router.get("/", getProduct);
router.post("/", createProduct);
router.put("/:id", updatedProduct);
router.delete("/:id", deleteProduct);
