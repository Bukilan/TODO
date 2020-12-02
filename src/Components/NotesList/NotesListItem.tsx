import React, { ReactElement, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import NoteModal from '../NoteModal';
import { useDispatch } from "react-redux";
import TagsCloudDisplay from "../TagsCloud/TagsCloudDisplay";
import { NoteType } from "../../Types/models/nodes";
import './NotesListItem.scss';

type Props = {
    currentNote: NoteType
}

const NotesListItem = ({ currentNote }: Props): ReactElement | null => {
    const {id, title, description, isPinned, noteTags} = currentNote

    const dispatch = useDispatch()

    const [isEditNoteOpen, setIsEditNoteOpen] = useState<boolean>(false)

    if (!title) return null

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
                {noteTags && noteTags.length ? (
                    <TagsCloudDisplay tags={noteTags} />
                ) : null}
            </Paper>
            <NoteModal initTitle={title} initDescription={description} id={id} isPinned={isPinned} initTags={noteTags} isEditNote isOpen={isEditNoteOpen} handleClose={changeEditNoteOpen} />
        </div>
    );
}

export default NotesListItem;
