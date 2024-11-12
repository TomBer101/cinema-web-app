import { fetchData, postData, deleteData } from "../utils/dataUtils";

export const fetchUsers = async (page) => {
    const {data: users} = await fetchData('/users', page)
    return users
}


export const addUser = async (newUser) => {
    const response = await postData('/users', newUser)
    return response
}

export const deleteUser = async (userId) => {
    const response = await deleteData('/users', {params: {userId}})
    return response
}