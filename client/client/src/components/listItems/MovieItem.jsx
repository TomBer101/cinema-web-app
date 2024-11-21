import { Box, Typography } from '@mui/material';
import React from 'react';

const MovieItem = ({id, name, generes, image, premiered, subscriptions}) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh'
        }}>
            <Typography variant='h4'>{`${name}, ${premiered}`}</Typography>
            <Typography variant='p'>{generes}</Typography>
            <div>
                <img src={image} />
                <div>
                    Subscriptions: <br/>
                    <ul>
                        {
                            subscriptions.map((sub, index) => {
                                <li key={index}>
                                    {sub}
                                </li>
                            })
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

