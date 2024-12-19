import { deleteData, patchData, postData } from "../utils/dataUtils"

export const  addMember = async (newMember) => {
    const response = await postData('/members', newMember)
    return response
}

export const deleteMember = async (memberId) => {
    const response = await deleteData('/members', {params: {memberId}})
}

export const editMember = async (memberId, updatedMember) => {
    try {
        const {data: res} = await patchData(`/members/${memberId}`, updatedMember)
        return res
    } catch (err) {
        throw err
    }
}
