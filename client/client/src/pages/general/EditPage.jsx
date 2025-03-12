import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import FormFactory from '../../components/forms/FormFactory';


const EditPage = () => { 
    const {type} = useParams()
    const location = useLocation()

    useEffect(() => {
        console.log("Edit state: ", location.state);
    }, [location])

    return (
        <div>
            <Typography variant='h3' fontSize={'2rem'} fontWeight={500}>{`Edit ${type}: ${location.state.name}`}</Typography>
            <FormFactory type={type} props={location.state} />
        </div>
    );
};

export default EditPage;