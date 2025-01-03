import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom'

import { useAuth } from '../contetxt/AuthContext';
import styles from '../styles/navbar.module.css'

const AppLayout = () => {
    const { currentUser } = useAuth()
    const { type } = useParams()

    return (
        <div>
            <Typography
                sx={{
                    fontSize: '3rem',
                    fontWeight: 400,
                    padding: '1rem',
                    textAlign: 'center'
                }}
                variant='h1' fontFamily='cursive'
            >Movies - Subscriptions Web Site</Typography>

            <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
                <Stack direction='row' spacing={1}
                    sx={{
                        backgroundColor: '#ECDFCC',
                        padding: '1rem 2rem',
                        justifyContent: 'space-around',
                        alignItems: 'center', textAlign: 'center'
                    }}
                >
                    <NavLink className={styles.navLink} style={({ isActive }) => ({
                        border: '2px solid #626F47',
                        backgroundColor: isActive ? '#A5B68D' : 'transparent',
                        color: isActive ? 'white' : 'black',
                        boxShadow: '0 0.7em 1.5em -0.5em #626F47'

                    })}
                        to='/movies'
                    >
                        Movies
                    </NavLink>
                    <NavLink className={styles.navLink} style={({ isActive }) => ({
                        border: '2px solid #626F47',
                        backgroundColor: isActive ? '#A5B68D' : 'transparent',
                        color: isActive ? 'white' : 'black',
                        boxShadow: '0 0.7em 1.5em -0.5em #626F47',
                    })} to='/subscriptions'>Subscription</NavLink>
                    {currentUser.admin &&
                        <NavLink className={styles.navLink} style={({ isActive }) => ({
                            border: '2px solid #626F47',
                            backgroundColor: isActive ? '#A5B68D' : 'transparent',
                            color: isActive ? 'white' : 'black',
                            boxShadow: '0 0.7em 1.5em -0.5em #626F47'
                            })} 
                            to='/users'
                        >Users Managment
                        </NavLink>
                    }
                    <Button color='error' variant='outlined'>Logout</Button>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ marginBottom: 2, backgroundColor: ' #FAF6E3', p: '1rem 2rem', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '2.3rem', fontWeight: '500', flex: 1 }} variant='h2'>{type}</Typography>
                    <Stack sx={{ padding: '0 3rem', gap: '5%', flex: 1, alignItems: 'center' }} direction='row'>
                        <NavLink  className={styles.navLink}
                            style={({ isActive }) => ({
                            border: '2px solid #626F47',
                            backgroundColor: isActive ? '#A5B68D' : 'transparent',
                            color: isActive ? 'white' : 'black',
                            boxShadow: '0 0.7em 1.5em -0.5em #626F47'
                            })} 
                            to=''
                            end
                        >{`All ${type}`}
                        </NavLink>
                        <NavLink className={styles.navLink}
                            style={({ isActive }) => ({
                            border: '2px solid #626F47',
                            backgroundColor: isActive ? '#A5B68D' : 'transparent',
                            color: isActive ? 'white' : 'black',
                            boxShadow: '0 0.7em 1.5em -0.5em #626F47'
                            })} 
                            to='add'
                            end
                        >{`Add ${type}`}</NavLink>
                    </Stack>
                </Stack>
            </div>


            <Outlet />
        </div>
    );
};

export default AppLayout;