import connectDb from "@/middleware/mongoose"
import User from "@/models/User"
import jsonwebtoken from "jsonwebtoken"
const CryptoJS = require("crypto-js");
const twilio = require('twilio');

const handler = async (req, res) => {

    const token = req.body.token
    const updateName = req.body.data
    const address = req.body.newAddress
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    let user;
    if (req.body.data) {
        user = await User.findOneAndUpdate({ email: data.email }, { name: req.body.data })

        res.status(200).json({ success: "Name Changed", })
    }
    if (req.body.newAddress) {
        user = await User.findOneAndUpdate({ email: data.email }, { address: req.body.newAddress })

        res.status(200).json({ success: "Address Changed", })
    }
    if (req.body.updatedPassword) {
        user = await User.findOneAndUpdate({ email: data.email }, { password: CryptoJS.AES.encrypt(req.body.updatedPassword, process.env.AES_SECRET).toString() })

        res.status(200).json({ success: "Password Changed", })
    }
    if (req.body.newMobile) {
        user = await User.findOneAndUpdate({ email: data.email }, { mobile: req.body.newMobile })

        const client = new twilio(`${process.env.TWILIO_ACCOUNT_SID}`, `${process.env.TWILIO_AUTH_TOKEN}`);

        client.messages.create({
            to: '+916350250055',
            from: '+16562186640',
            body: req.body.otp
        });

        res.status(200).json({ success: "Number Changed", })
    }

    // res.status(200).json({ user })

}


export default connectDb(handler);
