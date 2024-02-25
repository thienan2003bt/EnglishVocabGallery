const router = require('express').Router();
const UserController = require('../controllers/user.c');
//MIDDLEWARES


//GET
router.get('/read', UserController.readAllUsers);

//POST
router.post('/create', UserController.createNewUser);

//PUT
router.put('/update', UserController.updateUser);

//DELETE 
router.delete('/delete', UserController.deleteUser);

module.exports = router;