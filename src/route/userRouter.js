const router = require('express').Router();
const{ signUp ,verifyOtp, login, verifyotp} = require('../controllers/userController')


router.route('/signup')
      .post(signUp);

router.route('/sigup/verify')
        .post(verifyOtp);


router.route('/login').post(login);
router.route('/verify').post(verifyotp);

module.exports = router