import { fetchData, postData, deleteData, patchData } from "../utils/dataUtils";

export const fetchUsers = async (page) => {
    try {
        const {data: users} = await fetchData('/users', page)
    return users
    }catch (err) {
        console.error("Error fetching users");
        return [
            {
                "id":"670a687767f371d2a83effac","createdDate":"10/12/2024",
                "firstName":"add","lastName":"user","userName":"added user","sessionTimeout":2, "permissions": ["View Movies", "Edit Movies", "Add Movies"]},{
                    "id":"670a687767f371d2a83effac","createdDate":"10/12/2024",
                    "firstName":"add","lastName":"user","userName":"added user","sessionTimeout":2},{
                        "id":"670a687767f371d2a83effac","createdDate":"10/12/2024",
                        "firstName":"add","lastName":"user","userName":"added user","sessionTimeout":2}
        ]
        
    }
    
}


export const addUser = async (newUser) => {
   
        const response = await postData('/users', newUser)
    return response
    
    
}

export const updateUser = async (userId, updatedInfo) => {
    try {
        const {data: res} = await patchData(`/users/${userId}`, updatedInfo)
        return res
    } catch {err} {
        throw err
    }
}

export const deleteUser = async (userId) => {
    const response = await deleteData('/users', {params: {userId}})
    return response
}