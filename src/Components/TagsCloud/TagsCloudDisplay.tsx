import React, { ReactElement } from 'react';
import './TagsCloudDisplay.scss';
import Chip from '@material-ui/core/Chip';
import { ArrayTagsType } from "../../Types/models/tag";

type Props = {
    tags: ArrayTagsType
}

const TagsCloudDisplay = ({ tags }: Props): ReactElement => {
    return (
        <div className='TagsCloudDisplay-container'>
            {tags.filter(item => item.isActive).map(item => (
                <div key={item.id} className='TagsCloudDisplay-item_container'>
                    <Chip color="primary" label={item.name} />
                </div>
            ))}
        </div>
    );
}

export default TagsCloudDisplay;
