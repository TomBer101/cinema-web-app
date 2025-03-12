import { deleteMember, editMember } from "../services/membersService";
import { useGenericDelete, useUpdateMutation } from "./queryMutations";

export const useDeleteMember = () => useGenericDelete(async ({ id: memberId, queryKey}) => {
    const res = await deleteMember(memberId)
    return {id: memberId, queryKey}
})

export const useEditMember = () => useUpdateMutation((updatedMember) => editMember(updatedMember.id, updatedMember), ['fetchData', 'subscriptions']);