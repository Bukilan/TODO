import React, {ReactElement, ChangeEvent} from 'react';
import './TagsCloud.scss';
import TagsCloudItem from "./TagsCloudItem";
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Grid from "@material-ui/core/Grid";
import {ArrayTagsType, StateTagsType} from "../../Types/models/tag";
import IconButton from "@material-ui/core/IconButton";

type Props = {
    tagsList: ArrayTagsType,
    newAddName: string,
    onAddNameSubmit: () => void,
    onAddNameChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onTagDelete: (id: number) => () => void,
    onTagClick: (id: number) => () => void,
}

const TagsCloud = ({ tagsList, newAddName, onAddNameSubmit, onAddNameChange, onTagClick, onTagDelete }: Props): ReactElement => {

    return (
        <Grid container justify='center'>
            <Grid className='TagsCloud-container' item lg={4} sm={8} xs={10}>
                {tagsList.map(item => (
                    <TagsCloudItem key={item.id} name={item.name} id={item.id} isActive={item.isActive} onElemClick={onTagClick} onDeleteClick={onTagDelete} />
                ))}
                <div className='TagsCloud-add_container'>
                    <TextField value={newAddName} onChange={onAddNameChange} className='TagsCloud-add' id="standard-search" label="Добавить тэг" type="search" />
                    <IconButton color='primary' onClick={onAddNameSubmit} className='TagsCloud-add_button' aria-label="delete">
                        <AddBoxIcon fontSize='large' />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    );
}

export default TagsCloud;
