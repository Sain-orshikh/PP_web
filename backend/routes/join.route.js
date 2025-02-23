import express from "express";
import Join from "../models/join.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { gmail } = req.body;
        
        if (!gmail) {
            return res.status(400).json({
                success: false,
                message: "Gmail is required"
            });
        }

        const newJoin = new Join({ gmail });
        const savedJoin = await newJoin.save();
        
        res.status(201).json({
            success: true,
            data: savedJoin
        });
    } catch (error) {
        console.error("Error in Join:", error.message);
        // Check for duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "This email is already registered"
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export default router;
