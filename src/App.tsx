import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NotesStateType, RootStateType} from "./Types/models";
import NotesList from "./Components/NotesList/NotesList";
import './App.scss';
import NoteModal from "./Components/NoteModal";
import SearchField from "./Components/SearchField";

const App = () => {
    const [isAddNoteOpen, setIsAddNoteOpen] = useState<boolean>(false)

    const changeAddNoteOpen = (): void => {
        setIsAddNoteOpen(prev => !prev)
    }

    const dispatch = useDispatch();
    const { filteredNotesList, notesList }: NotesStateType = useSelector(({ notes }: RootStateType) => notes);

    useEffect(() => {
        dispatch.notes.load()
    }, [])

    // console.log(notesList, filteredNotesList)

    return (
        <div className='PageLayout'>
            <SearchField />
            {filteredNotesList ? (
                <NotesList openAddModal={changeAddNoteOpen}>
                    {filteredNotesList.map((item) => (
                        <NotesList.Item key={item.id} id={item.id} title={item.title} description={item.description} />
                    ))}
                </NotesList>
            ) : null}
            <NoteModal isOpen={isAddNoteOpen} handleClose={changeAddNoteOpen} />
        </div>
    );
}

export default App;
