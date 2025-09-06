import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/utils/auth";

// PUT /api/users - Update user profile
export async function PUT(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const currentUser = await getUserFromRequest(request);
        if (!currentUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { username, email, currentPassword, newPassword, bio, profileImg, coverImg } = await request.json();

        const userId = currentUser._id;

        let user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Check if username or email is already taken by another user
        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists) {
                return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
            }
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return NextResponse.json({ error: "Email is already taken" }, { status: 400 });
            }
        }

        if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) {
            return NextResponse.json({ error: "Please provide both current password and new password" }, { status: 400 });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
            }
            if (newPassword.length < 6) {
                return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (profileImg) {
            // Note: You'll need to implement Cloudinary upload/delete here if needed
            // For now, we'll use the image as provided
        }

        if (coverImg) {
            // Note: You'll need to implement Cloudinary upload/delete here if needed
            // For now, we'll use the image as provided
        }

        user.email = email || user.email;
        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;

        user = await user.save();

        // Remove password from response
        const userResponse = user.toObject();
        delete userResponse.password;

        return NextResponse.json(userResponse, { status: 200 });
    } catch (error) {
        console.log("Error in updateUser:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
