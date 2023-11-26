import Forgot from "@/models/Forgot"
import connectDb from "@/middleware/mongoose"
import User from "@/models/User"
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    // check if user exist 
    // send email 

    if (req.body.data.user.sendMail == true) {
        let token = jwt.sign({ email: req.body.data.user.email }, process.env.JWT_SECRET, { expiresIn: "2d" });

        let forgot = new Forgot({
            email: req.body.data.user.email,
            token: token
        })
        await forgot.save()

        let email = `Hello [name],

    Somebody requested a new password for the [customer portal] account associated with [email].
    
    No changes have been made to your account yet.
    
    You can reset your password by clicking the link below:
    <a href="http://localhost:3000/forgot?token=${token}">Click here to reset your password<a/>
    
    If you did not request a new password, please let us know immediately by replying to this email.
    
    Yours,
    The Baba Provision Store team`

        res.status(200).json({ success: true })
    }
    else {
        let Fuser = await Forgot.findOne({token: req.body.data.user.token})
        let updateUser = await User.findOneAndUpdate({ email: Fuser.email }, { password: CryptoJS.AES.encrypt(req.body.data.user.password, process.env.AES_SECRET).toString() })

        if(updateUser != null && Fuser != null){
            res.status(200).json({ success: "Password Changed" })
        }
        else{
            res.status(200).json({ error: "user not found" })
        }
    }
}

export default connectDb(handler);