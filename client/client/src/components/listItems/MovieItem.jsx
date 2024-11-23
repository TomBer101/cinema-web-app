import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDeleteMovie } from '../../hooks/useMoviesMutations';
import { useNavigate } from 'react-router-dom';

const MovieItem = ({id, name, generes, image, premiered, subscriptions}) => {
    const {mutate: deleteMovie} = useDeleteMovie()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        deleteMovie(id)
    };

    const handleEditOnClick = () => {
        const state = {
            id, name, generes, image, premiered, subscriptions 
        }

        navigate('edit', {state})
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh'
        }}>
            <Typography variant='h4'>{`${name}, ${premiered}`}</Typography>
            <Typography variant='p'>{generes?.map(g => <span kye={g}>{g}</span>)}</Typography>
            <div>
                <img style={{height: '10rem'}} src={image} />
                <div>
                    Subscriptions: <br/>
                    <ul style={{maxHeight: '8rem', overflowY: 'auto'}}>
                        {
                            subscriptions?.map((sub, index) =>  (
                                <li key={index}>
                                    <p>{`${sub.user}, ${sub.date}`}</p>
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="buttons" style={{display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={(e) => handleDelete(e)}>Delete</button>
                <button onClick={() => handleEditOnClick()}>Edit</button> 
                {/* click on edit should navigate to the edit page and passing as state the current page as well */}
            </div>
        </Box>
    );
};

export default MovieItem;

