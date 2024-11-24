import { useMutation, useQueryClient } from 'react-query';

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

    return useMutation(mutationFn, {
        onMutate: async (updatedItem) => {
            await queryClient.cancelQueries(queryKey, {exact: false})
            const prevData = queryClient.getQueryData(queryKey, {exact: false})

            queryClient.setQueriesData({queryKey, exact: false}, (old) => 
                old? old.map(item => item.id === updatedItem.id? {...item, ...updatedItem} : item) : []
            );
            return {prevData}
        },

        onError: (err, newData, context) => {
            console.error(`Error edit mutating ${queryKey}: `, err)
            queryClient.setQueryData(queryKey, context.prevData)
        },

        // onSuccess: data => { console.log(data)}
    })
}

export function useGenericDelete(mutationFn, queryKey) {
    const queryClient = useQueryClient();

    return useMutation(mutationFn, {
        onMutate: async (id) => {
            await queryClient.cancelQueries(queryKey, {exact: false});

            const previousData = queryClient.getQueryData(queryKey, {exact: false});

            queryClient.setQueriesData({queryKey, exact: false}, (old) =>
                old ? old.filter(item => item.id !== id) : []
            );

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
