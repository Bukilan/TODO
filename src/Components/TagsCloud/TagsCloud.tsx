import React, {ReactElement, useEffect, useState, ChangeEvent} from 'react';
import './TagsCloud.scss';
import TagsCloudItem from "./TagsCloudItem";
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import { StateTagsType } from "../../Types/models/tag";
import { RootStateType } from "../../Types/models/root";
import IconButton from "@material-ui/core/IconButton";

const TagsCloud = (): ReactElement => {
    const dispatch = useDispatch();
    const { tagsList }: StateTagsType = useSelector(({ tags }: RootStateType) => tags);

    const [newAddName, setNewAddName] = useState<string>('')

    useEffect(() => {
        dispatch.tags.load()
    }, [])

    const handleTagClick = (id: number): () => void => (): void => {
        dispatch.tags.changeStatus(id)
    }

    const handleDeleteClick = (id: number): () => void => (): void => {
        dispatch.tags.deleteTag(id)
        dispatch.notes.deleteTagFromNotes(id)
    }

    const handleAddChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAddName(e.target.value)
    }

    const handleAddSubmit = () => {
        if (newAddName) {
            dispatch.tags.addTag(newAddName)
            dispatch.notes.addTagToNotes(newAddName)
            setNewAddName('')
        }
    }

    return (
        <Grid container justify='center'>
            <Grid className='TagsCloud-container' item lg={4} sm={8} xs={10}>
                {tagsList.map(item => (
                    <TagsCloudItem key={item.id} name={item.name} id={item.id} isActive={item.isActive} onElemClick={handleTagClick} onDeleteClick={handleDeleteClick} />
                ))}
                <div className='TagsCloud-add_container'>
                    <TextField value={newAddName} onChange={handleAddChange} className='TagsCloud-add' id="standard-search" label="Добавить тэг" type="search" />
                    <IconButton color='primary' onClick={handleAddSubmit} className='TagsCloud-add_button' aria-label="delete">
                        <AddBoxIcon fontSize='large' />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    );
}

export default TagsCloud;
