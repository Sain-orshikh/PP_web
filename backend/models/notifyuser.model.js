import mongoose from "mongoose";

const notifyUserSchema = new mongoose.Schema({
    email:{
        type: String,
    }
});

const NotifyUser = mongoose.model("NotifyUser", notifyUserSchema);

export default NotifyUser;