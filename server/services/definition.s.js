const db = require('../models/index');
const APIReturnData = require('../models/APIReturnData');
const DateFormatter = require('./DateFormatter.s');

//supporting methods
const normalizeDateData = (dateData) => {
    return DateFormatter.formatDate(dateData);
}

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

const createNewDefinition = async (newDefinitionData) => {
    try {
        let existingDefinition = await db.Definition.findOne({
            where: {
                content: newDefinitionData.content,
                wordID: newDefinitionData.wordID,
            }
        });

        if (existingDefinition) {
            return new APIReturnData(400, `definition is already existed!`, null);
        }

        newDefinitionData.createdAt = Date.now();

        await db.Definition.create(newDefinitionData);
        return new APIReturnData(200, `New definition is created successfully!`, newDefinitionData.content);

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

const deleteDefinition = async (vocabID, definitionID) => {
    try {
        let existingDefinition = await db.Definition.findOne({
            where: {
                wordID: vocabID,
                id: definitionID,
            },
        });

        if (!existingDefinition) {
            return new APIReturnData(404, "Definition is not found !", null);
        }

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

        data = data.map((definition) => {
            let newDefinition = {
                ...definition,
                createdAt: normalizeDateData(definition.createdAt),
                updatedAt: normalizeDateData(definition.updatedAt),
            }
            return newDefinition;
        })

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