import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import { showModal } from '../redux/actions/modalActions';

export function useGenericMutation(mutationFn, queryKey) {
    const queryClient = useQueryClient();

    return useMutation(mutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey); // Invalidate cache for the relevant data
        },
    });
}

export function useUpdateMutation(mutationFn, queryKey) {
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    return useMutation(mutationFn, {
        onMutate: async (updatedItem) => {
            await queryClient.cancelQueries(queryKey, {exact: false})
            const prevData = queryClient.getQueryData(queryKey, {exact: false})

            const updatedPages = prevData?.pages.map ( page => {
                const itemIndex = page.data?.findIndex(item => item.id === updatedItem.id)
                if (itemIndex !== -1) {
                    return [...page.data?.slice(0, itemIndex), ...page.data?.slice(itemIndex + 1)]
                }

                return page
            });

            queryClient.setQueriesData({queryKey, exact: false}, 
                {...prevData,
                pages: updatedPages}
            );
            return {prevData}
        },

        onError: (err, newData, context) => {
            console.error(`Error edit mutating ${queryKey}: `, err)
            queryClient.setQueryData(queryKey, context.prevData)
            dispatch(showModal({title: 'Error', message:'Failed to update item'}))
        },

        onSuccess: data => { 
            dispatch(showModal({title: 'Success', message: 'Update successful!'}))
        }
    })
}

export function useGenericDelete(mutationFn, queryKey) {
    const queryClient = useQueryClient();

    return useMutation(mutationFn, {
        onMutate: async (id) => {
            await queryClient.cancelQueries(queryKey, {exact: false});

            const previousData = queryClient?.getQueryData(queryKey, {exact: false});
            
            const updatedPages = previousData.pages.map(page => {
                const itemIndex = page.data.findIndex(item => item.id === id)

                if (itemIndex !== -1) {
                    page.data =  [...page.data.slice(0, itemIndex), ...page.data.slice(itemIndex + 1)]
                }

                return page
            });



            queryClient.setQueryData(queryKey, {
                ...previousData,
                pages: updatedPages,
            });

            // Return the previous data for rollback
            return { previousData };

        },
        onError: (err, id, context) => {
            console.error(`Error delete mutating ${queryKey}: `, err)
            queryClient.setQueryData(queryKey, context.previousData);
        },
        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });
}




//TODO - need a generic useFunctionalityMutation. NOTICE: the key should be ['fetchData', type, page(?)] or exact = false
// deleting and editing should implement an onMutate handler
