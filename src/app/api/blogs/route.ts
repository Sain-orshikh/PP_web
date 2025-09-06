import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

// GET /api/blogs - Fetch all blogs
export async function GET() {
    try {
        await connectMongoDB();
        
        const blogs = await Blog.find().sort({ createdAt: -1 }).populate({
            path: "ownerId",
            select: "username",
        });

        return NextResponse.json({ data: blogs }, { status: 200 });
    } catch (error) {
        console.log("Error in fetching blogs:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

// POST /api/blogs - Create a new blog
export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, image } = await request.json();
        let imageurl = "";
        const ownerId = user._id.toString();

        const userDoc = await User.findById(ownerId);
        if (!userDoc) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        if (!title || !content || !image) {
            return NextResponse.json({ success: false, error: "Please provide all fields" }, { status: 400 });
        }

        if (image) {
            imageurl = image;
            // Note: You'll need to implement Cloudinary upload here if needed
            // For now, we'll use the image as provided
        }

        const newBlog = new Blog({
            title,
            content,
            image,
            imageurl,
            ownerId,
        });

        await newBlog.save();
        
        userDoc.blogs.push(newBlog._id);
        await userDoc.save();

        return NextResponse.json({ success: true, data: newBlog }, { status: 201 });

    } catch (error) {
        console.log("Error in creating blog:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
