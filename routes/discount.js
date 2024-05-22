var express = require('express');
var router = express.Router();
const discount = require('../controllers/discountController');

// Get All Discounts
router.get('/getAllDiscounts',discount.getAllDiscounts);

// Get Discount By id
router.get('/getDiscount/:id',discount.getDiscountById);

// Get Discount By Value
router.get('/getDiscountByValue/:value',discount.getDiscountByValue);

// Get Discounted Products
router.get('/getDiscountedProducts', discount.getDiscountedProducts);

// Add Discount
router.post('/addDiscount',discount.addDiscount);

//Delete Products form Discount
router.delete('/deleteDiscount', discount.deleteDiscount);

module.exports = router;