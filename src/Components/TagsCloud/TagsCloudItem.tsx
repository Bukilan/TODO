import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import './TagsCloudItem.scss';

type Props = {
    name: string,
    isActive: boolean,
    id: number,
    onElemClick: (id: number) => () => void,
    onDeleteClick?: (id: number) => () => void
}

const TagsCloudItem = ({ name, isActive, onElemClick, onDeleteClick, id }: Props): ReactElement | null => {
    if (!name) return null
    return (
        <div className='TagsCloudItem-container'>
            <Button className='TagsCloudItem-button' onClick={onElemClick(id)} variant={!isActive ? 'outlined' : 'contained'} color={!isActive ? 'inherit' : 'primary'} size='small'>
                {name}
            </Button>
            {onDeleteClick ? (
                <IconButton color='secondary' onClick={onDeleteClick(id)} className='TagsCloudItem-delete' aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            ) : null}
        </div>
    );
}

export default TagsCloudItem;
