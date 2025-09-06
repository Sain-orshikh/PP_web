import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

// POST /api/users/follow/[id] - Follow/Unfollow a user
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectMongoDB();
        
        const { id } = await params;
        const currentUser = await getUserFromRequest(request);
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        if (id === currentUser._id.toString()) {
            return NextResponse.json({ error: "You can't follow/unfollow yourself" }, { status: 400 });
        }

        const userToModify = await User.findById(id);
        const userDoc = await User.findById(currentUser._id);

        if (!userToModify || !userDoc) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isFollowing = userDoc.following.includes(id);

        if (isFollowing) {
            // Unfollow
            await User.findByIdAndUpdate(id, { $pull: { followers: currentUser._id } });
            await User.findByIdAndUpdate(currentUser._id, { $pull: { following: id } });

            return NextResponse.json({ message: "User unfollowed successfully" }, { status: 200 });
        } else {
            // Follow
            await User.findByIdAndUpdate(id, { $push: { followers: currentUser._id } });
            await User.findByIdAndUpdate(currentUser._id, { $push: { following: id } });

            return NextResponse.json({ message: "User followed successfully" }, { status: 200 });
        }
    } catch (error) {
        console.log("Error in followUnfollowUser:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
