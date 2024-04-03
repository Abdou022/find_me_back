const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
    {
     name: {type: String, required: true, unique: true},
     localisation:{
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true}
     },
     //products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },{timestamps:true} //kif t7ot timestamps: true tala3lek fil base mongo created at w updated at, dima n7otouha mel mosta7sen
);

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;