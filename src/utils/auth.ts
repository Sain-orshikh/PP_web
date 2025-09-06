import { NextRequest } from "next/server";
import { verifyToken } from "./generateToken";
import User from "@/models/User";
import connectMongoDB from "@/lib/mongodb";

export const getUserFromRequest = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("jwt")?.value;
        
        if (!token) {
            return null;
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return null;
        }

        await connectMongoDB();
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log("Error in getUserFromRequest middleware", error);
        return null;
    }
};

export const requireAuth = async (request: NextRequest) => {
    const user = await getUserFromRequest(request);
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
};
