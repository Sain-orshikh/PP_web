import NotifyUser from "../models/notifyuser.model.js";

export const addEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const newEmail = new NotifyUser({ email });
        await newEmail.save();
        res.status(201).json({ message: "Email added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};