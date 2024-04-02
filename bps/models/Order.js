
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    orderId: {type: String, required: true, unique: true},
    paymentMode: {type: String, default: ''},
    products: {type: Object, required: true},
    address: {type: String, required: true},
    payStatus: {type: String, required: true, default: 'Pending'},
    amount: {type: Number, required: true},
    status: {type: String, required: true, default: 'Initiated'},
    orderDate: {type: String, required: true}
        
}, {timestamps:true});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);



