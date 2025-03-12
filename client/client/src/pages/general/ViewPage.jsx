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
import { getMember } from '../../services/membersService';
import TiltCard from '../../components/animated/TiltCard';

const ViewPage = () => {
    const {type} = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const queryClient = useQueryClient()
    const location = useLocation()
    const { ref, inView } = useInView()
    const observer = useRef(null)
    const itemId = location.state?.id



    const fetchDataByType = async ({pageParam = 1}, searchTerm) => {
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
            case 'subscriptions':
                return await getMember(id)
            default:
                throw new Error(`Unknown type: ${type}`)
        }
    }

    const getFromCache = (key) => {
        return queryClient.getQueryData(key);
    };

    const handleSearchQuery = (term) => {
        setSearchTerm(term)
        if (term === '') {
            setTimeout(() => setSearchTerm(''), 500)
        }
    }

    const {data, error, status, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, page} = useInfiniteQuery({
        queryKey: ['fetchData', type],
        queryFn: fetchDataByType,
        //initialData: {pageParams: [1], pages: [] },
        getNextPageParam: (lastPage, pages) => {
            const nextPage = lastPage?.hasMore? pages.length + 1 : undefined;
            return nextPage
        },
        enabled: !itemId && !searchTerm ,
    })

    useEffect(() => {
        console.log("Data has changed");
        
    }, [data, data?.pages])

    const {data: specificItem, isLoading: isLoadingItem} = useQuery(
        ['fetchById', type, itemId],
        () => fetchById(itemId),
        {
            enabled: !!itemId && !queryClient
            .getQueryData(['fetchData', type])
            ?.pages?.flatMap((page) => page)
            .find((item) => item.id === itemId),
            cacheTime: 0,
            staleTime: 0
        }
    )

    const {data: searchResult, refetch: searchMovie} = useQuery({
        queryKey: ['search', type, searchTerm],
        queryFn: () => fetchDataByType({ pageParam: 1 }, searchTerm),
        enabled: !!searchTerm
    });

    useEffect(() => {
        if (searchResult) {
            console.log('Search result: ', searchResult)
        }
    }, [searchResult])

    useEffect(() => {
        if (inView && hasNextPage) {
          console.log('Fire!');
          fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    // const handleSearch = async (searchTerm) => {
    //     if (type !== 'movies') return;

    //     if (searchTerm === '' || searchTerm === undefined) {
    //         queryClient.setQueryData(['search', type], () => []); 
    //         return;
    //     }

    //     const cachedMovies = queryClient.getQueryData(['fetchData', type], {exact: false});
    //     const allMovies = cachedMovies.pages.reduce((acc, page) => { return acc.concat(page.data); }, []);
    //     const foundMovie = allMovies.filter((movie) => movie.name.toLowerCase().includes(searchTerm.toLowerCase()));

    //     if (foundMovie && foundMovie.length !== 0) {
    //         console.log('Movie found in cached data:', foundMovie);
    //         queryClient.setQueryData(['search', type], ()=> foundMovie)
    //         return
    //     }

    //     // Fetch the movie if not found
    //     const result = await searchMovie(searchTerm);
    //     console.log('Movie fetched from server:', result);

    //     // Add the result to the cached data
    //     // queryClient.setQueryData(['fetchData', 'movies'], (oldData) => [
    //     //     ...(oldData.pages || []),
    //     //     result,
    //     // ]);
    // }



    const items = useMemo(() => {
        if (itemId) {
            return specificItem? [specificItem] : []
        }

        const res = data?.pages.flatMap(page => page.data) || []
        return res
    }, [data, specificItem, itemId, data?.length])
   

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error : {error.message}</p>

    return (
        <div style={{padding: '0 3rem', position: 'relative'}}>
            <Typography variant='h3' fontSize={'2rem'} fontWeight={500}>{`All ${type}`}</Typography>
            <SearchBar onClick={handleSearchQuery}/>
            <Box sx={{display: !searchResult? 'none' : 'block'}}>
                <List sx={{width: '55%'}}>
                {
                    searchResult?.data.map((item, index) => {
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
                   !specificItem && hasNextPage && <div ref={observer} >Loading more...</div>
                }
            </List>}
        </div>
    );
};

export default ViewPage;