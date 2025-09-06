import { NextRequest, NextResponse } from "next/server";
import Join from "@/models/Join";
import connectMongoDB from "@/lib/mongodb";

// POST /api/join - Join mailing list
export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();
        
        const { gmail } = await request.json();
        
        if (!gmail) {
            return NextResponse.json({
                success: false,
                message: "Gmail is required"
            }, { status: 400 });
        }

        const newJoin = new Join({ gmail });
        const savedJoin = await newJoin.save();
        
        return NextResponse.json({
            success: true,
            data: savedJoin
        }, { status: 201 });
        
    } catch (error: unknown) {
        console.error("Error in Join:", error instanceof Error ? error.message : String(error));
        
        // Check for duplicate key error (MongoDB error code 11000)
        if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
            return NextResponse.json({
                success: false,
                message: "This email is already registered"
            }, { status: 400 });
        }
        
        return NextResponse.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}
