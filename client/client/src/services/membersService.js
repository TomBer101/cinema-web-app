import queryClient from "../configs/reactQuery"
import { deleteData, fetchData, patchData, postData } from "../utils/dataUtils"

export const addMember = async (newMember) => {
    try {
        const response = await postData('/members', newMember)
        return response
    } catch (err) {
        console.error('Error adding member:', err);
        const errorMessage = err.response?.data?.message || err.message || 'An error occurred while adding member';
        throw errorMessage
    }
}

export const deleteMember = async (memberId) => {
    try {
        const response = await deleteData('/members', {params: {memberId}})
        return response
    } catch (err) {
        throw err
    }
}

export const editMember = async (memberId, updatedMember) => {
    try {
        const {data: res} = await patchData(`/members/${memberId}`, updatedMember)
        return res
    } catch (err) {
        throw err
    }
}

export const getMember = async (memberId) => {
    try {
        const cachedData = queryClient.getQueriesData(['fetchData', 'subscriptions'],{ exact: false})

        let member = null;

        const pages = cachedData[0][1]?.pages

        for (const page of pages) {

            member = page.data.find(member => member.id === memberId)
            if (member) return member
        }

        if (!member) {
            const response = await fetchData(`/members/${memberId}`)
            return response.member.member
        }
    } catch (err) {
        console.error(`Error fetching member ${memberId}: `, err);
        
    }
}
