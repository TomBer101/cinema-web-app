import React from 'react';
import Box from '@mui/material/Box'

import { useDeleteUser } from '../../hooks/useUserMutations';
import { useNavigate } from 'react-router-dom';



const UserItem = ({id, firstName, lastName, userName, createdDate, sessionTimeout, permissions}) => {
    const {mutate: deleteUser} = useDeleteUser()
    const navigate = useNavigate()

    const handleDelete = (e) => {
        e.preventDefault()
        deleteUser(id)
    }

    const handleEditOnClick = () => {
        const state = {
            id, firstName, lastName, createdDate, sessionTimeout, permissions, name: `${firstName} ${lastName}`, userName
        }

        navigate('edit', {state : state})
    }


    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: '1vh',
            '& p': {
                m: 0
            }
        }}>
            <p><strong>Name: </strong>{`${firstName} ${lastName}`}</p>
            <p><strong>Username: </strong>{userName}</p>
            <p><strong>Session timeout: </strong>{sessionTimeout}</p>
            <p><strong>Created Date: </strong>{createdDate}</p>
            <p><strong>Permissions: </strong>{permissions?.map((per) => <p>{per}</p>)}</p>

            <div className="buttons" style={{display: 'flex', justifyContent: 'space-between'}}>
                <button onClick={(e) => handleDelete(e)}>Delete</button>
                <button onClick={() => handleEditOnClick()}>Edit</button> 
                {/* click on edit should navigate to the edit page and passing as state the current page as well */}
            </div>
        </Box>
    );
};

export default UserItem;