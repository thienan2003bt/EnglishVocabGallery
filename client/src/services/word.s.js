import axios from '../configs/axios';



const createNewWord = async (wordData) => {
    console.log(wordData);
    let response = await axios.post(`api/word/create`, { ...wordData });
    return response;
}


const WordService = {
    createNewWord,
}


export default WordService;