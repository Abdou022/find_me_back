var express = require('express');
var router = express.Router();
const discount = require('../controllers/discountController');

// Get All Discounts
router.get('/getAllDiscounts',discount.getAllDiscounts);

// Get Discount By id
router.get('/getDiscount/:id',discount.getDiscountById);

// Get Discount By Value
router.get('/getDiscountByValue/:value',discount.getDiscountByValue);

// Add Discount
router.post('/addDiscount',discount.addDiscount);

module.exports = router;