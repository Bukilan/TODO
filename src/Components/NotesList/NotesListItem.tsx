import React, {ReactElement, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import './NotesListItem.scss';
import NoteModal from '../NoteModal';
import {useDispatch} from "react-redux";

type Props = {
    title: string,
    description: string,
    id: number,
    isPinned?: boolean,
}

const NotesListItem = ({ title, description, id, isPinned = false }: Props): ReactElement => {
    const dispatch = useDispatch()

    const [isEditNoteOpen, setIsEditNoteOpen] = useState<boolean>(false)

    const changeEditNoteOpen = (): void => {
        setIsEditNoteOpen(prev => !prev)
    }

    const deleteNote = (): void => {
        dispatch.notes.deleteNote(id)
    }

    const pinNote = (): void => {
        dispatch.notes.pinNote(id)
    }

    const unPinNote = (): void => {
        dispatch.notes.unPinNote(id)
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
                <IconButton color={!isPinned ? 'inherit' :  'primary'} onClick={!isPinned ? pinNote : unPinNote} className='NotesListItem-pin' aria-label="delete">
                    <BookmarkIcon fontSize="small" />
                </IconButton>
                <h3 className='NotesListItem-title'>{title}</h3>
                <div className='NotesListItem-description'>{description}</div>
            </Paper>
            <NoteModal initTitle={title} initDescription={description} id={id} isPinned={isPinned} isEditNote isOpen={isEditNoteOpen} handleClose={changeEditNoteOpen} />
        </div>
    );
}

export default NotesListItem;
