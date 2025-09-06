import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Use a global variable to store the mongoose connection
// This prevents multiple connections during serverless function calls
declare global {
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongoDB(): Promise<typeof mongoose> {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached!.promise = mongoose.connect(MONGODB_URI!, opts);
    }

    try {
        cached!.conn = await cached!.promise;
        console.log("MongoDB connected successfully");
    } catch (e) {
        cached!.promise = null;
        throw e;
    }

    return cached!.conn;
}

export default connectMongoDB;
