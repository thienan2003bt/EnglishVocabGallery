import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordService from '../../services/word.s';
import { toast } from 'react-toastify';

import './VocabDetail.scss';


function VocabDetail(props) {

    const { wordID } = useParams();
    const [vocab, setVocab] = useState('');
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
                        <button className="btn btn-success">Add new definition</button>
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
                                <strong>{definition.content}</strong>

                                <div className='vocab-definition-actions'>
                                    <button className='btn btn-warning'>Edit</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </div>
                            </div>
                        })
                        : <h2>There is currently no definition for this word.</h2>
                    }
                </div>

            </div>
        </div>
    );
}

export default VocabDetail;