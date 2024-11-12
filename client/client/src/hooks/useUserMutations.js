import {addUser, fetchUsers, deleteUser} from '../services/usersService';
import { useGenericMutation } from './queryMutations';

export const useDeleteUser = () => useGenericMutation(deleteUser, 'users');
export const useAddUser = () => useGenericMutation(addUser, 'users');
// export const useEditUser = () => useGenericMutation(({ userId, data }) => editUser(userId, data), 'users');
