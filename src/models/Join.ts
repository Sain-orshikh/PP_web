import mongoose from "mongoose";

export interface IJoin {
    _id: string;
    gmail: string;
    createdAt: Date;
    updatedAt: Date;
}

const joinSchema = new mongoose.Schema({
    gmail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const Join = mongoose.models.Join || mongoose.model("Join", joinSchema);

export default Join;
