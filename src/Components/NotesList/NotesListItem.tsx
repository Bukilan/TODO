import React, {ReactElement, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import './NotesListItem.scss';
import NoteModal from '../NoteModal';
import {useDispatch} from "react-redux";

type Props = {
    title: string,
    description: string,
    id: number,
}

const NotesListItem = ({ title, description, id }: Props): ReactElement => {
    const dispatch = useDispatch()

    const [isEditNoteOpen, setIsEditNoteOpen] = useState<boolean>(false)

    const changeEditNoteOpen = (): void => {
        setIsEditNoteOpen(prev => !prev)
    }

    const deleteNote = (): void => {
        dispatch.notes.deleteNote(id)
    }

    return (
        <div className='NotesListItem-container'>
            <Paper className='NotesListItem-note'>
                <IconButton onClick={changeEditNoteOpen} className='NotesListItem-edit' aria-label="delete">
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton color='secondary' onClick={deleteNote} className='NotesListItem-delete' aria-label="delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <h3 className='NotesListItem-title'>{title}</h3>
                <div className='NotesListItem-description'>{description}</div>
            </Paper>
            <NoteModal initTitle={title} initDescription={description} id={id} isEditNote isOpen={isEditNoteOpen} handleClose={changeEditNoteOpen} />
        </div>
    );
}

export default NotesListItem;
