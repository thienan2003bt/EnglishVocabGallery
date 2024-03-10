const router = require('express').Router();

//GET
router.get('/', (req, res) => {
    res.send("Hello world !");
});

router.use('/api', require('./api.r'));

module.exports = router;