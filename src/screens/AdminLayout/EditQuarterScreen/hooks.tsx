import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { QuarterParams, QuarterParamsMutationVariables } from '../../types/QuarterTypes';

export const useQuarterParams = (id: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['quarter', id],
        queryFn: () => axios.get<QuarterParams>(`/api/v1/admin/quarter/${id}`).then(res => res.data),
        enabled: !!id,
    });

    return { quarterParams: data, isLoadingQuearter: isLoading, errorQuarter: error, refetchQuarter: refetch };
};

export const useEditQuarter = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (quarterParams: QuarterParamsMutationVariables) => axios.put('/api/v1/admin/quarter', quarterParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['quarters'] });
            Toast.show({
                type: 'success',
                text1: 'Изменения внесены',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при изменении данных',
                text2: error?.message,
            });
        },
    });

    return { editQuarter: mutate, isPending };
};

export const useCreateQuarter = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (quarterParams: QuarterParamsMutationVariables) => axios.post('/api/v1/admin/quarter', quarterParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['quarters'] });
            Toast.show({
                type: 'success',
                text1: 'Четверть создана',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при создании четверти',
                text2: error?.message,
            });
        },
    });

    return { createQuarter: mutate, isCreating: isPending };
};
