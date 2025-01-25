import {v2 as cloudinary} from "cloudinary";

import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";

export const fetchBlogs = async (req, res) => {
	try {
		const blogs = await Blog.find().sort({createdAt: -1}).populate({
			path: "ownerId",
			select: "username",
		});

		if(blogs.length === 0){
			res.status(200).json([]);
		}
		res.status(200).json({ success: true, data: blogs });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createBlog = async (req, res) => {
	try {
		let {image} = req.body;
		const {title, content} = req.body;

		const ownerId = req.user._id.toString();

		const user = await User.findById(ownerId);
		if(!user) return res.status(404).json({message: "User not found"});

		if(!title || !content || !image) return res.status(400).json({error: "Please provide all fields"});
		if(image){
			const uploadedResponse = await cloudinary.uploader.upload(image);
			image = uploadedResponse.secure_url;
		};
		const newBlog = new Blog({
			title,
			content,
			image,
			ownerId,
		});

		await newBlog.save();
		res.status(201).json({success: true, data: newBlog});

		user.blogs.push(newBlog._id);
		await user.save();
	} catch (error) {
		console.log("error in creating blog:", error.message);
		res.status(500).json({success: false, message: "Server Error"});
	}
};

export const updateBlog = async (req, res) => {
	let image = req.body.image;
	const { title, content } = req.body;

	const blogId = req.params.id;

	try {
		let blog = await Blog.findById(blogId);
		if (!blog) return res.status(404).json({ message: "Blog not found" });

		if(!title || !content || !image) return res.status(400).json({error: "Please provide all fields"});

		if (image) {
			if (blog.image) {
				// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
				await cloudinary.uploader.destroy(blog.image.split("/").pop().split(".")[0]);
			}

			const uploadedResponse = await cloudinary.uploader.upload(image);
			image = uploadedResponse.secure_url;
		}

		blog.title = title || blog.title;
		blog.content = content || blog.content;
		blog.image = image || blog.image;
		blog.ownerId = blog.ownerId;

		blog = await blog.save();

		return res.status(200).json(blog);
	} catch (error) {
		console.log("Error in updateBlog: ", error.message);
		res.status(500).json({ error: error.message });
	}
};

export const deleteBlog = async (req, res) => {
	try {
		const blogId = req.params.id;
		
		const ownerId = req.user._id.toString();
		const user = await User.findById(ownerId);
		if(!user) return res.status(404).json({message: "User not found"});

		user.blogs = user.blogs.filter((id) => id.toString() !== blogId);
		await user.save();

		let blog = await Blog.findById(blogId);
		if(!blog) return res.status(404).json({message: "Blog not found"});

		await Blog.findByIdAndDelete(blogId);

		res.status(200).json({message: "Blog deleted successfully"});
	} catch (error) {
		console.log("error in deleting blog:", error.message);
		res.status(500).json({message: "Server Error"});
	}
};

export const checkBlogOwner = async (req,res) => {
	const ownerId = req.body;
	const blogId = req.params.id;
	try {
		const blog = await Blog.findById(blogId);
		if(!blog) return res.status(404).json({message: "Blog not found"});

		if(!blog.ownerId.toString() === ownerId.toString()) return res.status(200).json({message: "You are not the owner of this blog"});
		
		res.status(201).json({message: "You are the owner of this blog"});
	} catch (error) {
		console.log("error in checking blog owner:", error.message);
		res.status(500).json({message: "Server Error"});
	}
};