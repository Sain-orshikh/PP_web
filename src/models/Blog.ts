import mongoose from "mongoose";

export interface IBlog {
    _id: string;
    title: string;
    content: string;
    image: string;
    imageurl?: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "",
    },
    content: {
        type: String,
        required: true,
        default: "",
    },
    image: {
        type: String,
        required: true,
        default: "",
    },
    imageurl: {
        type: String,
        default: "",
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
