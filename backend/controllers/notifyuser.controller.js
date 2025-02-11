import NotifyUser from "../models/notifyuser.model.js";

export const addEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, error: "Invalid email format" });
        }
        const existingEmail = await NotifyUser.findOne({ email });
		if ( existingEmail ) {
			return res.status(400).json({success: false, error: "Email is already taken" });
		}
        const newEmail = new NotifyUser({ email });
        await newEmail.save();
        res.status(201).json({success:true, message: "Email added successfully" });
    } catch (error) {
        res.status(500).json({success:false, message: error.message });
    }
};