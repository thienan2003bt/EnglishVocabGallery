const router = require('express').Router();

const DefinitionController = require('../controllers/definition.c');

router.post('/create', DefinitionController.createNewDefinition);

router.put('/edit', DefinitionController.updateDefinition)

router.delete('/delete', DefinitionController.deleteDefinition)

module.exports = router;