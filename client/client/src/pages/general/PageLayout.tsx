import { Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink, Outlet, useParams} from 'react-router-dom'

// import { useAuth } from '../../contetxt/AuthContext';

// TODO: 
// 1. Add access to links based on currentUser permissions.

const PageLayout = () => {
    // const {currentUser} = useAuth()
    const {type} = useParams()

    return (
        <div>
            <Stack direction="row" spacing={2} sx={{marginBottom: 2, backgroundColor:' #b9e6eb99', p:'1rem 2rem', alignItems: 'center'}}>
            <Typography sx={{fontSize: '2.3rem', fontWeight: '500',  flex: 1}} variant='h2'>{type}</Typography>
            <Stack sx={{padding: '0 3rem', gap: '5%', flex: 1, alignItems: 'center'}} direction='row'>
                <NavLink  to=''>{`All ${type}`}</NavLink>
                <NavLink to='add'>{`Add ${type}`}</NavLink>
            </Stack>
            </Stack>
            <Outlet />
        </div>
    );
};

export default PageLayout;