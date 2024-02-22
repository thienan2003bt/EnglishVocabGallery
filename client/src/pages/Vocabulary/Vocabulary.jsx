import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import './Vocabulary.scss';

function Vocabulary(props) {

    const [totalPages, setTotalPages] = useState(10);

    const handlePageClick = () => {

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
                        <button className='btn btn-success mx-2'>Add new word</button>
                        <button className='btn btn-primary mx-2'>Refresh</button>
                    </div>
                </div>

                <hr />

                <div className='vocab-top-pagination my-2'>
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
                            <tr>
                                <th scope='row'>1</th>
                                <td className='font-weight-bold'>abbess</td>
                                <td>noun</td>
                                <td>/ˈæbes/</td>
                                <td>a woman who is the head of an abbey of nuns</td>
                                <td>
                                    <button className='btn btn-warning mx-1'>Edit</button>
                                    <button className='btn btn-danger mx-1'>Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>2</th>
                                <td className='font-weight-bold'>abdominous</td>
                                <td>adjective</td>
                                <td>/æb'dɑmənəs/</td>
                                <td>having a large belly</td>
                                <td>
                                    <button className='btn btn-warning mx-1'>Edit</button>
                                    <button className='btn btn-danger mx-1'>Delete</button>
                                </td>
                            </tr>
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
            </div>

        </div>
    );
}

export default Vocabulary;