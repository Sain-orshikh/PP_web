import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

// GET /api/users/suggested - Get suggested users to follow
export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const currentUser = await getUserFromRequest(request);
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = currentUser._id;

        const usersFollowedByMe = await User.findById(userId).select("following");
        if (!usersFollowedByMe) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            { $sample: { size: 10 } }
        ]);

        const filteredUsers = users.filter(user => 
            !usersFollowedByMe.following.includes(user._id)
        );
        const suggestedUsers = filteredUsers.slice(0, 2);

        // Remove passwords from response
        suggestedUsers.forEach(user => {
            delete user.password;
        });

        return NextResponse.json(suggestedUsers, { status: 200 });
    } catch (error) {
        console.log("Error in getSuggestedUsers:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
