const router = require('express').Router();
const WordController = require('../controllers/word.c');

//MIDDLEWARES


//GET
router.get('/read', WordController.readAllWords);
router.get('/detail:wordID', WordController.getWordByID);

//POST
router.post('/create', WordController.createNewWord);

//PUT
router.put('/update', WordController.updateWord);

//DELETE
router.delete('/delete', WordController.deleteWord);


module.exports = router;