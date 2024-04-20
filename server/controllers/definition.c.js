const DefinitionService = require('../services/definition.s');

const createNewDefinition = async (req, res, next) => {
    try {
        const { newDefinitionData } = req.body;

        let response = await DefinitionService.createNewDefinition(newDefinitionData);
        return res.status(response.status).json(response);
    } catch (error) {
        console.error("Error handling create definition:" + error.message);
        next(error);
    }
}

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

const deleteDefinition = async (req, res, next) => {
    try {
        const { vocabID, definitionID } = req.body;

        let response = await DefinitionService.deleteDefinition(vocabID, definitionID);
        return res.status(response.status).json(response);
    } catch (error) {
        console.error("Error handling delete definition:" + error.message);
        next(error);
    }
}
const DefinitionController = {
    createNewDefinition,
    updateDefinition,
    deleteDefinition,
}

module.exports = DefinitionController;