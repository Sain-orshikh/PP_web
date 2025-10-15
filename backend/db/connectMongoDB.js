import mongoose from "mongoose";

// Cache the database connection for serverless
let cachedConnection = null;

const connectMongoDB = async () => {
    // If already connected, reuse the connection
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log("Using cached MongoDB connection");
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Optimize for serverless
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        cachedConnection = conn;
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch(error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error; // Don't exit in serverless, just throw
    }
};

export default connectMongoDB;