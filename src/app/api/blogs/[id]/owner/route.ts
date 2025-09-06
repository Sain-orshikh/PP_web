import { NextRequest, NextResponse } from "next/server";
import Blog from "@/models/Blog";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

// GET /api/blogs/[id]/owner - Check if user owns the blog
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectMongoDB();
        
        const user = await getUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const ownerId = user._id;
        const blogId = params.id;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        if (blog.ownerId.toString() !== ownerId.toString()) {
            return NextResponse.json({ success: false, message: "You are not the owner of this blog" }, { status: 200 });
        }

        return NextResponse.json({ success: true, message: "You are the owner of this blog" }, { status: 200 });

    } catch (error) {
        console.log("Error in checking blog owner:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
