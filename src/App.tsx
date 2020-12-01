import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {StateNotesType, RootStateType} from "./Types/models";
import NotesList from "./Components/NotesList/NotesList";
import './App.scss';
import NoteModal from "./Components/NoteModal";
import SearchField from "./Components/SearchField";
import TagsCloud from './Components/TagsCloud'

const App = () => {
    const [isAddNoteOpen, setIsAddNoteOpen] = useState<boolean>(false)

    const changeAddNoteOpen = (): void => {
        setIsAddNoteOpen(prev => !prev)
    }

    const dispatch = useDispatch();
    const { filteredNotesList, notesList, pinnedNotesList, notPinnedList }: StateNotesType = useSelector(({ notes }: RootStateType) => notes);

    useEffect(() => {
        dispatch.notes.load()
    }, [])

    console.log('notesList', notesList)
    console.log('filteredNotesList', filteredNotesList)
    console.log('pinnedNotesList', pinnedNotesList)
    console.log('notPinnedList', notPinnedList)

    return (
        <div className='PageLayout'>
            <SearchField />
            <TagsCloud />
            {filteredNotesList ? (
                <NotesList openAddModal={changeAddNoteOpen}>
                    {pinnedNotesList.map((item) => (
                        <NotesList.Item key={`pinned-${item.id}`} isPinned id={item.id} title={item.title} description={item.description} />
                    ))}
                    {[...filteredNotesList].map((item) => (
                        <NotesList.Item key={item.id} id={item.id} title={item.title} description={item.description} />
                    ))}
                </NotesList>
            ) : null}
            <NoteModal isOpen={isAddNoteOpen} handleClose={changeAddNoteOpen} />
        </div>
    );
}

export default App;
