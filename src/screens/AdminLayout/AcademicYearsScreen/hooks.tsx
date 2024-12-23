import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const useDeleteAcademicYears = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (startDate: string) => axios.delete(`/api/v1/admin/school_year/${startDate}`),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['academicYears'] });
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

    return { deleteaAademicYear: mutate, isPending };
};
