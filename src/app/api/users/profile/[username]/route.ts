import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";

// GET /api/users/profile/[username] - Get user profile by username
export async function GET(
    request: NextRequest,
    { params }: { params: { username: string } }
) {
    try {
        await connectMongoDB();
        
        const { username } = params;

        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.log("Error in getUserProfile:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
