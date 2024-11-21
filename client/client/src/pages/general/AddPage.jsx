import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

const AddPage = () => {
    const {type} = useParams()


    return (
        <div>
            <Typography variant='h3'>{`Add ${type}`}</Typography>
        </div>
    );
};

export default AddPage;