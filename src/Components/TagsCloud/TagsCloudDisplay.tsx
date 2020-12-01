import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import './TagsCloudDisplay.scss';
import Chip from '@material-ui/core/Chip';
import {ArrayTagsType} from "../../Types/models/tag";

type Props = {
    tags: ArrayTagsType
}

const TagsCloudDisplay = ({ tags }: Props): ReactElement => {
    return (
        <div className='TagsCloudDisplay-container'>
            {tags.map(item => (
                <div className='TagsCloudDisplay-item_container'>
                    <Chip color="primary" label={item.name} />
                </div>
            ))}
        </div>
    );
}

export default TagsCloudDisplay;
