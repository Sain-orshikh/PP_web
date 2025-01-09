import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUser = async (req,res) => {
    try{
        const users = await User.find({});
        res.status(200).json({success: true, data: users});  
    } catch(error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const createUser = async (req,res) => {
    const user = req.body;

    if (!user.name || !user.email || !user.password){
        return res.status(400).json({ success: false, message: "Provide all fields" })
    }

    const newUser = new User(user);

    try{
        await newUser.save();
        res.status(201).json({ success: true, data: newUser});
    }
    catch(error){
        console.error("Error in creating new product:", error.message);
        res.status(500).json({ success:false, message: "Server error"});
    }
};
