import queryClient from "../configs/reactQuery"
import { deleteData, fetchData, patchData, postData } from "../utils/dataUtils"

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

export const getMember = async (memberId) => {
    try {
        const cachedData = queryClient.getQueriesData(['fetchedData', 'subscriptions'],{ exact: false})

        let member = null;

        for (const page in cachedData) {
            member = page.find(member => member.id === memberId)
            if (member) return member
        }

        if (!member) {
            const response = await fetchData(`/members/${memberId}`)
            return response.member
        }
    } catch (err) {
        console.error(`Error fetching member ${memberId}: `, err);
        
    }
}
