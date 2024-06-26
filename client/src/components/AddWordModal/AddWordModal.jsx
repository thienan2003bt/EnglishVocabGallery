import React, { useContext, useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { toast } from 'react-toastify';
import WordService from '../../services/word.s';
import { UserContext } from '../../context/UserContext';

import './AddWordModal.scss';

function AddWordModal(props) {
    const { user } = useContext(UserContext);
    const { show, dataModal, handleClose, handleSave } = props;
    const defaultWordData = {
        word: '',
        type: 'Noun', //noun by default
        phonetic: '',
        categories: '',
        definitions: [],
        level: 'A1',
        image: '',
        synonyms: '',
        antonyms: '',
    }
    const [wordData, setWordData] = useState(defaultWordData);

    const title = dataModal ? "Add new definitions" : "Add new word";

    const handleSetWordData = (name, value) => {
        const _wordData = _.cloneDeep(wordData);
        if (name && _wordData.hasOwnProperty(name)) {
            _wordData[name] = value;
        }

        setWordData(_wordData);
    }



    const checkValidate = () => {
        const validateAttributes = ['word', 'type', 'definitions', 'phonetic', 'level'];
        for (let i = 0; i < validateAttributes.length; i++) {


            let attribute = validateAttributes[i];

            if (!wordData[attribute]) {
                toast.error(`${attribute} is required`);
                return false;
            }

            if (attribute === 'word' && wordData[attribute].includes(' ') === true) {
                toast.error("Only single token word is allowed !");
                return false;
            }
        }
        return true;
    }

    const buildPersistData = () => {
        const _wordData = _.cloneDeep(wordData);
        _wordData.definitions = wordData.definitions.split('\n');

        _wordData.definitions.forEach((definition, index) => {
            _wordData.definitions[index] = {
                content: definition,
                upVotes: 0,
                downVotes: 0,
                author: user.account.id,
            }
        });

        return _wordData;
    }

    const handleConfirm = async () => {
        let validState = checkValidate();
        if (validState === true) {

            try {
                let persistData = buildPersistData();
                console.log("Persist data: ");
                console.log(persistData);

                let response = await WordService.createNewWord(persistData);
                if (response && response.data && parseInt(response.status) === 200) {
                    toast.success(response.message);
                    handleSave();
                    setWordData(defaultWordData);
                } else {
                    toast.error("Error creating new word: " + response?.message);
                }
            } catch (error) {
                toast.error("Error handling request: " + error.message);
            }

        }
    }

    useEffect(() => {
        if (dataModal) {
            let newWordData = {
                word: dataModal.word,
                type: dataModal.type,
                phonetic: dataModal.phonetic,
                level: dataModal.level
            }

            setWordData(newWordData);
        }
    }, [dataModal])


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
                                    <span> separated by <span className='red'> comma ',' </span> character.</span>
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
                                    type="text" id="word" name="word" disabled={dataModal}
                                    value={wordData.word} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="type">Type: <span className='red'>(*)</span>: </label>
                                <select className="form-select" name="type" id="type" disabled={dataModal}
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
                            <div className='col-12 form-group'>
                                <label htmlFor="definitions">Definitions <span className='red'>(*)</span>: </label>
                                <textarea className="form-control" rows='3'
                                    type="text" name="definitions" id="definitions"
                                    value={wordData.definitions} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="phonetic">Phonetic <span className='red'>(*)</span>: </label>
                                <input className="form-control"
                                    type="text" name="phonetic" id="phonetic" disabled={dataModal}
                                    value={wordData.phonetic} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>

                            <div className='col-6 form-group'>
                                <label htmlFor="level">Level: <span className='red'>(*)</span>: </label>
                                <select className="form-select" name="level" id="level" disabled={dataModal}
                                    value={wordData.level} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} >
                                    <option defaultValue="A1">A1</option>
                                    <option value="A2">A2</option>
                                    <option value="B1">B1</option>
                                    <option value="B2">B2</option>
                                    <option value="C1">C1</option>
                                    <option value="C2">C2</option>
                                </select>
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="categories">Categories: </label>
                                <input className="form-control"
                                    type="text" name="categories" id="categories"
                                    value={wordData.categories} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="image">Image: </label>
                                <input className="form-control"
                                    type="file" name="image" id="image"
                                    value={wordData.image} onChange={(e) => handleSetWordData(e.target.name, e.target.value)} />
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