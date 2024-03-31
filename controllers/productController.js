const productModel = require('../models/productModel');


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
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

module.exports.getProductByName = async (req, res, next) => { //fil postman requete tkoun http://localhost:5000/products/getProductByName?name=necklace
    try {
        const {name} = req.query;
        if (!name) 
        {
            throw new Error("Please enter the product name to search");
        }
        const productList = await productModel.find(
            {
                name:{$regex: name,$options:"i"},
            }
        ); //await nista3mlouha kif nabda bech ne5thou donnees mel base de donnees
        if (!productList) 
        {
            throw new Error("Product not found!");
        }
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getProductByBarCode = async (req, res, next) => { // 
    try {
        const { barcode } = req.query;
      const product = await productModel.find({barcode})
      if (!product) {
        throw new Error("Product not found");
      }
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
        const productList = await productModel.find({ color: { $regex: new RegExp(color, 'i') } });
        if (!productList || productList.length === 0) {
            throw new Error("No products found with the specified color");
        }
        res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addProduct = async (req, res, next) => {
    try {
      const { name, price, rating, barcode, color, description, size} = req.body;
      const product = new productModel({
        name,
        price,
        rating,
        barcode,
        color,
        description,
        size
      });
      const addedProduct = await product.save();
      res.status(201).json(addedProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
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
  
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports.updateProduct = async (req, res, next) => {
    try {
        const { id }= req.params;
        const {name, price ,rating, barcode, color, description, size} = req.body;
        const checkIfProductExists = await productModel.findById(id);
      if (!checkIfProductExists) {
        throw new Error("Product not found");
      }
      updatedProduct = await productModel.findByIdAndUpdate(
        id,
        {
            $set : {name, price ,rating, barcode, color, description, size},
        },
        { new: true}
        );

        res.status(200).json("updated");
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

