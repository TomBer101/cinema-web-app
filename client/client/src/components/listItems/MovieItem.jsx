import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import { useDeleteMovie } from '../../hooks/useMoviesMutations';
import { useNavigate } from 'react-router-dom';
import { getMember } from '../../services/membersService';
import { formatDate } from '../../utils/formatting';

const MovieItem = ({id, name, generes, image, premiered, members}) => {
    const {mutate: deleteMovie} = useDeleteMovie()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        deleteMovie(id)
    };

    const handleEditOnClick = () => {
        const state = {
            id, name, generes, image, premiered, members 
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
            gap: '1vh'
        }}>
            <Typography variant='h4' sx={{fontSize: '1.8rem', fontWeight: 500}}>{`${name}, ${premiered}`}</Typography>
            <Typography variant='p'>{generes?.map(g => <span kye={g}>{g}</span>)}</Typography>
            <div>
                <img style={{height: '10rem'}} src={image} />
                <div>
                    Subscriptions: <br/>
                    <List style={{maxHeight: '8rem', overflowY: 'auto'}}>
                    {
                            
                            members?.map((sub, index) =>  (
                                <ListItem sx={{
                                    cursor: 'pointer',
                                    '&:hover' : {
                                        color: '#698474'
                                    }
                                }}  key={index} onClick={() => handleMemberClick(sub.id)}>
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
                <Button color='error' variant='contained' onClick={(e) => handleDelete(e)}>Delete</Button>
                <Button variant='contained' onClick={() => handleEditOnClick()}>Edit</Button> 
                {/* click on edit should navigate to the edit page and passing as state the current page as well */}
            </div>
        </Box>
    );
};

export default MovieItem;

