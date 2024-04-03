var express = require('express');
var router = express.Router();
const brand = require('../controllers/brandController');

// Get All products
router.get('/getAllBrands', brand.getAllBrands);

// Get Brand By id
router.get('/getBrand/:id', brand.getBrandById);

// Get Brand By name
router.get('/getBrandByName', brand.getBrandByName);

// Add Brand
router.post('/addBrand',brand.addBrand);

//Delete Brand
router.delete('/deleteBrand/:id',brand.deleteBrand);

//Update Brand
// Update Product
router.put('/updateBrand/:id', brand.updateBrand); 

module.exports = router;