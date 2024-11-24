import { Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink, Outlet, useParams} from 'react-router-dom'

import { useAuth } from '../../contetxt/AuthContext';

// TODO: 
// 1. Add access to links based on currentUser permissions.

const PageLayout = () => {
    const {currentUser} = useAuth()
    const {type, functionality} = useParams()

    return (
        <div>
            <Typography sx={{fontSize: '2.5rem', fontWeight: 'normal', backgroundColor:' #b9e6eb99', padding: '0.5rem 3rem'}} variant='h2'>{type}</Typography>
            <Stack sx={{padding: '0 3rem', gap: '5%'}} direction='row'>
                <NavLink  to=''>{`All ${type}`}</NavLink>
                <NavLink to='add'>{`Add ${type}`}</NavLink>
            </Stack>
            
            <Outlet />
        </div>
    );
};

export default PageLayout;