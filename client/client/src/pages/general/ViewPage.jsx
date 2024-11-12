import { ListItem, List, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovies } from '../../services/moviesService';
import { useQuery } from 'react-query';
import { fetchUsers } from '../../services/usersService';
import ItemFactory from '../../components/listItems/ItemFactory';

const ViewPage = () => {
    const {type} = useParams()
    const [page, setPage] = useState(1)

    const fetchDataByType = async () => {
        switch (type) {
            case 'movies': 
                return await fetchMovies(page)
            case 'users':
                return await fetchUsers(page)
            default:
                throw new Error(`Unknown type: ${type}`)
        }
    }

    const {data, error, isLoading} = useQuery({
        queryKey: ['fetchData', type, page], 
        queryFn: fetchDataByType,
        enabled: !!type
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div>
            <Typography variant='h3'>{`All ${type}`}</Typography>
            <List>
                {
                    data?.map((entity, index) => 
                    <ListItem key={index}>
                        {<ItemFactory type={type} props={entity} />}
                    </ListItem>)
                }
            </List>
        </div>
    );
};

export default ViewPage;