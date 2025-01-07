const dataUtils = require('../utils/wsUtils')
const {AppError} = require('../classes/appErrors')


const MOVIES_PER_PAGE = 50;
const MOVIES_PER_FETCH = 300;

let membersCache = []
let cachPage = 0
let totalCount = 0

const getAllMembers = async (pageNumber) => {
    const requestedIndex = (pageNumber - 1) * MOVIES_PER_PAGE

    if (requestedIndex >= membersCache.length) {
        try {
            const requestedPage = Math.floor(requestedIndex / MOVIES_PER_FETCH) + 1
            const {members, totalCount} = await dataUtils.getData('members', 300, requestedPage)

            const transformedMembers = members.map(({_id, movies, ...rest}) => {
                const trnasformedMovies = movies.map(movie => ({...movie, id: movie._id || movie.id}))
                return ({
                ...rest,
                movies: trnasformedMovies,
                id: _id,
                })
            })

            membersCache = [...membersCache, ...transformedMembers]
            cachPage = requestedPage
        } catch (err) {
            console.error('Error fetching members: ', err);
            throw new AppError('Error fetching membres', 500)
        }
    }

    const slice = membersCache.slice(requestedIndex, requestedIndex + MOVIES_PER_PAGE)
    const hasMore = membersCache.length > requestedIndex + MOVIES_PER_PAGE ||
    (cachPage * MOVIES_PER_FETCH < totalCount); 

    return {data: slice, hasMore}
}

const addMember = async (memberInfo) => {
    const existedMember = membersCache.find(member => member.email === memberInfo.email)

    if (existedMember) {
        throw new AppError('Member already exists', 400)
    }

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
        throw new AppError('Internal server error', 500)
    }
}

const getMember = async (memberId) => {
    let member = membersCache.find(member => member.id === memberId)
    if (member) {
        return member
    } else {
        try {
            const res = await dataUtils.getData('members', memberId)
            return res
        } catch (err) {
            console.error('Error getting member: ', err)
            throw new AppError('Internal server error', 500)
        }
    }
}

const invalidateCache = (subscription) => {
    for (let i = 0; i < membersCache.length; i++) {
        if (membersCache[i].id === subscription.memberId) {
            membersCache[i].movies = [...membersCache[i].movies, {id: subscription.movieId, watchDate: subscription.date, name: subscription.movieName}] //? [...membersCache[i].movies] : [membersCache[i].movies].push({name: subscription.movieName, watchDate: subscription.watchDate, _id: subscription._id})
            break
        }
    }
}

module.exports = {
    getAllMembers,
    addMember,
    updateMember,
    deleteMember,
    getMember,
    invalidateCache
}