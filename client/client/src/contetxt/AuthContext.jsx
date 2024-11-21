import React, { createContext, useContext, useMemo, useState } from 'react';

import { loginUser, registerUser } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useLocalStorage('cinema-ws-user', null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    // const signup = async ({firstName, lastName, userName, password, shareData}) => {

    //     try {
    //     console.log('signing up?');

    //         setLoading(true);
    //         console.log('user name: ', userName, 'flname: ', firstName, lastName);
    //         const res = await registerUser({ firstName, lastName, userName, password, shareData });
    //         console.log('res: ', res);
    //         if (res.success) {
    //             setCurrentUser({ userName, role : res.role });
    //             navigate('/user');
    //         } else {
    //             setError('User name is taken.');
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         setError('Registration failed - Internal Error');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    const login = async(userName, password) => {
        try {
            setLoading(true);
            const loginResult = await loginUser(userName, password);
            loginResult.data.permissions = loginResult.data.permissions.map(per => per.toLowerCase())
            if (loginResult.success) {
                setCurrentUser(loginResult.data)
            } else {
                setError(loginResult.message)
            }

        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setCurrentUser(null);
        navigate('/');
    }

    const value = useMemo( () => ({
        currentUser, 
        error, 
        loading, 
        onLogin : login, 
        onLogOut : logout,
    }), [currentUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}