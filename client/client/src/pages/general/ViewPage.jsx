import { ListItem, List, Typography, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';


import { fetchMovies } from '../../services/moviesService';
import { fetchUsers } from '../../services/usersService';
import ItemFactory from '../../components/listItems/ItemFactory';
import SearchBar from '../../components/common/SearchBar';
import { fetchSubscriptions } from '../../services/subscriptionsService';

const ViewPage = () => {
    const {type} = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)

    const fetchDataByType = async (searchTerm) => {
        switch (type) {
            case 'movies': 
                return await fetchMovies(page, searchTerm)
            case 'users':
                return await fetchUsers(page)
            case 'subscriptions': 
                return await fetchSubscriptions(page)
            default:
                throw new Error(`Unknown type: ${type}`)
        }
    }

    const getFromCache = (key) => {
        return queryClient.getQueryData(key);
    };

    const {data, error, isLoading, status} = useQuery({
        queryKey: ['fetchData', type, page], 
        queryFn: async () => {
            const cache = getFromCache(['fetchData', type, page])
            if (cache) return cache

            return fetchDataByType()
        },
        enabled: !!type,
        keepPreviousData: true,
    })

    const {data: searchResult, refetch: searchMovie} = useQuery({
        queryKey: ['search', type],
        queryFn: ({meta}) => fetchDataByType(meta.searchTerm),
        enabled: !!searchTerm
    });

    const handleSearch = async (searchTerm) => {
        if (type !== 'movies' || !searchTerm.trim()) return;

        const cachedMovies = queryClient.getQueryData(['fetchData', type], {exact: false});
        const allFetchedMovies = cachedMovies?.flat() || []
        const foundMovie = allFetchedMovies.find((movie) => movie.name.toLowerCase() === searchTerm.toLowerCase());

        if (foundMovie) {
            console.log('Movie found in cached data:', foundMovie);
            queryClient.setQueryData(['search', type], ()=> foundMovie)
            return
        }

        // Fetch the movie if not found
        const result = await searchMovie({meta: {searchTerm}});
        console.log('Movie fetched from server:', result);

        // Add the result to the cached data
        queryClient.setQueryData(['fetchData', 'movies'], (oldData) => [
            ...(oldData || []),
            result,
        ]);
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div style={{padding: '0 3rem', position: 'relative'}}>
            <Typography variant='h3'>{`All ${type}`}</Typography>
            <SearchBar onClick={handleSearch}/>
            <Box sx={{display: !searchResult? 'none' : 'block'}}>
                {<ItemFactory type={type} props={searchResult} />}
            </Box>
            <List>
                {   !searchResult && 
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