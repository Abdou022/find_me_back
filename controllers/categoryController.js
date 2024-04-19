const categoryModel = require('../models/categoryModel');
const Product = require('../models/productModel');

module.exports.getAllCategories = async (req, res, next) => {
    try {
      const categoryList = await categoryModel.find().populate('products');// .populate('owner') tjiblek fi west postman cellule mta3 owner kemla moch ken id mte3ou
      if (!categoryList) {
        throw new Error("Category not found");
      }
      res.status(200).json(categoryList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports.getCategoryById = async (req, res, next) => { // 
    try {
        const { id } = req.params;
      const category = await categoryModel.findById(id);
      if (!category) {
        throw new Error("Category not found");
      }
      res.status(200).json(category);// tnajem tgetti val mta3 esm brand khw par expl res.status(200).json(brand.nom);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

module.exports.getCategoryByName = async (req, res, next) => { //fil postman requete tkoun http://localhost:5000/products/getProductByName?name=necklace
    try {
        const {name} = req.query;
        if (!name) 
        {
            throw new Error("Please enter the category name to search");
        }
        const categoryList = await categoryModel.find(
            {
                name:{$regex: name,$options:"i"},
            }
        ); //await nista3mlouha kif nabda bech ne5thou donnees mel base de donnees
        if (!categoryList || categoryList.length===0 ) 
        {
            throw new Error("Category not found!");
        }
        res.status(200).json(categoryList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.addCategory = async (req, res, next) => {
    try{
        const {name, products} = req.body; //tnajem ta3mel const nom = req.body.nom;
        if (!name) {
            return res.status(200).json({message: "Name required"});//7attina 200 khater kif bech njiw bech na3mlou liaison bel front 7achetna bech yraje3 true
        }
        const category = new categoryModel({name, products});
        const addedCategory= await category.save();
        res.status(201).json(addedCategory);
      }catch(error){
        res.status(500).json({message: error.message});
      }
};

module.exports.deleteCategory = async (req, res, next) => {
    try {
      const { id } = req.params; //req.params acces fil postman http://localhost:5000/users/deleteUser/2234567887654
      const checkIfCategoryExists = await categoryModel.findById(id);
      if (!checkIfCategoryExists) {
        throw new Error("Category not found");
      }
      //await Product.deleteMany({ brand: checkIfBrandExists.name }) //tfasakh tous les produits du brand supprime
      await categoryModel.findByIdAndDelete(id);
  
      res.status(200).json("Deleted Category!");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports.updateCategoryName = async (req, res, next) => {
    try {
        const { id }= req.params;
        const {name} = req.body;
        const checkIfCategoryExists = await categoryModel.findById(id);
      if (!checkIfCategoryExists) {
        throw new Error("Category not found");
      }
      updatedCategory = await categoryModel.findByIdAndUpdate(
        id,
        {
            $set : {name},
        },
        { new: true}
        );
        //await Product.updateMany({brand: checkIfBrandExists.name}, { $set: { brand: name } });
        res.status(200).json("Updated Category!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};