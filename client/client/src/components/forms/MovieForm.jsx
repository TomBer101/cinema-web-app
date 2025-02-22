import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { addMovie } from '../../services/moviesService';
import { FormInputText } from './forms-components/FormInputText';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditMovie } from '../../hooks/useMoviesMutations';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/actions/modalActions';

const MovieForm = (props) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {setValue, control, handleSubmit, reset, formState: {errors}, getValues} = useForm({
        defaultValues: {
            name: props.name || '',
            genres: props.genres || '',
            imageUrl: props.image || '',
            premiered: props.premiered || '',
        },
    });
    const queryClient = useQueryClient();
    const {data: updatRes, mutate: editMovieMutation, isSuccess} = useEditMovie()

    


    const addMovieMotation = useMutation({
        mutationFn: (data) => {
            return addMovie(data)
        }, 
        onSuccess: (newMovie) => {
            dispatch(showModal({title: 'Success', message: 'Added successful!'}))
            queryClient.setQueriesData(
                { queryKey: ['fetchData', 'movies'], exact: false },
                (oldData) => {
                    if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                        // Initialize with the new user in the first page
                        return { ...oldData, pages: [{data: newMovie.data.newMoviw, hasMore: true}] };
                    }

                    const updatedFirstPage = [newMovie.data.newMoviw, ...oldData.pages[0].data];
                    const {data: firstPageData, hasMore} = oldData.pages[0]
                    return { ...oldData, pages: [{data: updatedFirstPage, hasMore: hasMore}, ...oldData.pages.slice(0, 1)] };
    
                }
            );
        },
        onError: (error) => {
            dispatch(showModal({title: 'Error', message:`Failed to add item:: ${error.response.data.message}` }))

        }

    })



    const onSubmitHandler = (data) => {
        console.log('Form Submitted: ', data)

        data.genres = data.genres.replace(' ', '').split(',')

        if (props.id) {
            const updateRes = editMovieMutation({...data, id: props.id})            
        } else {
            addMovieMotation.mutate(data)
        }
    }



    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInputText control={control} label={"Name"} name={'name'} />
            <FormInputText 
                control={control} 
                label={"Genres"} 
                name={'genres'} 
                rules={{pattern: {
                    value: /^[a-zA-Z]+(?:,\s*[a-zA-Z]+)*$/,
                    message: "Must be a comma-separated list of words (e.g., drama, comedy, si-fi)"
                } }}
            />
            <FormInputText control={control} label={"Image URL"} name={'imageUrl'} />
            <FormInputText control={control} label={"Premiered"} name={'premiered'} />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Button color='success' variant='contained' type='submit'>{props.id? 'Update' : 'Add'}</Button>
            <Button color='error' variant='outlined' onClick={() => navigate(-1)}>Cancel</Button>
            </div>
            
        </form>
    );
};

export default MovieForm;