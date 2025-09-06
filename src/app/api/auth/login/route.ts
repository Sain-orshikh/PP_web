import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { generateToken } from "@/utils/generateToken";

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const { username, password } = await request.json();
        
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return NextResponse.json({ error: "Invalid user credentials" }, { status: 400 });
        }

        const token = generateToken(user._id.toString());
        
        const response = NextResponse.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        }, { status: 200 });

        response.cookies.set("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            path: "/"
        });

        return response;
        
    } catch (error) {
        console.log("Error in login controller", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
