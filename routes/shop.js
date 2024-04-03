var express = require('express');
var router = express.Router();
const shop = require('../controllers/shopController');


// Get All Shops
router.get('/getAllShops',shop.getAllShops);

// Get Shop By id
router.get('/getShop/:id', shop.getShopById);

// Get Shop By name
router.get('/getShopByName', shop.getShopByName);

// Add Shop
router.post('/addShop',shop.addShop);

//Delete Shop
router.delete('/deleteShop/:id',shop.deleteShop);

// Update Shop
router.put('/updateShop/:id', shop.updateShop); 

module.exports = router;