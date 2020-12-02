import React, { ReactElement, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import './SearchField.scss';

type Props = {
    searchQuery: string
    onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField = ({ searchQuery, onQueryChange }: Props): ReactElement => {
    return (
        <div className='SearchField-container'>
            <SearchIcon color='inherit' className='SearchField-icon' />
            <TextField label="Поиск" placeholder="Найти заметку" value={searchQuery} onChange={onQueryChange} className='SearchField' id="standard-search" type="search" />
        </div>
    );
}

export default SearchField;
