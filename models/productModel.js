const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
     name: {type: String, required: true},
     price: {type: Number, required: true},
     rating: {type: Number, default:0},
     barcode: {type: Number, unique: true},
     thumbnail: {type:String,required: false},
     images: {type:[String], required: false},
     color: String,
     description: String,
     size: String,
    },{timestamps:true} //kif t7ot timestamps: true tala3lek fil base mongo created at w updated at, dima n7otouha mel mosta7sen
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;