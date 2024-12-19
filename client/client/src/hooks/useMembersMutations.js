import { deleteMember, editMember } from "../services/membersService";
import { useGenericDelete, useUpdateMutation } from "./queryMutations";

export const useDeleteMember = () => useGenericDelete((memberId) => {
    deleteMember(memberId),
    ['fetchData', 'subscriptions']
})

export const useEditMember = () => useUpdateMutation((updatedMember) => editMember(updatedMember.id, updatedMember), ['fetchData', 'subscriptions']);