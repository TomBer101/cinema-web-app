import { useMutation, useQueryClient } from 'react-query';

export function useGenericMutation(mutationFn, queryKey) {
    const queryClient = useQueryClient();

    return useMutation(mutationFn, {
        onSuccess: () => {
            queryClient.invalidateQueries(queryKey); // Invalidate cache for the relevant data
        },
    });
}
