import mongoose from "mongoose";

const joinSchema = new mongoose.Schema({
    gmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const Join = mongoose.model("Join", joinSchema);

export default Join;