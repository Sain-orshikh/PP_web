import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { generateToken } from "@/utils/generateToken";

export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const { username, email, password, profileImg } = await request.json();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ error: "Email is already taken" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImg: profileImg || ""
        });

        if (newUser) {
            await newUser.save();
            
            const token = generateToken(newUser._id.toString());
            
            const response = NextResponse.json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            }, { status: 201 });

            response.cookies.set("jwt", token, {
                maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development",
                path: "/"
            });

            return response;
        } else {
            return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
        }

    } catch (error) {
        console.log("Error in signup controller", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
