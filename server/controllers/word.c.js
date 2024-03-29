const WordService = require('../services/word.s');

const readAllWords = async (req, res, next) => {
    try {
        let response = await WordService.readAllWords(req.query.page, req.query.limit);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const createNewWord = async (req, res, next) => {
    try {
        let response = await WordService.createNewWord(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const updateWord = async (req, res, next) => {
    try {
        let response = await WordService.updateWord(req.body);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const deleteWord = async (req, res, next) => {
    try {
        let response = await WordService.deleteWord(req.body.id);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const getWordByID = async (req, res, next) => {
    try {
        let { wordID } = req.params;
        let response = await WordService.getWordByID(wordID);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const searchWord = async (req, res, next) => {
    try {
        let { wordData, page, limit } = req.body;
        let response = await WordService.searchWord(wordData, page, limit);
        return res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Service error: " + error.message,
            data: null,
        });
    }
}

const WordController = {
    readAllWords,
    createNewWord,
    updateWord,
    deleteWord,
    getWordByID,
    searchWord
}

module.exports = WordController;