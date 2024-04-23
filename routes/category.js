var express = require('express');
var router = express.Router();
const category = require('../controllers/categoryController');

// Get All Categories
router.get('/getAllCategories', category.getAllCategories);

// Get Category By id
router.get('/getCategory/:id', category.getCategoryById);

// Get Category By name
router.get('/getCategoryByName', category.getCategoryByName);

// Add Category
router.post('/addCategory',category.addCategory);

//Delete Category
router.delete('/deleteCategory/:id',category.deleteCategory);

// Update Category Name
router.put('/updateCategoryName/:id', category.updateCategoryName); 

// Add products to Category
router.put('/addProductsToCategory/:id', category.addProductsToCategory);

// Delete products from Category
router.put('/deleteProductsFromCategory/:id', category.deleteProductsFromCategory);

module.exports = router;