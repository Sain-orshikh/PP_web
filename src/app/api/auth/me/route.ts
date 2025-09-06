import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

export async function GET(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const user = await getUserFromRequest(request);
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userWithoutPassword = await User.findById(user._id).select("-password");
        return NextResponse.json(userWithoutPassword, { status: 200 });
        
    } catch (error) {
        console.log("Error in getMe controller", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
