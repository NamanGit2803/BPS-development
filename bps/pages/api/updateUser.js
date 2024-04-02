import connectDb from "@/middleware/mongoose"
import User from "@/models/User"
import jsonwebtoken from "jsonwebtoken"
const CryptoJS = require("crypto-js");
// const twilio = require('twilio');
import { initClient } from 'messagebird';


const handler = async (req, res) => {

    const token = req.body.token
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    let user;
    if (req.body.data) {
        user = await User.findOneAndUpdate({ email: data.email }, { name: req.body.data })

        res.status(200).json({ success: "Name Changed", })
    }
    else if (req.body.newAddress) {
        user = await User.findOneAndUpdate({ email: data.email }, { address: req.body.newAddress })

        res.status(200).json({ success: "Address Changed", })
    }
    else if (req.body.updatedPassword) {
        user = await User.findOneAndUpdate({ email: data.email }, { password: CryptoJS.AES.encrypt(req.body.updatedPassword, process.env.AES_SECRET).toString() })

        res.status(200).json({ success: "Password Changed", })
    }
    else if (req.body.newMobile) {
        user = await User.findOneAndUpdate({ email: data.email }, { mobile: req.body.newMobile })

        res.status(200).json({ success: "Number Changed" })
    }
    else if (req.body.otp) {
        // const client = new twilio(`${process.env.TWILIO_ACCOUNT_SID}`, `${process.env.TWILIO_AUTH_TOKEN}`);
        const messagebird = initClient('<YOUR_ACCESS_KEY>');

        // client.messages.create({
        //         from: '+18644383609',
        //         to: '+916350250055',
        //         body: req.body.otp
        //     })


        messagebird.messages.create({
            originator : '31970XXXXXXX',
            recipients : [ '31970YYYYYYY' ],
            body : 'Hello World, I am a text message and I was hatched by Javascript code!'
         })

        res.status(200).json({ success: true })
    }

    // res.status(200).json({ user })

}


export default connectDb(handler);
