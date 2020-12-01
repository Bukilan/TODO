import React, {ReactElement, ChangeEvent, useState} from 'react';
import ModalWindow from "../ModalWindow";
import Button from '@material-ui/core/Button';
import TextareaAutosize from 'react-textarea-autosize';
import './NoteModal.scss';
import { useDispatch } from "react-redux";

type Props = {
    isOpen: boolean,
    handleClose: () => void,
    initTitle?: string,
    initDescription?: string,
    id?: number,
    isEditNote?: boolean
}

const NoteModal = ({ isOpen, handleClose, initTitle = '', initDescription = '', id, isEditNote = false }: Props): ReactElement => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>(initTitle)
    const [description, setDescription] = useState<string>(initDescription)

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        if (!title) {
            return
        }
        if (!isEditNote) {
            dispatch.notes.addNote({
                title,
                description
            })
            setTitle('')
            setDescription('')
        } else {
            dispatch.notes.editNote({
                id,
                title,
                description
            })
        }
        handleClose()
    }

    return (
        <div className='AddNote-zone'>
            <ModalWindow
                isOpen={isOpen}
                handleClose={handleClose}
            >
                <div className='AddNote-wrapper'>
                    <div className='AddNote-container'>
                        <input onChange={handleTitleChange} value={title} placeholder='Название...' className='AddNote-title AddNote-input' />
                        <TextareaAutosize onChange={handleDescriptionChange} value={description} placeholder='Заметка...' className='AddNote-description AddNote-input' />
                        <Button onClick={handleSubmit} className='AddNote-button' variant="contained" color={title ? "primary" : "secondary" }>
                            Сохранить заметку !
                        </Button>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
}

export default NoteModal;
