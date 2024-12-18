import { deleteMember } from "../services/membersService";
import { useGenericDelete } from "./queryMutations";

export const useDeleteMember = () => useGenericDelete((memberId) => {
    deleteMember(memberId),
    ['fetchData', 'subscriptions']
})