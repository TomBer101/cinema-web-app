import { TextField, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormInputText } from './forms-components/FormInputText';
import { FormInputCheckbox } from './forms-components/FormInputCheckbox';
import { useAddUser } from '../../hooks/useUserMutations';
import { useMutation } from 'react-query';
import { addUser } from '../../services/usersService';

const UserForm = (props) => {
    const { setValue, control, handleSubmit, watch, reset, formState: {errors}, getValues} = useForm({
        defaultValues: {
            firstName: props.firstName || '',
            lastName: props.lastName || '',
            userName: props.userName || '',
            sessionTimeout: props.sessionTimeout || '',
            viewSubscriptions: props.permissions?.includes("View Subscriptions" )  || false,
            createSubscriptions: props.permissions?.includes("Create Subscriptions" )  || false,
            deleteSubscriptions: props.permissions?.includes("Delete Subscriptions" )  || false,
            updateSubscriptions: props.permissions?.includes("Update Subscriptions" )  || false,
            viewMovies: props.permissions?.includes("View Movies" )  || false,
            createMovies: props.permissions?.includes("Create Movies" )  || false,
            deleteMovies: props.permissions?.includes("Delete Movies" )  || false,
            updateMovies: props.permissions?.includes("Update Movies" )  || false,
        },
    })

    const [errorMessage, setErrorMessage] = useState(null)
    
        const addUserMutation = useMutation({
            mutationFn: (data) => {
                return addUser(data)
            },
            
        })
    


    useEffect(() => {
        console.table(props)
    }, [props])

    const subscriptionsWatcher = watch(["createSubscriptions", "updateSubscriptions", "deleteSubscriptions"])
    const moviesWatcher = watch(["createMovies", "deleteMovies", "updateMovies"])


    useEffect(() => {
        const [createMovies, deleteMovies, updateMovies] = moviesWatcher;
        if(createMovies || updateMovies || deleteMovies ) {
            setValue("viewMovies", true)
        } 
    }, [moviesWatcher, setValue])



    useEffect(() => {
        const [createSubscriptions, updateSubscriptions, deleteSubscriptions] = subscriptionsWatcher;
        if(createSubscriptions || updateSubscriptions || deleteSubscriptions) {
            setValue("viewSubscriptions", true)
        }
        
    }, [subscriptionsWatcher, setValue])

    const onSubmitHandler = (data) => {
        console.log('Form Submitted: ', data);
        if (props.id) {
            console.log('Need to patch/update data in the server');
        } else {
            addUserMutation.mutate(data)
        }
        
    }




    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>

            <FormInputText control={control} label={"First Name"} name={"firstName"} />
            <FormInputText control={control} label={"Last Name"} name={"lastName"} />
            <FormInputText control={control} label={"User Name"} name={'userName'} />
            <FormInputText control={control} label={"Session timeout (minutes)"} name={"sessionTimeout"} />

            <Typography variant='h4'>Permissions:</Typography>
            <FormInputCheckbox control={control} label={'View Movies'} name={'viewMovies'} disabled={moviesWatcher.some(val => val)}/>
            <FormInputCheckbox control={control} label={'Create Movies'} name={'createMovies'} />
            <FormInputCheckbox control={control} label={'Delete Movies'} name={'deleteMovies'} />
            <FormInputCheckbox control={control} label={'Update Movies'} name={'updateMovies'} />
            <FormInputCheckbox control={control} label={'View Subscription'} name={'viewSubscriptions'} disabled={subscriptionsWatcher.some(val => val)}/>
            <FormInputCheckbox control={control} label={'Create Subscription'} name={'createSubscriptions'} />
            <FormInputCheckbox control={control} label={'Delete Subscription'} name={'deleteSubscriptions'} />
            <FormInputCheckbox control={control} label={'Update Subscription'} name={'updateSubscriptions'} />

            <button type='submit'>Submit</button>
        </form>
    );
};

export default UserForm;