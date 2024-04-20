import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

import './DeleteDefinitionModal.scss'

function DeleteDefinitionModal(props) {
    const { show, dataModal, handleClose, handleConfirm } = props;
    const defaultDefinitionData = {
        word: '',
        type: '',
        definition: []
    }

    const [definitionData, setDefinitionData] = useState(defaultDefinitionData);


    useEffect(() => {
        if (dataModal) {
            let newDefinitionData = {
                word: dataModal.word,
                type: dataModal.type,
                definition: dataModal.definition,
            }

            setDefinitionData(newDefinitionData)
        }
    }, [dataModal])


    return (
        <>
            <Modal size="lg" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Delete Modal Confirmation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='row delete-definition-content text-center'>
                        <span>Are you sure to delete this definition ? You cannot undo it.</span>
                        <div className='delete-definition-info'>
                            <h4>
                                <strong>{definitionData.word} </strong>
                                <i>({definitionData.type})</i>:
                                <strong> {definitionData.definition.content}.</strong>
                            </h4>

                            <span>Up votes/Down votes: {definitionData.definition.upVotes}/{definitionData.definition.downVotes}.</span>
                            <br />
                            <span>Created At: {definitionData.definition.createdAt}.</span>
                            <br />
                            <span>Last updated At: {definitionData.definition.updatedAt}.</span>
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

export default DeleteDefinitionModal;