var express = require('express');
var router = express.Router();
const auth = require('../controllers/authController');
const upload = require('../middlewares/uploadFile');

router.get('/getUser/:id', auth.getUserById);
router.post('/signup', upload.single('file'), auth.create_account);
router.post('/otp', auth.otpVerification);
router.post('/resendOtp', auth.resendOtpVerification);
router.post('/login', auth.login);
router.post('/addProductTofavorites', auth.addProductTofavorites);
router.delete('/deleteProductFromfavorites', auth.deleteProductFromfavorites);
router.delete('/deleteAllFavorites', auth.deleteAllFavorites);

module.exports = router