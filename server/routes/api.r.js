const router = require('express').Router();
const UserController = require('../controllers/user.c');
//MIDDLEWARES



//POST
router.post('/login', UserController.handleLogin);
router.post('/signup', UserController.handleSignup);

module.exports = router;