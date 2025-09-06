import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const generateTokenAndSetCookie = (userId: string): NextResponse => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '15d'
    });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
        httpOnly: true, // prevents attack from script
        sameSite: "strict", // CSRF attack prevention
        secure: process.env.NODE_ENV !== "development",
        path: "/"
    });

    return response;
};

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '15d'
    });
};

export const verifyToken = (token: string): { userId: string } | null => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        return decoded;
    } catch (error) {
        return null;
    }
};
