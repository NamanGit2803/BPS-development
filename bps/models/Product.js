const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    img: {type: String, required: true},
    category1: {type: String, required: true},
    category2: {type: String, required: true},
    topCategory: {type: String},
    size: {type: String, required: true},
    availableQty: {type: Number},
    price: {type: Number, required: true},
    desc: {type: String, required: true}
        
}, {timestamps:true});

mongoose.models = {}
export default mongoose.model("product", ProductSchema);
   