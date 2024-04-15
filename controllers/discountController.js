const discountModel = require('../models/discountModel');

module.exports.getAllDiscounts = async (req, res, next) => {
    try {
      const discountList = await discountModel.find().populate('sale_products');// .populate('owner') tjiblek fi west postman cellule mta3 owner kemla moch ken id mte3ou
      if (!discountList) {
        throw new Error("Discount not found");
      }
      res.status(200).json(discountList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports.getDiscountById = async (req, res, next) => { // 
    try {
      const { id } = req.params;
      const discount = await discountModel.findById(id);
      if (!discount) {
        throw new Error("Discount not found");
      }
      res.status(200).json(discount);// tnajem tgetti val mta3 esm brand khw par expl res.status(200).json(brand.nom);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

module.exports.getDiscountByValue = async (req, res, next) => { // 
    try {
        const { value } = req.params;
      const discount = await discountModel.find({value})
      if (!discount) {
        throw new Error("Discount not found");
      }
      res.status(200).json(discount);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}; 

/*module.exports.addDiscount = async (req, res, next) => {
    try{
        const {value, sale_products} = req.body; //tnajem ta3mel const nom = req.body.nom;
        const discount = new discountModel({value});
        const addedDiscount= await discount.save();
        res.status(201).json(addedDiscount);
      }catch(error){
        res.status(500).json({message: error.message});
      }
};*/
module.exports.addDiscount = async (req, res, next) => {
    try {
        const { value, sale_products } = req.body;

        // Check if a discount with the provided value already exists
        const existingDiscount = await discountModel.findOne({ value });

        if (existingDiscount) {
            // If the discount exists, update it by adding the product IDs
            existingDiscount.sale_products.push(sale_products);
            await existingDiscount.save();
            res.status(200).json(existingDiscount);
        } else {
            // If the discount doesn't exist, create a new one
            const newDiscount = new discountModel({ value, sale_products });
            const addedDiscount = await newDiscount.save();
            res.status(201).json(addedDiscount);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.deleteDiscount = async (req, res, next) => {
    try {
      const { value } = req.params; //req.params acces fil postman http://localhost:5000/users/deleteUser/2234567887654
      const checkIfDiscountExists = await discountModel.findById(id);
      if (!checkIfDiscountExists) {
        throw new Error("Brand not found");
      }
      await Product.deleteMany({ brand: checkIfBrandExists.name }) //tfasakh tous les produits du brand supprime
      await brandModel.findByIdAndDelete(id);
  
      res.status(200).json("Deleted Brand!");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};