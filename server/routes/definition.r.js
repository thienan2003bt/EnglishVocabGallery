const router = require('express').Router();

const DefinitionController = require('../controllers/definition.c');


router.put('/edit', DefinitionController.updateDefinition)

router.delete('/delete', DefinitionController.deleteDefinition)

module.exports = router;