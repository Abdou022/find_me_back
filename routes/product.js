var express = require('express');
const prod = require('../controllers/productController');
var router = express.Router();

// Get All products
router.get('/getAllProducts', prod.getAllProducts);

// Get Product By id
router.get('/getProduct/:id', prod.getProductById);

// Get Product By name
router.get('/getProductByName', prod.getProductByName);

// Get Product By barcode
router.get('/getProductByBarCode', prod.getProductByBarCode);

// Get Products By color
router.get('/getProductsByColor', prod.getProductsByColor);

// Tri croissant prix
router.get('/sortByPrice',prod.sortByPrice);

// Tri decroissant prix
router.get('/sortByPriceDec',prod.sortByPriceDec);

// Tri croissant rating
router.get('/sortByRating',prod.sortByRating);

// Tri decroissant rating
router.get('/sortByRatingDec',prod.sortByRatingDec);

// Create new product
router.post('/addProduct', prod.addProduct);

// Delete Product
router.delete('/deleteProduct/:id', prod.deleteProduct);

// Update Product
router.put('/updateProduct/:id', prod.updateProduct); 


module.exports = router;