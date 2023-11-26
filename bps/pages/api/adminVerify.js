import connectDb from "@/middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    const token = req.body.token
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    if(data.userType == 'admin'){
        res.status(200).json({ success: true})
    }
    else{
        res.status(200).json({ success: false})
    }
}


export default connectDb(handler);