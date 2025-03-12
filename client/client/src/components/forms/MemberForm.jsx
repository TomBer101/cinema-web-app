import React from 'react';
import { FormInputText } from './forms-components/FormInputText';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { addMember } from '../../services/membersService';
import { useForm } from 'react-hook-form';
import { useEditMember } from '../../hooks/useMembersMutations';
import { useDispatch } from 'react-redux';
import { showModal } from '../../redux/actions/modalActions';
import { useNavigate } from 'react-router-dom';

const MemberForm = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setValue, control, handleSubmit, watch, reset, formState: {errors}, getValues} = useForm({
            defaultValues: {
                name: props.name || '',
                email: props.email || '',
                city: props.city || '',
            },
    })

    const queryClient = useQueryClient()

    const addMemberMutation = useMutation({
        mutationFn: addMember,
        onSuccess: (newUserFromServer) => {
            // Update the paginated cache with the new user
            queryClient.setQueriesData({queryKey: ['fetchData', 'subscriptions'], exact: false}, (oldData) => {

                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return { ...oldData, pages: [{data: newUserFromServer.data.newMember, hasMore: true}] };
                }
    
                const updatedFirstPage = [newUserFromServer.data.newMember, ...oldData.pages[0].data];
                const {data: firstPageData, hasMore} = oldData.pages[0]
                return { ...oldData, pages: [{data: updatedFirstPage, hasMore: hasMore}, ...oldData.pages.slice(0, 1)] };

         
            });
            reset()
            dispatch(showModal({title: "Success", message:"Member was added!"}))
        },
        onError: (error) => {
            console.error(error);
            dispatch(showModal({title: "Error", message: error}))
        },
        onSettled: () => {queryClient.invalidateQueries({queryKey: ['fetchData', 'movies'], exact: false})}
        
    })

    const {date: updatedRes, mutate: editMemberMutation, isSuccess} = useEditMember()

    const onSubmitHandler = (data) => {
        console.log('Form submitted: ', data);

        if (props.id) {
            editMemberMutation({...data, id: props.id})
            if (isSuccess) {
                console.log(updatedRes)
            }
        } else {
            addMemberMutation.mutate(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}> 
            <FormInputText control={control} label={'Name'} name={'name'} required={true}/>
            <FormInputText control={control} label={'Email'} name={'email'} required={true}/>
            <FormInputText control={control} label={'City'} name={'city'} required={true}/>

            <Box className='buttons' sx={{display: 'flex', justifyContent: 'space-between', mt: 2}}>
                <Button type='submit'>Add</Button>
                <Button onClick={() => navigate('/subscriptions', {replace: true})}>Cancel</Button>
            </Box>
        </form>
    );
};

export default MemberForm;