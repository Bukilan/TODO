import React, { ReactElement, ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './SearchField.scss';
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import {useDispatch} from "react-redux";

const SearchField = (): ReactElement => {
    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState<string>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        dispatch.notes.searchNotes(e.target.value)
    }

    return (
        <Grid container justify='center'>
            <Grid className='SearchField-container' item lg={4} sm={8} xs={10}>
                <SearchIcon color='inherit' className='SearchField-icon' />
                <TextField value={searchQuery} onChange={handleChange} className='SearchField' id="standard-search" label="Search field" type="search" />
            </Grid>
        </Grid>
    );
}

export default SearchField;
