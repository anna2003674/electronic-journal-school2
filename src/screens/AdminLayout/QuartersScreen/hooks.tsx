import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { QuarterParams } from '../../types/QuarterTypes';

export const useQuarterList = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['quarters'],
        queryFn: () => axios.get<QuarterParams[]>('/api/v1/admin/quarter/list').then(res => res.data),
    });

    return { quarterList: data, isLoading, error, refetch };
};

export const useDeleteQuarter = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => axios.delete(`/api/v1/admin/quarter/${id}`),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['quarters'] });
            Toast.show({
                type: 'success',
                text1: 'Запись удалена',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при удалении',
                text2: error?.message,
            });
        },
    });

    return { deleteaQuarter: mutate, isPending };
};
