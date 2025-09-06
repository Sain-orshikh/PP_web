import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
        
        response.cookies.set("jwt", "", {
            maxAge: 0,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            path: "/"
        });

        return response;
        
    } catch (error) {
        console.log("Error in logout controller", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
