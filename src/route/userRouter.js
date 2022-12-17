const router = require('express').Router();
const{ signUp ,verifyOtp, login, verifyotp, getUserData} = require('../controllers/userController')


router.route('/signup')
      .post(signUp);

router.route('/sigup/verify')
        .post(verifyOtp);


router.route('/login').post(login);
router.route('/verify').post(verifyotp);


router.route('/all').get(getUserData)

module.exports = router