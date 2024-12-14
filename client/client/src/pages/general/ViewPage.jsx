import { ListItem, List, Typography, TextField, Box } from '@mui/material';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { fetchMovies } from '../../services/moviesService';
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
    const { ref, inView } = useInView()
    const observer = useRef(null)

    const fetchDataByType = async ({pageParam }) => {
        switch (type) {
            case 'movies': 
                return await fetchMovies(pageParam , searchTerm)
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

    const {data, error, status, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, page} = useInfiniteQuery({
        queryKey: ['fetchData', type],
        queryFn: fetchDataByType,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = lastPage.length? pages.length + 1 : undefined;
            return nextPage
        },
    })

    // const content = data?.pages.map((items) => {
    //     items.map((item, index) => {
    //         if (items.length === index + 1) {
    //             return (<ListItem ref={ref} key={index}>
    //                 <ItemFactory props={item} type={type}/>
    //             </ListItem>)
    //         }
    //         return (<ListItem key={index}>
    //         <ItemFactory props={item} type={type}/>
    //     </ListItem>)
    //     })
    // })

    useEffect(() => {
        if (inView && hasNextPage) {
          console.log('Fire!');
          fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);
    const items = data? data.pages.flatMap(page => page) : []
   

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
            </List>
        </div>
    );
};

export default ViewPage;