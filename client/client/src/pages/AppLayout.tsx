import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink, Outlet} from 'react-router-dom'

import { useAuth } from '../contetxt/AuthContext';

const AppLayout = () => {
    const {currentUser} = useAuth()

    
    return (
        <div>
            <Typography sx={{backgroundColor: 'aliceblue',fontSize: '3.5rem', fontWeight: 400, padding: '2rem', textAlign: 'center'}} variant='h1'>Movies - Subscriptions Web Site</Typography>
            <Stack direction='row' sx={{backgroundColor: '#b0cce5',padding: '1rem 2rem', justifyContent: 'space-around'}}>
                <NavLink to='/movies'>Movies</NavLink>
                <NavLink to='/subscriptions'>Subscription</NavLink>
                { currentUser.admin &&
                    <NavLink to='/users'>Users Managment</NavLink>
                }
                <Button>Logout</Button>
            </Stack>

            <Outlet />
        </div>
    );
};

export default AppLayout;