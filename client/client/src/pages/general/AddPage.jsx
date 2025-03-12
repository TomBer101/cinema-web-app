import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import FormFactory from '../../components/forms/FormFactory';

const AddPage = () => {
    const {type} = useParams()


    return (
        <div>
            <Typography variant='h3' fontSize={'2rem'} fontWeight={500}>{`Add ${type}`}</Typography>
            <FormFactory type={type}/>
        </div>
    );
};

export default AddPage;