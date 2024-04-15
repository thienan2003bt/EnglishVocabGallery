const db = require('../models/index');
const APIReturnData = require('../models/APIReturnData');


//supporting methods


// functional methods
const readAllDefinitions = async (page, limit) => {
    try {
        let data = [];
        if (page && limit) {
            //pagination
            page = +page;
            limit = +limit;
            let offset = (page - 1) * limit;

            const { count, rows } = await db.Definition.findAll({
                include: { model: db.Word },
                raw: true,
                nest: true,
                offset: offset,
                limit: limit,
                order: [['id', 'DESC']]
            });

            if (count && rows) {
                data = {
                    definitionArr: rows,
                    total: count,
                    totalPage: Math.ceil(count / limit),
                }

                return new APIReturnData(200, `Fetch all ${data.total} definitions successfully !`, data);
            } else {
                return new APIReturnData(404, "There is no definition in database", null);
            }
        } else {
            data = await db.Definition.findAll({
                include: { model: db.Word },
                raw: true,
                nest: true,
                order: [['id', 'DESC']]
            });
        }

        if (data && data.length > 0) {
            return new APIReturnData(200, `Fetch all ${data.length} definitions successfully !`, data);
        } else {
            return new APIReturnData(404, "There is no definition in database", null);
        }
    } catch (error) {
        console.log("Definition service error: " + error.message);
        return new APIReturnData(500, "Definition service error: " + error.message, null);
    }
}

const createNewDefinition = async (definitionData) => {
    try {
        let existingDefinition = await db.Definition.findOne({
            where: {
                content: definitionData.content,
                wordID: definitionData.wordID,
            }
        });

        if (existingDefinition) {
            return new APIReturnData(400, `Definition is already existed!`, null);
        }

        definitionData.createdAt = new Date();

        await db.Definition.create(definitionData);
        return new APIReturnData(200, `New Definition is created successfully!`, definitionData.content);

    } catch (error) {
        console.log("Definition service error: " + error.message);
        return new APIReturnData(500, "Definition service error: " + error.message, null);
    }
}

const updateDefinition = async (vocabID, definitionID, newDefinitionContent) => {
    try {
        let existingDefinition = await db.Definition.findOne({
            where: {
                id: definitionID,
                wordID: vocabID,
            },
        });

        if (!existingDefinition) {
            return new APIReturnData(404, "Definition is not found: ", null);
        }

        existingDefinition.content = newDefinitionContent;
        existingDefinition.updatedAt = Date.now();

        await existingDefinition.update({
            ...existingDefinition.dataValues
        });

        return new APIReturnData(200, "Update definition successfully !", existingDefinition.id);
    } catch (error) {
        console.log("Definition service error: " + error.message);
        return new APIReturnData(500, "Definition service error: " + error.message, null);
    }
};

const deleteDefinition = async (definitionID) => {
    try {
        let existingDefinition = await db.Definition.findOne({
            where: { id: definitionID },
        });

        if (!existingDefinition) {
            return new APIReturnData(404, "Definition is not found !", null);
        }
        //ensure that the username is cannot be changed
        await existingDefinition.destroy();
        return new APIReturnData(200, "Delete definition successfully !", definitionID);
    } catch (error) {
        console.log("Definition service error: " + error.message);
        return new APIReturnData(500, "Definition service error: " + error.message, null);
    }
}

const getDefinitionsByWord = async (wordID) => {
    try {
        let data = await db.Definition.findAll({
            where: { wordID: wordID },
            raw: true,
            nest: true,
            order: [['upVotes', 'DESC'], ['id', 'DESC']],
            include: {
                model: db.User, attributes: ['id', 'username']
            }
        });

        if (!data) {
            return new APIReturnData(404, "Definition is not found !", null);
        }

        return new APIReturnData(200, `All ${data.length} definitions returned successfully !`, data);
    } catch (error) {
        console.log("Definition service error: " + error.message);
        return new APIReturnData(500, "Definition service error: " + error.message, null);
    }
}

const DefinitionService = {
    readAllDefinitions,
    createNewDefinition,
    updateDefinition,
    deleteDefinition,
    getDefinitionsByWord
}


module.exports = DefinitionService;