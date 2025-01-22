import React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

import { useDeleteMember } from '../../hooks/useMembersMutations';
import { useNavigate } from 'react-router-dom';
import AddMovieForm from '../forms/AddMovieForm';
import {formatDate} from '../../utils/formatting'

const SubscriptionItem = ({id, name, email, city, movies}) => {
    const {mutate: deleteMember} = useDeleteMember()
    const navigate = useNavigate()

    const handleDelete = (event) => {
        event.preventDefault()
        deleteMember(id)
    }

    const handleEditOnClick = () => {
        const state = {
            id, name, email, city,
        }

        navigate('edit', {state : state})
    }

    const handleMovieClick = async (movieId) => {
        navigate('/movies', {state: {id: movieId}})
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh'
        }}>
            <Typography fontSize='1.5rem' fontWeight='500' variant='h3'>{name}</Typography>
            <Typography variant='body1'>{`Email: ${email}`}</Typography>
            <Typography variant='body1'>{`City: ${city}`}</Typography>
            <div className="buttons" style={{display: 'flex', justifyContent: 'space-between', margin: '1rem 0'}}>
                <Button color='error' variant='contained' onClick={(e) => handleDelete(e)}>Delete</Button>
                <Button variant='contained' onClick={() => handleEditOnClick()}>Edit</Button> 
                {/* click on edit should navigate to the edit page and passing as state the current page as well */}
            </div>

            <Typography variant='h6'>Movies Watched</Typography>
            <AddMovieForm memberId={id} movies={movies?.map(movie => movie.id)}/>
            <List sx={{maxHeight: '8rem', overflowY: 'auto'}}>
                {
                    movies?.map((movie, index) => {
                        return (
                            <ListItem
                                sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#9A86A4'
                                    }
                                }} key={index} onClick={() => handleMovieClick(movie.id)}>
                                    <ListItemIcon sx={{color: 'inherit'}}>
                                        <LocalMoviesIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={`${movie.name}, ${formatDate(movie.watchDate)}`} />
                            </ListItem>
                        )
                    })
                }
            </List>
        </Box>
    );
};

export default SubscriptionItem;