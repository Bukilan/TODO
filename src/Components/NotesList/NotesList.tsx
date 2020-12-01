import React, {ReactElement, ReactNode} from 'react';
import Grid from '@material-ui/core/Grid';
import NotesListItem from "./NotesListItem";
import './NotesList.scss';
import Button from "@material-ui/core/Button";

type Props = {
    children: ReactNode,
    openAddModal: () => void;
}

const NotesList = ({ children, openAddModal }: Props): ReactElement => {
    return (
        <div className='NotesList-container'>
            <Grid container justify='center'>
                <Grid item lg={4} sm={8} xs={10}>
                    <Button fullWidth className='NotesList-addNoteButton' variant="contained" color="primary" type='button' onClick={openAddModal}>
                        Добавить заметку
                    </Button>
                    {children}
                </Grid>
            </Grid>
        </div>  
    );
}

NotesList.Item = NotesListItem
export default NotesList;
