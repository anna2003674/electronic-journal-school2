import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { ClassParams } from '../../types/ClassTypes';

export const useClassParams = (id: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['class', id],
        queryFn: () => axios.get<ClassParams>(`/api/v1/admin/classes/${id}`).then(res => res.data),
        enabled: !!id,
    });

    return { classParams: data, isLoading, error, refetch };
};

export const useEditClass = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (classParams: ClassParams) => axios.put('/api/v1/admin/classes', classParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['classes'] });
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

    return { editClass: mutate, isPending };
};

export const useCreateClass = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (classParams: Omit<ClassParams, 'id'>) => axios.post('/api/v1/admin/classes', classParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['classes'] });
            Toast.show({
                type: 'success',
                text1: 'Класс успешно создан',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при создании класса',
                text2: error?.message,
            });
        },
    });

    return { createClass: mutate, isCreating: isPending };
};
