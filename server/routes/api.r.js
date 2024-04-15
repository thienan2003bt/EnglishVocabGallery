const router = require('express').Router();
const UserController = require('../controllers/user.c');
const AuthController = require('../controllers/auth.c');

router.use('*', AuthController.checkUser);

//POST
router.post('/login', UserController.handleLogin);
router.post('/signup', UserController.handleSignup);

//MIDDLEWARES
router.use('/user', require('./user.r'));
router.use('/word', require('./word.r'));
router.use('/definition', require('./definition.r'));

module.exports = router;