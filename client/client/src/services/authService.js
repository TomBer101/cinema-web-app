import { postData } from '../utils/dataUtils';


export const registerUser = async (userInfo) => {
    try {
        const {data, statusCode} = await postData('/auth/signup', userInfo)
        
        if (statusCode === 200) {
            return {
                data, 
                success: true
            } 
        }else {
            return {
                success: false,
                message: data.message
            }
        }
    } catch (err) {
        console.error("Signup Failed: ", err);
        throw err
    }
}


export const loginUser = async (userName, password) => {
    try {
        const {data, statusCode} = await postData('/auth/login', {userName, password})

        if (statusCode === 200) {
            return {
                data,
                success: true
            }
        } else {
            return {
                success: false,
                message: data.message
            }
        }

    } catch (err) {
        console.error("Login Faild : ", err);
        throw err
    }
}

export const validateSession = async (user) => {
    try {
        const {data} = await postData('/auth/validateSession', {user})
        return data.isValid
    } catch (err) {
        console.error('Error validating session: ', err);
        return false
    }
}