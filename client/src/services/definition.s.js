import axios from '../configs/axios';




const handleEditDefinition = async (vocabID, definitionID, newDefinitionContent) => {
    let response = await axios.put('/api/definition/edit', {
        vocabID, definitionID, newDefinitionContent
    });
    return response;
}

const handleDeleteDefinition = async (vocabID, definitionID) => {
    let response = await axios.delete('/api/definition/delete', {
        data: {
            vocabID, definitionID
        }
    });
    return response;
}

const DefinitionService = {
    handleEditDefinition,
    handleDeleteDefinition,
}

export default DefinitionService