const db = require('../models/index');
const APIReturnData = require('../models/APIReturnData');


//supporting methods
const validateWordDataBeforeInsertion = (wordData) => {
    //TODO: implement this
    wordData.definitions = null; //DELETE THIS
    return true;
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

            data = await db.Word.findAll({
                include: { model: db.Definition },
                raw: true,
                nest: true,
                offset: offset,
                limit: limit,
                order: [['id', 'DECS']]
            });
        } else {
            data = await db.Definition.findAll({
                include: { model: db.Definition },
                raw: true,
                nest: true,
                order: [['id', 'DECS']]
            });
        }

        if (data && data.length > 0) {
            return new APIReturnData(200, `Fetch all ${data.length} users is successfully`, null);
        } else {
            return new APIReturnData(404, "There is no user in database", null);
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
            return new APIReturnData(400, `One of the properties is required`, null);
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

        await db.Word.create(wordData);
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
        return new APIReturnData(200, "Delete user successfully !", wordData.id);
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