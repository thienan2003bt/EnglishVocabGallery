const db = require('../models/index');
const APIReturnData = require('../models/APIReturnData');
const DefinitionService = require('./definition.s');

//supporting methods
const validateWordDataBeforeInsertion = (wordData) => {
    const validateAttributes = ['word', 'type', 'definitions', 'phonetic', 'level', 'categories'];
    for (let i = 0; i < validateAttributes.length; i++) {
        let attribute = validateAttributes[i];

        if (!wordData[attribute]) {
            return false;
        }

        if (attribute === 'word' && wordData[attribute].includes(' ') === true) {
            return false;
        }
    }
    return true;
}

const addAllNewDefinitions = async (wordData, wordID) => {
    wordData.definitions.forEach(async (definition) => {
        definition.wordID = wordID;

        try {
            let response = await DefinitionService.createNewDefinition(definition);
            if (parseInt(response.status) === 200) {
                console.log("Create definition successfully with content: ");
                console.log(definition.content);
            } else {
                console.log("Error creating new definition: " + definition.content + "; msg: " + response?.message);
            }
        } catch (error) {
            console.log("Error creating new definition: " + definition.content + "; msg: " + error.message);
        }
    });
}

const buildWordDataWithDefinitions = async (wordArr) => {
    if (!wordArr || wordArr.length <= 0) {
        return new Error("Word array is empty");
    }
    for (let i = 0; i < wordArr.length; i++) {
        let word = wordArr[i];
        let response = await DefinitionService.getDefinitionsByWord(word.id);
        wordArr[i].definitions = response.data;
    }

    return wordArr;
}
// functional methods
const readAllWords = async (page, limit) => {
    try {
        let data = [];
        if (page && limit) {
            //pagination
            page = +page;
            limit = +limit;
            let offset = (page - 1) * limit;

            let { count, rows } = await db.Word.findAndCountAll({
                raw: true,
                nest: true,
                offset: offset,
                limit: limit,
                order: [['id', 'DESC']]
            });

            if (count && rows) {
                rows = await buildWordDataWithDefinitions(rows);

                data = {
                    wordArr: rows,
                    total: count,
                    totalPage: Math.ceil(count / limit),
                }

                return new APIReturnData(200, `Fetch all ${data.total} users successfully !`, data);
            } else {
                return new APIReturnData(404, "There is no word in database", null);
            }
        } else {
            data = await db.Word.findAll({
                raw: true,
                nest: true,
                order: [['id', 'DESC']]
            });
        }

        if (data && data.length > 0) {
            return new APIReturnData(200, `Fetch all ${data.length} users successfully !`, data);
        } else {
            return new APIReturnData(404, "There is no word in database", null);
        }
    } catch (error) {
        console.log("Word service error: " + error.message);
        return new APIReturnData(500, "Word service error: " + error.message, null);
    }
}

const createNewWord = async (wordData) => {
    try {
        let validateState = validateWordDataBeforeInsertion(wordData);
        if (validateState === false) {
            return new APIReturnData(400, `One of the properties is emptied or incorrect`, null);
        }

        let existingWord = await db.Word.findOne({
            where: {
                word: wordData.word,
                type: wordData.type,
            }
        });

        if (existingWord) {
            return new APIReturnData(400, `Word is already existed, you now can only add new definition !`, null);
        }

        wordData.createdAt = new Date();

        let wordRes = await db.Word.create(wordData);

        addAllNewDefinitions(wordData, wordRes.dataValues.id);
        return new APIReturnData(200, `New word is created successfully!`, wordData.word);
    } catch (error) {
        console.log("Word service error: " + error.message);
        return new APIReturnData(500, "Word service error: " + error.message, null);
    }
}

const updateWord = async (wordData) => {
    try {
        let existingWord = await db.Word.findOne({
            where: { id: wordData.id },
        });

        if (!existingWord) {
            return new APIReturnData(404, "Word is not found: ", null);
        }

        //ensure that the word is cannot be changed
        wordData.word = existingWord.word;
        existingWord.updatedAt = new Date();

        await existingWord.update();

        return new APIReturnData(200, "Update word successfully !", wordData.id);
    } catch (error) {
        console.log("Word service error: " + error.message);
        return new APIReturnData(500, "Word service error: " + error.message, null);
    }
};

const deleteWord = async (wordID) => {
    try {
        let existingWord = await db.Word.findOne({
            where: { id: wordID },
        });

        if (!existingWord) {
            return new APIReturnData(404, "Word is not found: ", null);
        }
        //ensure that the username is cannot be changed
        await existingWord.destroy();
        return new APIReturnData(200, "Delete user successfully !", wordID);
    } catch (error) {
        console.log("Word service error: " + error.message);
        return new APIReturnData(500, "Word service error: " + error.message, null);
    }
}

const WordService = {
    readAllWords,
    createNewWord,
    updateWord,
    deleteWord
}


module.exports = WordService;