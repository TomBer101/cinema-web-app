import React, { useState } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useAuth } from '../../contetxt/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styles from '../../styles/form.module.css'
import { Box, Modal } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';



const RegisterPage = () => {
    const navigate = useNavigate()
    const { error, loading, onRegister } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const [errorMessage, setErrorMessage] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const onSubmit = async (data) => {
        try {
            const res = await onRegister(data.username, data.password)
            if (!res) {
                setIsModalOpen(true)
            }

            if (res) {
                navigate('/movies')
            }
        } catch (err) {
            console.error('Internal Serbr Error?', err);

        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }


    return (
        <div style={{
            height: '100%',
            padding: '2rem'
        }}>
            <Box>
                <Typography variant='h1' fontSize='3.7rem' fontWeight='500' fontFamily='cursive'>Movies Subscription Web Site</Typography>
                <Typography variant='h3'>Register</Typography>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{
                        justifyContent: 'center',
                        backgroundColor: '#E9E5D6',
                        justifyItems: 'center',
                        minHeight: '40vh',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5vh',
                        width: 'fit-content',
                        m: ' 5rem auto',
                        p: '2rem',
                        borderRadius: '25px',
                        transition: '.4s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            border: '1px solid black'
                        }
                    }}
                >
                    <div className={styles.field}>
                        <AlternateEmailIcon className={styles.inputIcon} />
                        {/* <label htmlFor='username'>Username:</label> */}
                        <input
                            id='username'
                            className={styles.inputField}
                            placeholder='Username'
                            {...register('username', { required: 'Username is requierd' })}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div className={styles.field}>
                        <LockIcon className={styles.inputIcon} />

                        {/* <label htmlFor='password'>Password:</label> */}
                        <input
                            className={styles.inputField}
                            type="password"
                            id="password"
                            placeholder='Password'
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className={`${styles.btns} ${styles.horizontal}`}>
                        <Button color='success' variant='contained' type='submit'>Register</Button>
                        <Button color='success' variant='outlined' onClick={() => navigate('/')}>Login</Button>
                    </div>
                </Box>
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            width: '300px',
                        }}
                    >
                        <Typography id="error-modal-title" variant="h6" component="h2">
                            Login Error
                        </Typography>
                        <Typography id="error-modal-description" sx={{ mt: 2 }}>
                            {error} {/* Display error from useAuth */}
                        </Typography>
                        <Button onClick={handleCloseModal} sx={{ mt: 3 }} variant="contained">
                            Close
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </div>
    );
};

export default RegisterPage;