import React, {ReactElement, ChangeEvent, useState} from 'react';
import ModalWindow from "../ModalWindow";
import Button from '@material-ui/core/Button';
import TextareaAutosize from 'react-textarea-autosize';
import './NoteModal.scss';
import { useDispatch } from "react-redux";
import Switch from '@material-ui/core/Switch';

type Props = {
    isOpen: boolean,
    handleClose: () => void,

    initTitle?: string,
    initDescription?: string,
    id?: number,
    isPinned?: boolean,
    isEditNote?: boolean
}

const NoteModal = ({ isOpen, handleClose, initTitle = '', initDescription = '', id, isPinned = false, isEditNote = false }: Props): ReactElement => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState<string>(initTitle)
    const [description, setDescription] = useState<string>(initDescription)
    const [isBePinned, setIsBePinned] = useState<boolean>(isPinned)

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleBePinnedChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsBePinned(prev => !prev)
    }

    const handleCreate = () => {
        if (!title) {
            return
        }

        dispatch.notes.addNote({
            title,
            description,
            isPinned: isBePinned,
        })

        setTitle('')
        setDescription('')
        setIsBePinned(false)

        handleClose()
    }

    const handleEdit = () => {
        if (title === initTitle && description === initDescription && isBePinned === isPinned) return

        dispatch.notes.editNote({
            id,
            title,
            description
        })
        if (isBePinned) {
            dispatch.notes.pinNote(
                id
            )
        } else {
            dispatch.notes.unPinNote(
                id
            )
        }
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
                        <div className='AddNote-controls'>
                            <div className='AddNote-switch'>
                                <Switch
                                    checked={isBePinned}
                                    onChange={handleBePinnedChange}
                                    color="primary"
                                    name='pinCheck'
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <div className='AddNote-switch_text'>Закрепить ?</div>
                            </div>
                            {!isEditNote ? (
                                <Button onClick={handleCreate} className='AddNote-button' variant="contained" color={title ? "primary" : "secondary" }>
                                    Создать заметку !
                                </Button>
                            ) : (
                                <Button onClick={handleEdit} className='AddNote-button' variant="contained" color={title !== initTitle || description !== initDescription || isBePinned !== isPinned ? "primary" : "secondary" }>
                                    Сохранить заметку !
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
}

export default NoteModal;
