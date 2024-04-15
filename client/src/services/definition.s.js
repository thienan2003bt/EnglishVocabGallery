import axios from '../configs/axios';




const handleEditDefinition = async (vocabID, definitionID, newDefinitionContent) => {
    let response = await axios.put('/api/definition/edit', {
        vocabID, definitionID, newDefinitionContent
    });
    return response;
}

const DefinitionService = {
    handleEditDefinition,
}

export default DefinitionService