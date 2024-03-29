import axios from '../configs/axios';


const fetchAllWords = async (page, limit) => {
    let response = await axios.get(`api/word/read?page=${page}&limit=${limit}`);
    return response;
}

const createNewWord = async (wordData) => {
    let response = await axios.post(`api/word/create`, { ...wordData });
    return response;
}

const getWordByID = async (wordID) => {
    let response = await axios.get(`api/word/detail${wordID}`);
    return response;
}

const searchWord = async (wordData, page, limit) => {
    let response = await axios.post(`api/word/search`, {
        wordData: wordData,
        page: page,
        limit: limit
    });
    return response;
}
const WordService = {
    fetchAllWords,
    createNewWord,
    getWordByID,
    searchWord
}


export default WordService;