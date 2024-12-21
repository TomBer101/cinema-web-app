import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';

import {getMoviesName} from '../../services/moviesService'
import { FormInputSelect } from './forms-components/FormInputSelect';
import FormInputDate from './forms-components/FormInputDate';

const AddMovieForm = ({memberId}) => {
    const queryClient = useQueryClient()
    const { setValue, control, handleSubmit, reset, formState: {errors}, getValues} = useForm({
                defaultValues: {
                    name: '',
                    date: null
                },
    })

    const {data: moviesNames, error, status, isLoading} = useQuery({
        queryKey: ['moviesNames'],
        queryFn: async () =>  {
            const names = await getMoviesName(1, {fields: 'name'})
            return names
        },
    })

    const onSubmitHandler = (date) => {
        console.log(date)
    }


    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormInputSelect control={control} name='name' label='Movie Name: ' options={moviesNames} />
            <FormInputDate control={control} name={'date'} />
        </form>
    );
};

export default AddMovieForm;