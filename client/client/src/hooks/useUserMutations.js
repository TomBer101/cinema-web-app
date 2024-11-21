import {addUser, fetchUsers, deleteUser, updateUser} from '../services/usersService';
import { useGenericMutation, useGenericDelete, useUpdateMutation } from './queryMutations';

export const useDeleteUser = () => useGenericDelete((id) => deleteUser(id), ['fetchData', 'users']);
export const useAddUser = () => useGenericMutation(addUser, 'users');
export const useEditUser = () => useUpdateMutation((updatedUser) => updateUser(updatedUser.id, updatedUser), ['fetchData', 'users']); //--- The key might need to be: ['fetchData', 'users', page]
