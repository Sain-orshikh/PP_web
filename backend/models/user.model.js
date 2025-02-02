import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: 6,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    profileImg:{
        type: String,
        default: "",
    },
    coverImg:{
        type: String,
        default: "",
    },
    bio:{
        type: String,
        default: "Hi!",
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            default: []
        }
    ],
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            default:[]
        }
    ],
    likedBlogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            default:[]
        }
    ],
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;