import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

export const getBlog = async (req,res) => {
    try{
        const blogs = await Blog.find({});
        res.status(200).json({success: true, data: blogs});  
    } catch(error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const createBlog = async (req,res) => {
    const blog = req.body;

    if (!blog.title || !blog.prompt || !blog.content || !blog.image){
        return res.status(400).json({ success: false, message: "Provide all fields" })
    }

    const newBlog = new Blog(blog);

    try{
        await newBlog.save();
        res.status(201).json({ success: true, data: newBlog});
    }
    catch(error){
        console.error("Error in creating new product:", error.message);
        res.status(500).json({ success:false, message: "Server error"});
    }
};

export const updatedBlog = async (req,res) =>{
    const { id } = req.params;

    const blog = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid id"});
    }

    try{
        const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true});
        res.status(200).json({success: true, data: updatedBlog});
    } catch(error){
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const deleteBlog = async (req,res) =>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invaled id"});
    }
    
    try {
        Blog.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error){
        console.log("Error in deleting product", error.message);
        res.status(500).json({success: false, message:"Server error"});
    }
};
