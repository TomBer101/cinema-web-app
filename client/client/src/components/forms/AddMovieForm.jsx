import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {getMoviesName} from '../../services/moviesService'
import { FormInputSelect } from './forms-components/FormInputSelect';
import FormInputDate from './forms-components/FormInputDate';
import { addSubscription } from '../../services/subscriptionsService';
import { Button } from '@mui/material';

const AddMovieForm = ({memberId, movies}) => {
    const queryClient = useQueryClient()
    const { setValue, control, handleSubmit, reset, formState: {errors}, getValues} = useForm({
                defaultValues: {
                    id: '',
                    date: null
                },
    })

    const {data: moviesNames, error, status, isLoading} = useQuery({
        queryKey: ['moviesNames'],
        queryFn: async () =>  {
            let {moviesProjection: names} = await getMoviesName(1, {fields: 'name'})
            return names
        },
    })

    const addSubscriptionMutation = useMutation( 
        (data) => {
            return addSubscription(data)
        }, {
        onMutate: async (newSubscription) => {
            await queryClient.cancelQueries({queryKey: ['fetchData', 'subscriptions'], exact: false})

            const prevSubscriptions = queryClient.getQueriesData(['fetchData', 'subscriptions'], {exact: false})

            queryClient.setQueriesData({queryKey: ['fetchData', 'subscriptions'], exact: false}, (oldData) => {
                if (!oldData) return oldData;

                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        data: page.data.map(member => {
                            if (member.id === newSubscription.memberId) {
                                return {
                                    ...member,
                                    movies: [...member.movies, {movieId: newSubscription.movieId, name: newSubscription.name}]
                                }
                            } else {
                                return member
                            }
                        })
                    }))
                }
            })

            return {prevSubscriptions}
        },
        onError: (error, variables, context) => {
            queryClient.setQueriesData({queryKey: ['fetchData', 'subscriptions'], exact: false}, context.prevSubscriptions)
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['fetchData', 'subscriptions'], exact: false})
        },
        onSuccess: (data) => {
            console.log(data)
        }
    }

    )

    const onSubmitHandler = (data) => {
        console.log('Form data:', data);
        const reqBody = {
            memberId,
            subscription: data
        }
        console.log('Request body:', reqBody);
        addSubscriptionMutation.mutate(reqBody)
    }

    const relevantNames = useMemo(() => {
        if (movies?.length > 0) {
            const names = moviesNames?.filter(movie => !movies.includes(movie.id))
            return names
        } 
        return moviesNames
    }, [movies?.length, moviesNames])


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInputSelect control={control} name='id' label='Movie Name: ' options={relevantNames} />
            <br/>
            <FormInputDate control={control} name={'date'} />
            <Button color='success' variant='outlined' type="submit" style={{display: 'block'}}>
                Subscribe
            </Button>
        </form>
    );
};

export default AddMovieForm;