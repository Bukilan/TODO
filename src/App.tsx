import React, {ChangeEvent, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateNotesType, RootStateType } from "./Types/models";
import NotesList from "./Components/NotesList/NotesList";
import NoteModal from "./Components/NoteModal";
import SearchField from "./Components/SearchField";
import TagsCloud from './Components/TagsCloud'
import { StateTagsType } from "./Types/models/tag";
import { changeTagStatus } from "./helpers/utils";
import Grid from "@material-ui/core/Grid";
import './App.scss';

const App = () => {
    const dispatch = useDispatch()
    const { filteredNotesList, pinnedNotesList }: StateNotesType = useSelector(({ notes }: RootStateType) => notes);

    const { tagsList }: StateTagsType = useSelector(({ tags }: RootStateType) => tags);

    const [newAddName, setNewAddName] = useState<string>('')

    const [isAddNoteOpen, setIsAddNoteOpen] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        dispatch.notes.filterNotes({
            activeTags:  tagsList.filter(item => item.isActive),
            searchQuery: e.target.value
        })
    }

    const changeAddNoteOpen = (): void => {
        setIsAddNoteOpen(prev => !prev)
    }

    const handleTagClick = (id: number): () => void => (): void => {
        dispatch.tags.changeStatus(id)
        const currentTag = tagsList.find(item => item.id === id)
        if (!currentTag) return
        dispatch.notes.filterNotes({
            activeTags:  changeTagStatus(tagsList, id).filter(item => item.isActive),
            searchQuery: searchQuery
        })
    }

    const handleTagDeleteClick = (id: number): () => void => (): void => {
        dispatch.tags.deleteTag(id)
        dispatch.notes.deleteTagFromNotes(id)
        dispatch.notes.filterNotes({
            activeTags:  tagsList.filter(item => item.isActive),
            searchQuery: searchQuery
        })
    }

    const handleAddTagChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAddName(e.target.value)
    }

    const handleAddTagSubmit = () => {
        if (newAddName) {
            dispatch.tags.addTag(newAddName.toUpperCase())
            dispatch.notes.addTagToNotes(newAddName)
            setNewAddName('')
        }
    }

    useEffect(() => {
        dispatch.notes.load()
        dispatch.tags.load()
    }, [dispatch])

    return (
        <div className='PageLayout'>
            <Grid container justify='center'>
                <Grid item lg={4} sm={8} xs={10}>
                    <SearchField searchQuery={searchQuery} onQueryChange={handleQueryChange} />
                    <TagsCloud tagsList={tagsList} newAddName={newAddName} onAddNameChange={handleAddTagChangeName} onAddNameSubmit={handleAddTagSubmit} onTagClick={handleTagClick} onTagDelete={handleTagDeleteClick} />
                    {filteredNotesList.length ? (
                        <NotesList openAddModal={changeAddNoteOpen}>
                            {pinnedNotesList.map((item) => (
                                <NotesList.Item key={`pinned-${item.id}`} currentNote={item} />
                            ))}
                            {filteredNotesList.map((item) => (
                                <NotesList.Item key={item.id}  currentNote={item} />
                            ))}
                        </NotesList>
                    ) : (
                        <div className='PageLayout-empty'>
                            Похоже у вас нет заметок ) Попробуйте добавить новую
                        </div>
                    )}
                </Grid>
            </Grid>
            <NoteModal isOpen={isAddNoteOpen} handleClose={changeAddNoteOpen} />
        </div>
    );
}

export default App;
