
const Paytm = require('paytmchecksum');

let paytmChecksum = ""


let paytmParam = {}

const received_data = JSON.parse(`{}`);
for(let key in received_data){
    if(key == 'CHECKSUMHASH'){
        paytmChecksum = received_data[key];
    }
    else{
        paytmChecksum[key] = received_data[key]
    }
}

let isValidChecksum = checksum_lib.verifySignature(paytmParam, "", paytmChecksum)
if(isValidChecksum){
    console.log("Checked Matched")
}
else{
    console.log("Checksum Mismatched")
}