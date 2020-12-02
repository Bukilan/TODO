import React, { ReactElement, ReactNode } from 'react';
import NotesListItem from "./NotesListItem";
import Button from "@material-ui/core/Button";
import './NotesList.scss';

type Props = {
    children: ReactNode,
    openAddModal: () => void;
}

const NotesList = ({ children, openAddModal }: Props): ReactElement => {
    return (
        <div className='NotesList-container'>
            <Button fullWidth className='NotesList-addNoteButton' variant="contained" color="primary" type='button' onClick={openAddModal}>
                Добавить заметку
            </Button>
            {children}
        </div>  
    );
}

NotesList.Item = NotesListItem
export default NotesList;
