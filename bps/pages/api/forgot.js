import connectDb from "@/middleware/mongoose"
import User from "@/models/User"
const http = require("https");
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    // check if user exist 
    // send email 

    if (req.body.data.user.sendMail == true) {

        let id = Math.random().toString(16).slice(2)


        const options = {
            "method": "POST",
            "hostname": "control.msg91.com",
            "port": null,
            "path": "/api/v5/email/send",
            "headers": {
                "accept": "application/json",
                "authkey": process.env.MSG91_AUTH_KEY,
                "content-type": "application/JSON"
            }
        };

        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });
        });

        req.write("{\n  \"recipients\": [\n    {\n      \"to\": [\n        {\n          \"name\": \"Recipient1 name\",\n          \"email\": \"Recipient1 email\"\n        }\n      ],\n      \"variables\": {\n        \"name\": \"Name 1\"\n      }\n    },\n    {\n      \"to\": [\n        {\n          \"name\": \"Recipient2 name\",\n          \"email\": \"Recipient2 email\"\n        }\n      ],\n      \"cc\": [\n        {\n          \"name\": \"Recipient3 name\",\n          \"email\": \"Recipient3 email\"\n        }\n      ],\n      \"bcc\": [\n        {\n          \"name\": \"Recipient4 name\",\n          \"email\": \"Recipient4 email\"\n        }\n      ],\n      \"variables\": {\n        \"name\": \"Name 2\"\n      }\n    }\n  ],\n  \"from\": {\n    \"name\": \"Joe\",\n    \"email\": \"sender@email.address\"\n  },\n  \"domain\": \"The domain which you have registered with us. We sign DKIM with this domain.\",\n  \"reply_to\": [\n    {\n      \"email\": \"reply1@email.com\"\n    },\n    {\n      \"email\": \"reply2@email.com\"\n    }\n  ],\n  \"attachments\": [\n    {\n      \"filePath\": \"Public path for file.\",\n      \"fileName\": \"File Name\"\n    },\n    {\n      \"file\": \"File in Data URI format data:content/type;base64,<data>.\",\n      \"fileName\": \"File Name\"\n    }\n  ],\n  \"template_id\": \"YOUR_UNIQUE_TEMPLATE_NAME\"\n}");
        req.end();




        res.status(200).json({ success: true })
    }
    else {
        let Fuser = await Forgot.findOne({ token: req.body.data.user.token })
        let updateUser = await User.findOneAndUpdate({ email: Fuser.email }, { password: CryptoJS.AES.encrypt(req.body.data.user.password, process.env.AES_SECRET).toString() })

        if (updateUser != null && Fuser != null) {
            res.status(200).json({ success: "Password Changed" })
        }
        else {
            res.status(200).json({ error: "user not found" })
        }
    }
}

export default connectDb(handler);