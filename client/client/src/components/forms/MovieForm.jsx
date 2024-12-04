import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { addMovie } from '../../services/moviesService';
import { FormInputText } from './forms-components/FormInputText';
import { useNavigate } from 'react-router-dom';

const MovieForm = (props) => {
    const navigate = useNavigate()
    const {setValue, control, handleSubmit, reset, formState: {errors}, getValues} = useForm({
        defaultValues: {
            name: props.name || '',
            genres: props.genres || '',
            imageUrl: props.imageUrl || '',
            premiered: props.premiered || '',
        }
    });
    const queryClient = useQueryClient();

    const addMovieMotation = useMutation({
        mutationFn: (data) => {
            return addMovie(data)
        }, 
        onSuccess: (newMovie) => {
            queryClient.setQueriesData(
                { queryKey: ['fetchData', 'movies'], exact: false },
                (oldData) => {
                    if (!oldData || oldData.length === 0) return [newMovie];

                    return [newMovie, ...oldData]
                }
            );
        },
    })

    const onSubmitHandler = (data) => {
        console.log('Form Submitted: ', data)

        if (props.id) {
            console.log("Movie Should be eddited");            
        } else {
            addMovieMotation.mutate(data)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInputText control={control} label={"Name"} name={'name'} />
            <FormInputText control={control} label={"Genres"} name={'genres'} />
            <FormInputText control={control} label={"Image URL"} name={'imageUrl'} />
            <FormInputText control={control} label={"Premiered"} name={'premiered'} />
            <button type='submit'>Submit</button>
            <button onClick={() => navigate(-1)}>Cancel</button>
        </form>
    );
};

export default MovieForm;