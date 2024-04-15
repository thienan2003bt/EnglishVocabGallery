import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordService from '../../services/word.s';
import DefinitionService from '../../services/definition.s';
import { toast } from 'react-toastify';

import './VocabDetail.scss';
import AddWordModal from '../../components/AddWordModal/AddWordModal';

function VocabDetail(props) {

    const { wordID } = useParams();
    const [vocab, setVocab] = useState('');
    const [isShowAddWordModal, setShowAddWordModal] = useState(false);
    const [dataModal, setDataModal] = useState('');
    const [definitionEditingIndex, setDefinitionEditingIndex] = useState(0);
    const [definitionEditingValue, setDefinitionEditingValue] = useState("");

    //did mount
    useEffect(() => {
        fetchVocabulary();
    }, []);


    const fetchVocabulary = async () => {
        try {
            let response = await WordService.getWordByID(parseInt(wordID));
            if (response && response.data && parseInt(response.status) === 200) {
                toast.success(response.message);
                setVocab(response.data);
            } else {
                toast.error("Error fetching vocabulary: " + response?.message);
            }
        } catch (error) {
            toast.error("Error fetching vocabulary: " + error.message);
        }
    }

    const handleEditDefinition = async (index) => {
        setDefinitionEditingIndex(index);
    }


    const handleSaveEdit = async () => {

        if (definitionEditingValue === "") {
            return setDefinitionEditingIndex(-1);
        }

        let currentID = vocab.definitions[definitionEditingIndex].id;
        try {
            let response = await DefinitionService.handleEditDefinition(vocab.id, currentID, definitionEditingValue);
            if (response && response.data && parseInt(response.status) === 200) {
                toast.success(response.message);

                let newVocab = {
                    ...vocab,
                };
                newVocab.definitions[definitionEditingIndex].content = definitionEditingValue;
                setVocab(newVocab);

                setDefinitionEditingIndex(-1);
                setDefinitionEditingValue("");
            } else {
                toast.error("Error editing definition: " + response?.message);
            }
        } catch (error) {
            toast.error("Error editing definition: " + error.message);
        }
    }

    const handleOpenAddWordModal = () => {
        let newDataModal = {
            ...vocab,
            definitions: []
        }
        setDataModal(newDataModal);
        setShowAddWordModal(true);
    }

    const handleCloseAddWordModal = () => {
        setShowAddWordModal(false);
    }

    const handleConfirmAddWordModal = async () => {
        //TODO: call API for adding new definitions for this word
        setShowAddWordModal(false);
        setDataModal('');
        await fetchVocabulary();
    }

    return (
        <div className='vocab-detail-container'>
            <div className='container my-5'>
                <div className='brief-title mb-3'>
                    <i>Meaning of <strong>{vocab.word}</strong>.</i>
                </div>
                <h2 className='vocab-detail-title '>{vocab.word}</h2>
                <div className='my-3'>
                    <i>{vocab.type}, <strong>{vocab.level}</strong></i>
                    <div></div>
                    <i>{vocab.phonetic}</i>
                </div>

                <div className='vocab-definitions-list my-5'>
                    <div className="vocab-detail-add col-12">
                        <button className="btn btn-success" onClick={() => handleOpenAddWordModal()}>Add new definition</button>
                    </div>

                    {vocab.definitions && vocab.definitions.length > 0
                        ? vocab.definitions.map((definition, index) => {
                            return <div className='vocab-definition my-3' key={`definition-${index}`}>
                                <div className='definition-statistics'>
                                    <div>
                                        <button className='btn btn-info'>🔼</button>
                                        <span>{definition.upVotes}</span>
                                    </div>
                                    <div>
                                        <button className='btn btn-info'>🔽</button>
                                        <span>{definition.downVotes}</span>
                                    </div>

                                    <div>
                                        <button className='btn btn-info' disabled>👤</button>
                                        <span>{definition.author}</span>
                                    </div>
                                </div>

                                {definitionEditingIndex === index
                                    ? <div className="vocab-definition-content col-8">
                                        <label>New Definition here</label>
                                        <input className='form-control'
                                            value={definitionEditingValue} onChange={(e) => setDefinitionEditingValue(e.target.value)} />
                                    </div>

                                    : <strong className="vocab-definition-content" id={`vocab-definition-content-${index}`}>{definition.content}</strong>
                                }

                                <div className='vocab-definition-actions'>
                                    {definitionEditingIndex === index
                                        ? <>
                                            <button className='btn btn-success' onClick={() => handleSaveEdit()}>Save changes</button>
                                            <button className='btn btn-secondary'
                                                onClick={() => { setDefinitionEditingIndex(-1); setDefinitionEditingValue("") }}>Cancel</button>
                                        </>
                                        : <>
                                            <button className='btn btn-warning' onClick={() => handleEditDefinition(index)}>Edit</button>
                                            <button className='btn btn-danger'>Delete</button>
                                        </>
                                    }

                                </div>
                            </div>
                        })
                        : <h2>There is currently no definition for this word.</h2>
                    }
                </div>


            </div>

            <AddWordModal show={isShowAddWordModal} dataModal={dataModal}
                handleClose={handleCloseAddWordModal} handleSave={handleConfirmAddWordModal}
            />

        </div>
    );
}

export default VocabDetail;