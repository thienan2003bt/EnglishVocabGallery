import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { toast } from 'react-toastify';

import './AddWordModal.scss';
function AddWordModal(props) {
    const { show, dataModal, handleClose, handleSave } = props;
    const defaultWordData = {
        word: '',
        type: 'noun', //noun by default
        phonetic: '',
        categories: '',
        definitions: [],
        synonyms: '',
        antonyms: '',
    }
    const [wordData, setWordData] = useState(defaultWordData);

    const title = "Add new word";

    const handleSetWordData = (name, value) => {
        const _wordData = _.cloneDeep(wordData);
        if (name && _wordData.hasOwnProperty(name)) {
            _wordData[name] = value;
        }

        setWordData(_wordData);
    }




    const checkValidate = () => {
        return true;
    }

    const handleConfirm = async () => {
        let validState = checkValidate();
        if (validState === true) {

            try {
                //TODO: call API

                handleSave();
            } catch (error) {
                toast.error("Error handling request: " + error.message);
            }

        }
    }


    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='row add-word-modal-container'>

                        <div className='notice'>
                            <div className='text-center'>
                                <i>Each <label htmlFor='word' className='red'>words</label> is written in single token, which means no
                                    <span className='red'> whitespace ' ' </span>
                                    accepted.</i>
                            </div>
                            <div className='text-center'>
                                <i>
                                    Each <label htmlFor='categories' className='red'>categories</label><span>, </span>
                                    <label htmlFor='synonyms' className='red'> synonyms </label><span> or </span>
                                    <label htmlFor='antonyms' className='red'> antonyms </label>
                                    <span> separated by <span className='red'> semicolon ';' </span> character.</span>
                                </i>
                            </div>
                            <div className='text-center'>
                                <i>Each <label htmlFor='definitions' className='red'>definitions</label> is inputted on new line.</i>
                            </div>
                        </div>

                        <div className='row add-word-modal-content'>
                            <div className='col-6 form-group'>
                                <label htmlFor="word">Word: <span className='red'>(*)</span>: </label>
                                <input className="form-control"
                                    type="text" id="word" name="word"
                                    value={wordData.word} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="type">Type: <span className='red'>(*)</span>: </label>
                                <select className="form-select" name="type" id="type"
                                    value={wordData.type} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} >
                                    <option defaultValue="Noun">Noun</option>
                                    <option value="Verb">Verb</option>
                                    <option value="Adjective">Adjective</option>
                                    <option value="Adverb">Adverb</option>
                                    <option value="Pronoun">Pronoun</option>
                                    <option value="Preposition">Preposition</option>
                                    <option value="Conjunction">Conjunction</option>
                                </select>
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="phonetic">Phonetic <span className='red'>(*)</span>: </label>
                                <input className="form-control"
                                    type="text" name="phonetic" id="phonetic"
                                    value={wordData.phonetic} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>

                            <div className='col-6 form-group'>
                                <label htmlFor="categories">Categories: <span className='red'>(*)</span>: </label>
                                <input className="form-control"
                                    type="text" name="categories" id="categories"
                                    value={wordData.categories} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-12 form-group'>
                                <label htmlFor="definitions">Definitions <span className='red'>(*)</span>: </label>
                                <textarea className="form-control" rows='4'
                                    type="text" name="definitions" id="definitions"
                                    value={wordData.definitions} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="synonyms">Synonyms: </label>
                                <input className="form-control"
                                    type="text" name="synonyms" id="synonyms"
                                    value={wordData.synonyms} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="antonyms">Antonyms: </label>
                                <input className="form-control"
                                    type="text" name="antonyms" id="antonyms"
                                    value={wordData.antonyms} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                        </div>

                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddWordModal;