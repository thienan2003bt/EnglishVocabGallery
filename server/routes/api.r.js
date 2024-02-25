const router = require('express').Router();
const UserController = require('../controllers/user.c');

//MIDDLEWARES
router.use('/user', require('./user.r'));
router.use('/word', require('./word.r'));

//POST
router.post('/login', UserController.handleLogin);
router.post('/signup', UserController.handleSignup);



module.exports = router;