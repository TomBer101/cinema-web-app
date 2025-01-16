import { ListItem, List, Typography, TextField, Box } from '@mui/material';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { fetchMovies, getMovieById } from '../../services/moviesService';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { fetchUsers } from '../../services/usersService';
import ItemFactory from '../../components/listItems/ItemFactory';
import SearchBar from '../../components/common/SearchBar';

const MAX_ENTITIES_PER_PAGE  = 10
import { fetchSubscriptions } from '../../services/subscriptionsService';

const ViewPage = () => {
    const {type} = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const queryClient = useQueryClient()
    const location = useLocation()
    const { ref, inView } = useInView()
    const observer = useRef(null)
    const itemId = location.state?.id


    const fetchDataByType = async ({pageParam = 1}) => {
        switch (type) {
            case 'movies': 
                const res = await fetchMovies(pageParam , searchTerm)
                return res
            case 'users':
                return await fetchUsers(pageParam)
            case 'subscriptions': 
                return await fetchSubscriptions(pageParam)
            default:
                throw new Error(`Unknown type: ${type}`)
        }
    }

    const fetchById = async (id) => {
        switch (type) {
            case 'movies':
                return await getMovieById(id)
            default:
                throw new Error(`Unknown type: ${type}`)
        }
    }

    const getFromCache = (key) => {
        return queryClient.getQueryData(key);
    };

    const {data, error, status, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, page} = useInfiniteQuery({
        queryKey: ['fetchData', type],
        queryFn: fetchDataByType,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = lastPage.hasMore? pages.length + 1 : undefined;
            return nextPage
        },
        enabled: !itemId && !searchTerm ,
    })

    const {data: specificItem, isLoading: isLoadingItem} = useQuery(
        ['fetchById', type, itemId],
        () => fetchById(itemId),
        {
            enabled: !!itemId && !queryClient
            .getQueryData(['fetchData', type])
            ?.pages.flatMap((page) => page)
            .find((item) => item.id === itemId),
            cacheTime: 0,
            staleTime: 0
        }
    )

    const {data: searchResult, refetch: searchMovie} = useQuery({
        queryKey: ['search', type],
        queryFn: p => fetchDataByType(),
        enabled: !!searchTerm
    });

    useEffect(() => {
        if (inView && hasNextPage) {
          console.log('Fire!');
          fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const handleSearch = async (searchTerm) => {
        if (type !== 'movies') return;

        if (searchTerm === '' || searchTerm === undefined) {
            queryClient.setQueryData(['search', type], () => []); 
            return;
        }

        const cachedMovies = queryClient.getQueryData(['fetchData', type], {exact: false});
        const allMovies = cachedMovies.pages.reduce((acc, page) => { return acc.concat(page.data); }, []);
        const foundMovie = allMovies.filter((movie) => movie.name.toLowerCase().includes(searchTerm.toLowerCase()));

        if (foundMovie && foundMovie.length !== 0) {
            console.log('Movie found in cached data:', foundMovie);
            queryClient.setQueryData(['search', type], ()=> foundMovie)
            return
        }

        // Fetch the movie if not found
        const result = await searchMovie(searchTerm);
        console.log('Movie fetched from server:', result);

        // Add the result to the cached data
        queryClient.setQueryData(['fetchData', 'movies'], (oldData) => [
            ...(oldData || []),
            result,
        ]);
    }

    const items = useMemo(() => {
        if (itemId) {
            return specificItem? [specificItem] : []
        }

        const res = data?.pages.flatMap(page => page.data) || []
        return res
    }, [data, specificItem, itemId])
   

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div style={{padding: '0 3rem', position: 'relative'}}>
            <Typography variant='h3'>{`All ${type}`}</Typography>
            <SearchBar onClick={handleSearch}/>
            <Box sx={{display: !searchResult? 'none' : 'block'}}>
                <List sx={{width: '55%'}}>
                {
                    searchResult?.map((item, index) => {
                        return (
                            <ListItem key={index}>
                                <ItemFactory type={type} props={item} />
                            </ListItem>
                        )
                    })
                }
                </List>

            </Box>
            {(!searchResult || searchResult.length === 0) && <List sx={{
                width: '55%',
            }}>
                {
                   
                        items?.map((item, index) => {
                            if (items.length === index + 1) {
                                return (
                                <ListItem ref={ref} key={index}>
                                    <ItemFactory props={item} type={type}/>
                                </ListItem>
                                )
                            }
                            return (
                                <ListItem key={index}>
                                    <ItemFactory props={item} type={type}/>
                                </ListItem>
                            )
                        })
                    
                }
                {
                   hasNextPage && <div ref={observer} >Loading more...</div>
                }
            </List>}
        </div>
    );
};

export default ViewPage;