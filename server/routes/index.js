const router = require('express').Router();


//GET
router.get('/', (req, res) => {
    res.send("Hello world !");
});


module.exports = router;