import React, { ReactElement, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import './SearchField.scss';
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";

type Props = {
    searchQuery: string
    onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField = ({ searchQuery, onQueryChange }: Props): ReactElement => {

    return (
        <Grid container justify='center'>
            <Grid className='SearchField-container' item lg={4} sm={8} xs={10}>
                <SearchIcon color='inherit' className='SearchField-icon' />
                <TextField label="Поиск" placeholder="Найти заметку" value={searchQuery} onChange={onQueryChange} className='SearchField' id="standard-search" type="search" />
            </Grid>
        </Grid>
    );
}

export default SearchField;
