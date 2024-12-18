import { deleteData, postData } from "../utils/dataUtils"

export const  addMember = async (newMember) => {
    const response = await postData('/members', newMember)
    return response
}

export const deleteMember = async (memberId) => {
    const response = await deleteData('/members', {params: {memberId}})
}

