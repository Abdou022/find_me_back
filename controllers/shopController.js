const shopModel = require('../models/shopModel');

module.exports.getAllShops = async (req, res, next) => {
    try {
      const shopList = await shopModel.find();// .populate('owner') tjiblek fi west postman cellule mta3 owner kemla moch ken id mte3ou
      if (!shopList) {
        throw new Error("Shop not found");
      }
      res.status(200).json(shopList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports.getShopById = async (req, res, next) => { // 
    try {
      const { id } = req.params;
      const shop = await shopModel.findById(id);
      if (!shop) {
        throw new Error("Shop not found");
      }
      res.status(200).json(shop);// tnajem tgetti val mta3 esm brand khw par expl res.status(200).json(brand.nom);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

module.exports.getShopByName = async (req, res, next) => { //fil postman requete tkoun http://localhost:5000/products/getProductByName?name=necklace
    try {
        const {name} = req.query;
        if (!name) 
        {
            throw new Error("Please enter the shop name to search");
        }
        const shopList = await shopModel.find(
            {
                name:{$regex: name,$options:"i"},
            }
        ); //await nista3mlouha kif nabda bech ne5thou donnees mel base de donnees
        if (!shopList) 
        {
            throw new Error("Shop not found!");
        }
        res.status(200).json(shopList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  module.exports.addShop = async (req, res, next) => {
    try{
        const {name, localisation} = req.body; //tnajem ta3mel const nom = req.body.nom;
        if (!name) {
            return res.status(200).json({message: "Name required"});//7attina 200 khater kif bech njiw bech na3mlou liaison bel front 7achetna bech yraje3 true
        }
        if (!localisation) {
            return res.status(200).json({message: "Localisation required"});//7attina 200 khater kif bech njiw bech na3mlou liaison bel front 7achetna bech yraje3 true
        }
        const shop = new shopModel({name, localisation});
        const addedShop= await shop.save();
        res.status(201).json(addedShop);
      }catch(error){
        res.status(500).json({message: error.message});
      }
};

module.exports.deleteShop = async (req, res, next) => {
    try {
      const { id } = req.params; //req.params acces fil postman http://localhost:5000/users/deleteUser/2234567887654
      const checkIfShopExists = await shopModel.findById(id);
      if (!checkIfShopExists) {
        throw new Error("Shop not found");
      }
      //await Product.deleteMany({ brand: checkIfBrandExists.name }) tfasakh tous les produits du brand supprime
      await shopModel.findByIdAndDelete(id);
  
      res.status(200).json("Deleted Shop!");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports.updateShop = async (req, res, next) => {
    try {
        const { id }= req.params;
        const {name, localisation} = req.body;
        const checkIfShopExists = await shopModel.findById(id);
      if (!checkIfShopExists) {
        throw new Error("Shop not found");
      }
      updatedShop = await shopModel.findByIdAndUpdate(
        id,
        {
            $set : {name, localisation},
        },
        { new: true}
        );
        //await Product.updateMany({brand: checkIfBrandExists.name}, { $set: { brand: name } });
        res.status(200).json("Updated Shop!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};