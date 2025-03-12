import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import { useDeleteMovie } from '../../hooks/useMoviesMutations';
import { useNavigate } from 'react-router-dom';
import { getMember } from '../../services/membersService';
import { formatDate } from '../../utils/formatting';
import { useAuth } from '../../contetxt/AuthContext';

const MovieItem = ({id, name, genres, image, premiered, members}) => {
    const {mutate: deleteMovie} = useDeleteMovie()
    const navigate = useNavigate()
    const {currentUser} = useAuth()

    const handleDelete = (e) => {
        e.preventDefault()
        deleteMovie({id, queryKey: ['fetchData', 'movies']})
    };

    const handleEditOnClick = () => {
        const state = {
            id, name, genres, image, premiered, members 
        }

        navigate('edit', {state})
    }

    const handleMemberClick = async (memberId) => {
        navigate('/subscriptions', {state: {id: memberId}})
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh', width: '100%'
        }}>
            <Typography variant='h4' sx={{fontSize: '1.8rem', fontWeight: 500}}>{`${name}, ${premiered}`}</Typography>
            <Typography display={'inline-flex'} gap={'1rem'} variant='p' component='div'>{genres?.map(g => 
                <p style={{
                    backgroundColor:  '#ECDFCC',padding: '5px', borderRadius: '5px',
                    }}
                key={g}>{g}</p>)}</Typography>
            <div>
                <img style={{height: '10rem'}} src={image} />
                <div>
                    Subscriptions: <br/>
                    <List style={{maxHeight: '8rem', overflowY: 'auto'}}>
                    {
                            
                            members?.map((sub, index) =>  (
                                <ListItem key={index} sx={{
                                    cursor: 'pointer',
                                    '&:hover' : {
                                        color: '#698474'
                                    }
                                    }}   onClick={() => handleMemberClick(sub.id)}>
                                    <ListItemIcon sx={{color: 'inherit'}}>
                                        <AccountCircleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${sub.name}, ${formatDate(sub.watchedDate)}`} />
                                </ListItem>)
                            )
                        }
                    </List>
                </div>
            </div>
            <div className="buttons" style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button disabled={!currentUser.permissions.includes('delete movies')} color='error' variant='contained' onClick={(e) => handleDelete(e)}>Delete</Button>
                <Button disabled={!currentUser.permissions.includes('update movies')} variant='contained' onClick={() => handleEditOnClick()}>Edit</Button> 
                {/* click on edit should navigate to the edit page and passing as state the current page as well */}
            </div>
        </Box>
    );
};

export default MovieItem;

