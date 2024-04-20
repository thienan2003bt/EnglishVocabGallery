import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordService from '../../services/word.s';
import DefinitionService from '../../services/definition.s';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import './VocabDetail.scss';
import DeleteDefinitionModal from './DeleteDefinitionModal/DeleteDefinitionModal';

function VocabDetail(props) {
    const { user } = useContext(UserContext);
    const { wordID } = useParams();
    const [vocab, setVocab] = useState('');
    const [newDefinitionContent, setNewDefinitionContent] = useState('');
    const [isShowDeleteDefinitionModal, setShowDeleteDefinitionModal] = useState(false);
    const [dataDeleteModal, setDataDeleteModal] = useState('');
    const [definitionSelectedIndex, setDefinitionSelectedIndex] = useState(-1);
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


    const handleConfirmAddDefinition = async () => {
        let newDefinitionData = {
            wordID: vocab.id,
            content: newDefinitionContent,
            upVotes: 0,
            downVotes: 0,
            author: parseInt(user.account.id),
        }

        try {
            let response = await DefinitionService.handleAddNewDefinition(newDefinitionData);
            if (response && response.data && parseInt(response.status) === 200) {
                toast.success(response.message);

                setNewDefinitionContent('');
                await fetchVocabulary();
            } else {
                toast.error("Error adding new definition: " + response?.message);
            }
        } catch (error) {
            toast.error("Error adding new definition: " + error.message);
        }

    }

    const handleEditDefinition = async (index) => {
        setDefinitionSelectedIndex(index);
    }


    const handleSaveEdit = async () => {

        if (definitionEditingValue === "") {
            return setDefinitionSelectedIndex(-1);
        }

        let currentID = vocab.definitions[definitionSelectedIndex].id;
        try {
            let response = await DefinitionService.handleEditDefinition(vocab.id, currentID, definitionEditingValue);
            if (response && response.data && parseInt(response.status) === 200) {
                toast.success(response.message);

                let newVocab = {
                    ...vocab,
                };
                newVocab.definitions[definitionSelectedIndex].content = definitionEditingValue;
                setVocab(newVocab);

                setDefinitionSelectedIndex(-1);
                setDefinitionEditingValue("");
            } else {
                toast.error("Error editing definition: " + response?.message);
            }
        } catch (error) {
            toast.error("Error editing definition: " + error.message);
        }
    }


    const handleOpenDeleteDefinitionModal = (index) => {
        if (user.account.id !== vocab.definitions[index].author) {
            return toast.error("You do not have permission to delete this definition !");
        }

        let newDataModal = {
            definition: vocab.definitions[index],
            word: vocab.word,
            type: vocab.type,
        }

        console.log("dataModal: ");
        console.log(newDataModal);
        setDataDeleteModal(newDataModal);
        setDefinitionSelectedIndex(index);
        setShowDeleteDefinitionModal(true);
    }

    const handleCloseDeleteDefinitionModal = () => {
        setShowDeleteDefinitionModal(false);
        setDataDeleteModal('');
    }

    const handleConfirmDeleteDefinitionModal = async () => {
        let currentID = vocab.definitions[definitionSelectedIndex].id;

        try {
            let response = await DefinitionService.handleDeleteDefinition(vocab.id, currentID);
            if (response && response.data && parseInt(response.status) === 200) {
                toast.success(response.message);

                setShowDeleteDefinitionModal(false);
                setDataDeleteModal('');
                setDefinitionSelectedIndex(-1);

                await fetchVocabulary();
            } else {
                toast.error("Error deleting definition: " + response.message);
            }
        } catch (error) {
            toast.error("Error deleting definition: " + error.message);
        }

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
                        <input className="form-control w-75" type="text" placeholder='Enter new definition here ...'
                            value={newDefinitionContent} onChange={(e) => setNewDefinitionContent(e.target.value)} />

                        <button className="btn btn-success col-2" onClick={() => handleConfirmAddDefinition()}>Add new definition</button>

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
                                        <span>{definition.User.username}</span>
                                    </div>
                                </div>

                                {definitionSelectedIndex === index
                                    ? <div className="vocab-definition-content col-8">
                                        <label>New Definition here</label>
                                        <input className='form-control'
                                            value={definitionEditingValue} placeholder={definition.content}
                                            onChange={(e) => setDefinitionEditingValue(e.target.value)} />
                                    </div>

                                    : <strong className="vocab-definition-content" id={`vocab-definition-content-${index}`}>{definition.content}</strong>
                                }

                                <div className='vocab-definition-actions'>
                                    {definitionSelectedIndex === index
                                        ? <>
                                            <button className='btn btn-success' onClick={() => handleSaveEdit()}>Save changes</button>
                                            <button className='btn btn-secondary'
                                                onClick={() => { setDefinitionSelectedIndex(-1); setDefinitionEditingValue("") }}>Cancel</button>
                                        </>
                                        : <>
                                            <button className='btn btn-warning' onClick={() => handleEditDefinition(index)}>Edit</button>
                                            <button className='btn btn-danger' onClick={() => handleOpenDeleteDefinitionModal(index)}>Delete</button>
                                        </>
                                    }

                                </div>
                            </div>
                        })
                        : <h2>There is currently no definition for this word.</h2>
                    }
                </div>


            </div>

            <DeleteDefinitionModal show={isShowDeleteDefinitionModal} dataModal={dataDeleteModal}
                handleClose={handleCloseDeleteDefinitionModal} handleConfirm={handleConfirmDeleteDefinitionModal}
            />

        </div >
    );
}

export default VocabDetail;