import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { UserParams } from '../../types/UsersTypes';

export const useEditUser = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (userParams: UserParams) => axios.put('/api/v1/admin/users', userParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['users'] });
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

    return { editUser: mutate, isPending };
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (userParams: Omit<UserParams, 'id'> & { password: number }) => axios.post('/api/v1/admin/users', userParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['users'] });
            Toast.show({
                type: 'success',
                text1: 'Пользователь успешно создан',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при создании пользователя',
                text2: error?.message,
            });
        },
    });

    return { createUser: mutate, isCreating: isPending };
};