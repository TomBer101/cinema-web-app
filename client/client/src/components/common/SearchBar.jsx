import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SearchBar = ({onClick}) => { //onClick should be a callback to inform the wrapping component that a term was set
    const [val, setVal] = useState('')
    const{type} = useParams()

    const handleKeyPress = (event) => {
        const key = event.key
        if (key === 'Enter') {
            onClick(val)
        } else if ((key === "Backspace" || key === "Delete") && val.length === 1) {
            onClick()
        }
    }

    return (
        <TextField 
        sx={{display: type !== 'movies'? 'none' : '',
            position: {md: 'absolute'},
            top: {md: '1rem'},
            right: {md: '2rem'},
        }}
        label="Search"
        size='small'
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown ={handleKeyPress}
        slotProps={{
            input: {
                
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon onClick={() => onClick(val)}/>
                    </InputAdornment >
                )
            }
        }}
/>
    );
};

export default SearchBar;