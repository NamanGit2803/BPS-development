import connectDb from "@/middleware/mongoose"
import User from "@/models/User"
import jsonwebtoken from "jsonwebtoken"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {

    const token = req.body.token
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({email: data.email})

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    let decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
    res.status(200).json({user,decryptedPass})

}


export default connectDb(handler);
