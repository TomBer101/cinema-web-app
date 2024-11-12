import React from 'react';
import { useDeleteUser } from '../../hooks/useUserMutations';



const UserItem = ({id, firstName, lastName, userName, createdDate, sessionTimeOut, permissions}) => {
    const deleteUser = useDeleteUser()

    const handleDelete = (e) => {
        e.preventDefault()
        deleteUser.mutate(id)
    }


    return (
        <div>
            <p><strong>Name: </strong>{`${firstName} ${lastName}`}</p>
            <p><strong>Username: </strong>{userName}</p>
            <p><strong>Session timeout: </strong>{sessionTimeOut}</p>
            <p><strong>Created Date: </strong>{createdDate}</p>
            <p><strong>Permissions: </strong>{permissions}</p>

            <div className="buttons">
                <button onClick={(e) => handleDelete(e)}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    );
};

export default UserItem;