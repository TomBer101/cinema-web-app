import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { loginUser, registerUser, validateSession } from '../services/authService';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();


export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useLocalStorage('cinema-ws-user', null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     const initializerUser = async () => {
    //         const storedUser = localStorage.getItem('cinema-ws-user')
    //         if (storedUser) {
    //             const user = JSON.parse(storedUser)
    //             const sessionValidate = await validateSession(user)
    //             if (sessionValidate) {
    //                 setCurrentUser(user)
    //             } else {
    //                 localStorage.removeItem('cinema-ws-user')
    //                 setCurrentUser(null)
    //             }
    //         }
    //     };

    //     initializerUser()
    // }, [])


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
                //localStorage.setItem('cinema-ws-user', JSON.stringify(loginResult.data)); // Store user data
                return true
            } else {
                setError(loginResult.message)
                return false
            }

        } catch (err) {
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setCurrentUser(null);
        localStorage.removeItem('cinema-ws-user')
    }

    const register = async (userName, password) => {
        //const {username, password} = data

        try {
            setLoading(true)
            const registerResult = await registerUser(userName, password)
            registerResult.data.permissions = registerResult.data.permissions.map(per => per.toLowerCase())

            if (registerResult.success) {
                setCurrentUser(registerResult.data)
                return true
            } else {
                setError(registerResult.message)
                return false
            }
        } catch(err) {
            console.error('Register failed: ', err);
            setError('Register Failed!')
            
        } finally {
            setLoading(false);
        }

    }

    const value = useMemo( () => ({
        currentUser, 
        error, 
        loading, 
        onLogin : login, 
        onLogOut : logout,
        onRegister: register
    }), [currentUser]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}