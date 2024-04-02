import User from "@/models/User"
import connectDb from "@/middleware/mongoose"
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const { name, email } = req.body
        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            res.status(200).json({ error: "Email has been already taken" })
        }

        if (req.body.secKey) {
            let v = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString(), userType: 'admin' })

            await v.save()

            let token = jwt.sign({ email: email, name: name, userType: 'admin' }, process.env.JWT_SECRET, { expiresIn: "2d" });

            res.status(200).json({ success: "success", token, userType: 'admin'})
        }
        else {
            let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() })
            let token = jwt.sign({ email: email, name: name }, process.env.JWT_SECRET, { expiresIn: "2d" });
            await u.save()

            res.status(200).json({ success: "success", token, name })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default connectDb(handler);