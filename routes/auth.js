var express = require('express');
var router = express.Router();
const auth = require('../controllers/authController');
const upload = require('../middlewares/uploadFile');
const {verifyToken}= require('../middlewares/verifyToken');

router.get('/getUser/:id', auth.getUserById);
router.get('/getFavorites', verifyToken, auth.getFavorites);
router.post('/signup', upload.single('file'), auth.create_account);
router.post('/otp', auth.otpVerification);
router.post('/resendOtp', auth.resendOtpVerification);
router.post('/login', auth.login);
router.put('/addToFavorites', verifyToken, auth.addToFavorites);
router.put('/deleteAllFavorites', verifyToken, auth.deleteAllFavorites);

module.exports = router