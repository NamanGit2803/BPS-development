import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })

        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email == user.email && req.body.password == decryptedPass) {

                if (user.userType == 'admin') {
                    // token generate for admin
                    let token = jwt.sign({ email: user.email, name: user.name, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "2d" });

                    res.status(200).json({ success: true, token, userType: user.userType })
                } else {
                    // token generate 
                    let token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "2d" });

                    res.status(200).json({ success: true, token, name: user.name })
                }
            }
            else {
                res.status(200).json({ success: false, error: "Invalid credentials" })
            }
        }
        else {
            res.status(200).json({ success: false, error: "User not found" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);