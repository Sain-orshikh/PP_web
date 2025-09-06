import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

// GET /api/blogs/[id] - Fetch a specific blog
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        
        const blog = await Blog.findById(params.id).populate({
            path: "ownerId",
            select: "username",
        });
        
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.log("Error in fetching blog:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

// PUT /api/blogs/[id] - Update a blog
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, content, image } = await request.json();
        const blogId = params.id;

        let blog = await Blog.findById(blogId);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }

        // Check if user owns the blog
        if (blog.ownerId.toString() !== user._id.toString()) {
            return NextResponse.json({ error: "Unauthorized: You don't own this blog" }, { status: 403 });
        }

        if (!title || !content || !image) {
            return NextResponse.json({ error: "Please provide all fields" }, { status: 400 });
        }

        let processedImage = image;
        if (image) {
            // Note: You'll need to implement Cloudinary upload/delete here if needed
            // For now, we'll use the image as provided
            processedImage = image;
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.image = processedImage || blog.image;

        blog = await blog.save();

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.log("Error in updateBlog:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

// DELETE /api/blogs/[id] - Delete a blog
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const blogId = params.id;
        const ownerId = user._id.toString();

        const userDoc = await User.findById(ownerId);
        if (!userDoc) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        // Check if user owns the blog
        if (blog.ownerId.toString() !== ownerId) {
            return NextResponse.json({ error: "Unauthorized: You don't own this blog" }, { status: 403 });
        }

        // Remove blog from user's blogs array
        userDoc.blogs = userDoc.blogs.filter((id) => id.toString() !== blogId);
        await userDoc.save();

        await Blog.findByIdAndDelete(blogId);

        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log("Error in deleting blog:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
