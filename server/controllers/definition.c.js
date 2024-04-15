const DefinitionService = require('../services/definition.s');

const updateDefinition = async (req, res, next) => {
    try {
        const { vocabID, definitionID, newDefinitionContent } = req.body;

        let response = await DefinitionService.updateDefinition(vocabID, definitionID, newDefinitionContent);
        return res.status(response.status).json(response);
    } catch (error) {
        console.error("Error handling update definition:" + error.message);
        next(error);
    }
}

const DefinitionController = {
    updateDefinition,
}

module.exports = DefinitionController;