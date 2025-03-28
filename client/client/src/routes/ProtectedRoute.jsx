import React from 'react';
import { useAuth } from '../contetxt/AuthContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const ProtectedRoute = ({functionality = 'view', children}) => {
    const {currentUser} = useAuth()
    const {type} = useParams()
    const navigate = useNavigate()

    if (!currentUser) {
        return <Navigate to="/" replace={true} />
    } else if ( (!currentUser.permissions.includes(`${functionality} ${type}`)) && !currentUser.admin) {
        return <Navigate to={`/${type}/error`} />
    } else {
        return (
            children
        );
    }

};

export default ProtectedRoute;