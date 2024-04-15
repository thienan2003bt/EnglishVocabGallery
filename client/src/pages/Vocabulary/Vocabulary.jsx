import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './Vocabulary.scss';
import _ from 'lodash';
import AddWordModal from '../../components/AddWordModal/AddWordModal';
import WordService from '../../services/word.s';

function Vocabulary(props) {
    const navigate = useNavigate();
    const [totalWords, setTotalWords] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const [limit, setLimit] = useState(10); //10 by default
    const [currentPage, setCurrentPage] = useState(1);
    const [isShowAddWordModal, setIsShowAddWordModal] = useState(false);
    const [searchWord, setSearchWord] = useState('');

    const [wordArr, setWordArr] = useState({});


    //did mount
    useEffect(() => {
        fetchAllWords();
    }, [])

    //re-render whenever currentPage changes
    useEffect(() => {
        if (searchWord === '') {
            fetchAllWords();
        } else {
            handleSearch({
                target: {
                    value: searchWord
                },
                code: 'Enter'
            });
        }
    }, [currentPage, limit]);

    const restructureWordData = (data) => {
        setWordArr(data.wordArr);
        setTotalWords(data.total);
        setTotalPages(data.totalPage);
    }

    //functional methods
    const fetchAllWords = async () => {
        try {
            let response = await WordService.fetchAllWords(currentPage, limit);
            if (response && response.data && response.status === 200) {
                restructureWordData(response.data);
            } else {
                toast.error("Error fetching words: " + response?.message);
            }
        } catch (error) {
            toast.error("Error fetching words: " + error.message);

        }
    }

    const handlePageClick = async (event) => {
        let selectedPage = parseInt(event.selected) + 1;
        setCurrentPage(selectedPage);

    }

    const handleSearch = async (e) => {
        let value = e.target.value;
        let code = e.code;
        if (code === "Enter" || code === "NumpadEnter") {
            //alert("You searched for the word " + value);

            try {
                let response = await WordService.searchWord(value, currentPage, limit);
                if (response && response.data && response.status === 200) {
                    toast.success(response.message);
                    restructureWordData(response.data);
                } else {
                    toast.error("Error searching words: " + response?.message);
                }
            } catch (error) {
                toast.error("Error searching words: " + error.message);
            }
        } else {
            setSearchWord(value);
        }

    }


    const handleDetailWord = (wordID) => {
        navigate(`/vocabulary/${wordID}`);
    }

    const handleDeleteWord = (index) => {
        if (index >= 0 && index < wordArr.length) {
            if (window.confirm(`Do you want to delete the word: ${wordArr[index].word} ?`) === true) {

                //TODO: call API here
                let _wordArr = _.cloneDeep(wordArr);
                //remove the line below when the API is called
                _wordArr.splice(index, 1);
                setWordArr(_wordArr);
                toast.success(`Successfully delete the word: ${wordArr[index].word}!`);
            }
        } else {
            toast.error('Invalid index of word !');
        }
    }

    const handleRefresh = async () => {
        await fetchAllWords();
        setSearchWord('');
        toast.success(`Successfully refresh all words`);
    }




    //modal functions
    const handleCloseAddWordModal = async () => {
        setIsShowAddWordModal(false);

    }

    const handleConfirmAddWordModal = async () => {
        setIsShowAddWordModal(false);
        await fetchAllWords();
    }

    return (
        <div className='vocab-container my-3'>
            <div className='container'>
                <h3 className='vocab-title'>
                    Latest Vocabulary
                </h3>

                <div className='row vocab-toolbar'>
                    <div className='col-3 filter d-flex flex-row flex-wrap'>
                        <label className='filter-label'>Filter: </label>
                        <div className='filter-select-container'>
                            <select className="form-select filter-select">
                                <option defaultValue="0">Default</option>
                                <option disabled className='filter-select-divider'>------------</option>
                                <option value="1">Asc Alphabet</option>
                                <option value="2">Desc Alphabet</option>
                                <option value="3">Latest</option>
                                <option value="4">Oldest</option>
                                <option value="5">Most views</option>
                                <option value="6">Least views</option>
                            </select>
                        </div>


                    </div>
                    <div className='col-5 my-3 d-flex flex-row flex-wrap'>
                        <div className='input-group w-50 me-3'>
                            <i className="input-group-text fa-brands fa-searchengin"></i>
                            <input className='form-control' type='text' id='search' name='search' placeholder='Search here ...'
                                value={searchWord} onChange={(e) => setSearchWord(e.target.value)}
                                onKeyDown={(e) => handleSearch(e)} />
                        </div>
                        <label className='limit-label'>Word / Page: </label>
                        <div className='limit-select-container'>
                            <select className="form-select limit-select"
                                value={limit} onChange={(e) => setLimit(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option defaultValue="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>


                    <div className='col-3 my-3 ms-5'>
                        <button type='button' className='btn btn-success mx-2' onClick={() => setIsShowAddWordModal(true)}>Add new word</button>
                        <button type='button' className='btn btn-primary mx-2' onClick={() => handleRefresh()}>Refresh</button>

                    </div>
                </div>

                <hr />


                <div className='vocab-content my-3 table-responsive'>
                    {/* TODO: implement this part in cardView */}
                    <table className='table table-info table-hover table-bordered border-success caption-top'>
                        <caption><strong>List of words: {totalWords}</strong></caption>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>ID</th>
                                <th scope='col'>Word</th>
                                <th scope='col'>Type</th>
                                <th scope='col'>Phonetic</th>

                                <th scope='col'>Definitions</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>

                        <tbody className="table-group-divider">
                            {wordArr && wordArr.length > 0 ? wordArr.map((ele, index) => {
                                return <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{ele.id}</td>
                                    <td className='font-weight-bold'>{ele.word}</td>
                                    <td>{ele.type}</td>
                                    <td>{ele.phonetic}</td>
                                    {ele.definitions && ele.definitions.length > 0
                                        ? <td>{ele.definitions[0].content}</td>
                                        : <td></td>
                                    }
                                    <td>
                                        <button className='btn btn-warning mx-1'
                                            onClick={() => handleDetailWord(ele.id)}
                                        >
                                            Detail
                                        </button>
                                        <button className='btn btn-danger mx-1'
                                            onClick={() => handleDeleteWord(ele.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                                : <tr>
                                    <td colSpan={6} className='font-weight-bold'> <h3>There is no word at this page !</h3></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>


                <div className='vocab-bottom-pagination my-2'>
                    <ReactPaginate
                        containerClassName='pagination justify-content-center' //important
                        activeClassName='active'
                        breakLabel="..."
                        nextLabel="Next ->"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="<- Previous"
                        pageClassName='page-item'
                        pageLinkClassName='page-link'
                        breakClassName='page-item'
                        breakLinkClassName='page-link'
                        previousClassName='page-item'
                        previousLinkClassName='page-link'
                        nextClassName='page-item'
                        nextLinkClassName='page-link'
                        renderOnZeroPageCount={null} />
                </div>


                <AddWordModal show={isShowAddWordModal} handleClose={handleCloseAddWordModal} handleSave={handleConfirmAddWordModal} />
            </div>

        </div>
    );
}

export default Vocabulary;