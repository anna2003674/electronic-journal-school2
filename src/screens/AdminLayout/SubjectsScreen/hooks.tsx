import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const useDeleteSubject = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (id: number) => axios.delete(`/api/v1/admin/subject/${id}`),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['subjects'] });
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

    return { deleteSubject: mutate, isPending };
};
