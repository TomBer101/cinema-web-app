const Member = require('../models/memberModel')
const AppError = require('../classes/appError')

const getAllMembers = async (page, limit) => {
    const skip = (page - 1) * limit

    try {
        const members = await Member.find({}).skip(skip).limit(limit)
        return members
    } catch (err) {
        console.error('Error fetching all members: ', err);
        throw new AppError('Internal Server Error', 500)
        
    }
}

const addMember = async ({name, email, city}) => {
    try {
        const existedMember = await Member.find({email})

        if (existedMember) {
            throw new AppError('Email is already in use', 400)
        }

        const newMember = new Member({
            name,
            email,
            city
        })

        await newMember.save()
        return newMember
    } catch (err) {
        if (err instanceof AppError) throw err
        else {
            console.error('Error adding member: ', err);
            const er = new Error('Internal Server Error')
            err.staus = 500
            throw er
        }
    }
}

const updateMember = async (memberId, updatedData) => {
    try {
        const existedMember = await Member.findById(memberId)

        if (!existedMember) {
            throw new AppError(`Member ${memberId} was not found`, 400)
        }

        if (updatedData.email) {
            const isEmailInUse = await Member.findOne({ email })
            if (isEmailInUse) {
                throw new AppError(`The email ${email} is in use`, 404)
            }    
        }

        existedMember.name = updatedData.name || existedMember.name 
        existedMember.email = updatedData.email || existedMember.email 
        existedMember.city = updatedData.city || existedMember.city 

        const updatedMember = await existedMember.save()
        return updatedMember
    } catch (err) {
        if (err instanceof AppError) throw err
        else {
            console.error('Error adding member: ', err);
            const er = new Error('Internal Server Error')
            err.staus = 500
            throw er
        } 
    }
}

const deleteMember = async (memberId) => {
    try {
        const deletedMember = await Member.findByIdAndDelete(memberId)

        if (!deleteMember) {
            throw new Error("Member not found")
        }

        return {success: true, message: 'Member was deletes'}
    } catch (err) {
        console.error('Error deleting member: ', err);
        throw new Error("Internal Server Error")
    }
}

module.exports = {
    getAllMembers,
    addMember, updateMember,
    deleteMember
}