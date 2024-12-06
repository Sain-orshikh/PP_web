import Product from "./models/product.js";
import mongoose from "mongoose";

export const getProduct = async (req,res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});  
    } catch(error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const createProduct = async (req,res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image){
        return res.status(400).json({ success: false, message: "Provide all fields" })
    }

    const newProduct = new Product(product);

    try{
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    }
    catch(error){
        console.error("Error in creating new product:", error.message);
        res.status(500).json({ success:false, message: "Server error"});
    }
};

export const updatedProduct = async (req,res) =>{
    const { id } = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invaled id"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch(error){
        res.status(500).json({success: false, message: "Server error"});
    }
};

export const deleteProduct = async (req,res) =>{
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invaled id"});
    }
    
    try {
        Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted"});
    } catch (error){
        console.log("Error in deleting product", error.message);
        res.status(500).json({success: false, message:"Server error"});
    }
};
