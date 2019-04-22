const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/auth.controller');
const secure         = require('../middlewares/secure.mid');
const passport       = require('passport')

 
/* GET home page. */
router.get('/', secure.isAuthenticated, authController.index);

router.get('/register', authController.register);
router.post('/register', authController.doRegister);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);
router.get('/authenticate/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email']}))
router.get('/auth/:idp/cb', authController.loginWithIDPCallback);

router.get('/logout', authController.logout)


module.exports = router;
