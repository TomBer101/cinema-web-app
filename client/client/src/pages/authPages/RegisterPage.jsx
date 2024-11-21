import React from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useAuth } from '../../contetxt/AuthContext';


const RegisterPage = () => {
    const {error, loading, } = useAuth()
    return (
        <div>
            
        </div>
    );
};

export default RegisterPage;