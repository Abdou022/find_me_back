const productModel = require('../models/productModel');
const Brand = require('../models/brandModel');
const Shop = require('../models/shopModel');
const Category = require('../models/categoryModel');
const cloudinary = require('cloudinary').v2;
const { validationResult } = require('express-validator');
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.getAllProducts = async (req, res, next) => {
    try {
      const productList = await productModel.find();// .populate('owner') tjiblek fi west postman cellule mta3 owner kemla moch ken id mte3ou
      if (!productList) {
        throw new Error("Product not found");
      }
      res.status(200).json(productList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

module.exports.getProductById = async (req, res, next) => { // 
    try {
        const { id } = req.params;
      const product = await productModel.findById(id);
      if (!product) {
        throw new Error("Product not found");
      }
      product.searched += 1;
      await product.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

module.exports.getProductByName = async (req, res, next) => { //fil postman requete tkoun http://localhost:5000/products/getProductByName?name=necklace
    try {
        const {name} = req.query;
        /*if (!name) 
        {
            throw new Error("Please enter the product name to search");
        }*/
        const productList = await productModel.find(
            {
                name:{$regex: name,$options:"i"},
            }
        ); //await nista3mlouha kif nabda bech ne5thou donnees mel base de donnees
        if (!productList) 
        {
            throw new Error("Product not found!");
        }
        //console.log(productList.length);
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getProductByBarCode = async (req, res, next) => { // 
    try {
        const { barcode } = req.query;
      const product = await productModel.find({barcode})
      if (!product || product.length === 0) {
        throw new Error("Product not found");
      }
  
      // Increment the 'searched' field by 1 for each product found
      for (let i = 0; i < product.length; i++) {
        product[i].searched += 1;
        await product[i].save();
      }
      /*product.searched += 1;
      await product.save();*/
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

module.exports.getProductsByColor = async (req, res, next) => {
    try {
        const { color } = req.query;
        if (!color) {
            throw new Error("Please provide a color to search for");
        }
        const productList = await productModel.find({ colors: { $regex: new RegExp(color, 'i') } });
        if (!productList || productList.length === 0) {
            throw new Error("No products found with the specified color");
        }
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addProduct = async (req, res, next) => {
    try{
        //
        //const thumbnail = req.files['thumbnail'][0].filename; //fil postman nemchiw lel body w n7otou form data moch raw w ndakhlou esemi image_user, email, password...
        //const images = req.files['images'].map(file => file.filename);
        const {name, price, rating, barcode, colors, description, size, brand_id, /*shops_id*/} = req.body; //tnajem ta3mel const nom = req.body.nom;
        //if (!name) {
        //    return res.status(200).json({message: "Name required"});//7attina 200 khater kif bech njiw bech na3mlou liaison bel front 7achetna bech yraje3 true
        /*}
        if (!price) {
            return res.status(200).json({message: "Price required"});
        }
        if (!barcode) {
            return res.status(200).json({message: "Barcode required"});
        }
        if (!thumbnail) {
            return res.status(200).json({message: "Image required"});
        }
        if (!brand_id) {
            return res.status(200).json({message: "Enter valid Brand id"});
        }*/ ///////////////////////////////////////////////////////////////////////////
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Handle image upload
        let thumbnail;
        if (req.files['thumbnail'][0]) {
            thumbnail = await cloudinary.uploader.upload(req.files['thumbnail'][0].path);
        }
        let images = [];
        // Handle multiple image uploads
        if (req.files['images']) {
            const imagesFiles = req.files['images'].map(file => file.path);

            if (imagesFiles && imagesFiles.length > 0) {
                for (const file of imagesFiles) {
                    const uploadedImage = await cloudinary.uploader.upload(file);
                    images.push(uploadedImage.secure_url);
                }
            }

        }
        /*if (!shops_id) {
            return res.status(200).json({message: "Enter valid Shops id"});
        }*/
        const brand_name = await Brand.findById(brand_id);
        // Upload thumbnail to Cloudinary
        /*console.log("hi");
        const thumbnailResult = await cloudinary.uploader.upload(thumbnail,function(err,result){
            if(err){
                console.log(err.message);  
                return res.status(404).json("erreeeeeeeur");
            }
        });
        const thumbnailUrl = thumbnailResult.secure_url;
        console.log("thumbnailUrl");
 
        // Upload images to Cloudinary and extract their URLs
        const imageUrls = await Promise.all(images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image);
            return result.secure_url;
        }));*/

        const product = new productModel({
          name,
          price,
          rating,
          barcode,
          colors,
          description,
          size,
          thumbnail: thumbnail ? thumbnail.secure_url : null,
          images: images.length > 0 ? images : null,
          brand:brand_name.name
        });
        const addedProduct= await product.save();
        await Brand.findByIdAndUpdate(brand_id, { $push: { products: product._id } });
        res.status(201).json(addedProduct);
      }catch(error){
        res.status(500).json({message: error.message});
      }
};

module.exports.deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params; //req.params acces fil postman http://localhost:5000/users/deleteUser/2234567887654
      const checkIfProductExists = await productModel.findById(id);
      if (!checkIfProductExists) {
        throw new Error("Product not found");
      }
      await productModel.findByIdAndDelete(id);
      await Brand.updateMany({}, { $pull: { products: checkIfProductExists._id } });
      await Shop.updateMany({}, { $pull : { products: checkIfProductExists._id } });
      await Category.updateMany({}, { $pull : { products: checkIfProductExists._id } });
      res.status(200).json("Deleted Product!");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports.updateProduct = async (req, res, next) => { //ne9sa modifications fil tsawer
    try {
        const { id }= req.params;
        const {name, price ,rating, barcode, colors, description, size} = req.body;
        //const thumbnail = req.files['thumbnail'][0].filename;
        //const images = req.files['images'].map(file => file.filename);

        const checkIfProductExists = await productModel.findById(id);
      if (!checkIfProductExists) {
        throw new Error("Product not found");
      }
      updatedProduct = await productModel.findByIdAndUpdate(
        id,
        {
            $set : {name, price ,rating, barcode, colors, description, size/*, thumbnail, images*/},
        },
        { new: true}
        );

        res.status(200).json("Updated Product!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.sortByPrice = async (req, res, next) => {
    try {
        const productList = await productModel.find().sort({price : 1}); // ken 7atit price:1 raw tri croissant ken price -1 raw decroissant
        if (!productList) // !productList kima t9oul null
        {
            throw new Error("Products not found!");
        }
        //console.log(userList);
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.sortByPriceDec = async (req, res, next) => {
    try {
        const productList = await productModel.find().sort({price : -1}); // ken 7atit price:1 raw tri croissant ken price -1 raw decroissant
        if (!productList) // !productList kima t9oul null
        {
            throw new Error("Products not found!");
        }
        //console.log(userList);
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.sortByRating = async (req, res, next) => {
    try {
        const productList = await productModel.find().sort({rating : 1}); // ken 7atit price:1 raw tri croissant ken price -1 raw decroissant
        if (!productList) // !productList kima t9oul null
        {
            throw new Error("Products not found!");
        }
        //console.log(userList);
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.sortByRatingDec = async (req, res, next) => {
    try {
        const productList = await productModel.find().sort({rating : -1}); // ken 7atit price:1 raw tri croissant ken price -1 raw decroissant
        if (!productList) // !productList kima t9oul null
        {
            throw new Error("Products not found!");
        }
        //console.log(userList);
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.searchProductsWithFilter = async (req, res, next) =>{
    try{
        let query = {};
        const test1="";
        //Filter
        if(req.body.region){
            const shopList = await Shop.find({ region: req.body.region }); // Retrieve shops in the specified region
            const shopNames = shopList.map(shop => shop.name); // Extract shop names
            query.shops = { $in: shopNames }; // Filter products based on shop IDs in the specified region
        }
        if(req.body.colors){
            query.colors= { $in: req.body.colors };
        }
        if(req.body.size){
            if( JSON.stringify(req.body.size) === JSON.stringify([])){
                
            }else{
                query.size= { $in: req.body.size };
            }
        }
        //Sort
        let sortCriteria = {};
        if (req.body.sortBy) {
            sortCriteria[req.body.sortBy] = req.body.sortOrder === 'desc' ? -1 : 1;
        }
        //search
        if (req.body.name) {
            query.name =  { $regex: req.body.name, $options: "i" } ;
        }
        //Fetching Products
        const productList = await productModel.find(query)
            .sort(sortCriteria)
            //.populate('shops') //tnajamch t7otha khater .populate tekhou fil paramtere ken type id
            console.log(productList.length);
        res.status(200).json(productList);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

