import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import './Vocabulary.scss';
import _ from 'lodash';
import AddWordModal from '../../components/AddWordModal/AddWordModal';

function Vocabulary(props) {

    const [totalPages, setTotalPages] = useState(10);
    const [limit, setLimit] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isShowAddWordModal, setIsShowAddWordModal] = useState(false);
    const [dataModal, setDataModal] = useState(null);


    const defaultWordArr = [{
        word: 'abbess',
        type: 'noun',
        phonetic: `/ˈæbes/`,
        definitions: [{
            definition: "a woman who is the head of an abbey of nuns",
        },],
    }, {
        word: 'abdominous',
        type: 'adjective',
        phonetic: `/æb'dɑmənəs/`,
        definitions: [{
            definition: "having a large belly",
        },],
    }]
    const [wordArr, setWordArr] = useState(defaultWordArr);


    const handlePageClick = async (event) => {
        let selectedPage = parseInt(event.selected) + 1;
        setCurrentPage(selectedPage);

        //TODO: delete all stuffs below when call API to get all words
        let _wordArr = _.cloneDeep(defaultWordArr);
        _wordArr = _wordArr.slice((selectedPage - 1) * limit, selectedPage * limit);
        setWordArr(_wordArr);
    }


    const handleEditWord = (index) => {
        if (index >= 0 && index < wordArr.length) {
            if (window.confirm(`Do you want to edit the word: ${wordArr[index].word} ?`) === true) {
                //TODO: call API here
                let _wordArr = _.cloneDeep(wordArr);
                setWordArr(_wordArr);
                toast.success(`Successfully edit the word: ${wordArr[index].word}!`);
            }
        } else {
            toast.error('Invalid index of word !');
        }
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


    //modal functions
    const handleCloseAddWordModal = async () => {
        setIsShowAddWordModal(false);

    }

    const handleConfirmAddWordModal = async () => {
        setIsShowAddWordModal(false);
        toast.success("New word is added successfully !");
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
                    <div className='col-5 my-3'>
                        <div className='input-group'>
                            <i className="input-group-text fa-brands fa-searchengin"></i>
                            <input className='form-control' type='text' id='search' name='search' placeholder='Search here ...' />
                        </div>
                    </div>


                    <div className='col-3 my-3 ms-5'>
                        <button type='button' className='btn btn-success mx-2' onClick={() => setIsShowAddWordModal(true)}>Add new word</button>
                        <button type='button' className='btn btn-primary mx-2'>Refresh</button>
                    </div>
                </div>

                <hr />


                <div className='vocab-content my-3 table-responsive'>
                    {/* TODO: implement this part in cardView */}
                    <table className='table table-info table-hover table-bordered border-success caption-top'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
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
                                    <td className='font-weight-bold'>{ele.word}</td>
                                    <td>{ele.type}</td>
                                    <td>{ele.phonetic}</td>
                                    <td>{ele.definitions[0].definition}</td>
                                    <td>
                                        <button className='btn btn-warning mx-1'
                                            onClick={() => handleEditWord(index)}
                                        >
                                            Edit
                                        </button>
                                        <button className='btn btn-danger mx-1'
                                            onClick={() => handleDeleteWord(index)}
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


                <AddWordModal show={isShowAddWordModal} dataModal={dataModal} handleClose={handleCloseAddWordModal} handleSave={handleConfirmAddWordModal} />
            </div>

        </div>
    );
}

export default Vocabulary;