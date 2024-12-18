const dataUtils = require('../utils/wsUtils')
const AppError = require('../classes/appErrors')

let membersCache = []
let cachPage = 0
const MOVIES_PER_PAGE = 50;
const MOVIES_PER_FETCH = 300;

const getAllMembers = async (pageNumber) => {
    const requestedIndex = (pageNumber - 1) * MOVIES_PER_PAGE

    if (requestedIndex >= membersCache.length) {
        try {
            const requestedPage = Math.floor(requestedIndex / MOVIES_PER_FETCH) + 1
            const {members} = await dataUtils.getData('members', 300, requestedPage)

            const transformedMembers = members.map(({_id, ...rest}) => ({
                ...rest,
                id: _id,
            }))
            membersCache = [...membersCache, ...transformedMembers]
        } catch (err) {
            console.error('Error fetching members: ', err);
            throw new AppError('Error fetching membres', 500)
        }
    }

    const slice = membersCache.slice(requestedIndex, requestedIndex + MOVIES_PER_PAGE)
    return slice
}

const addMember = async (memberInfo) => {
    try {
        const res = await dataUtils.postData('members', memberInfo)
        return res
    } catch (err) {
        console.error('Error post member: ', err);
        throw err
    }
}

const updateMember = async (memberId, newData) => {
    try {
        const res = await dataUtils.patchData('members', memberId, newData)
        return res
    } catch (err) {
        console.error(`Error updating member: `, err);
        throw new AppError.AppError('Internal server error', 500)
    }

}

const deleteMember = async (memberId) => {
    membersCache = membersCache.filter(member => member.id !== memberId)

    try {
        const res = await dataUtils.deleteData('members', memberId)
        return res
    } catch (err) {
        console.error(`Error deleting member: `, err);
        throw new AppError.AppError('Internal server error', 500)
    }
}

module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
}