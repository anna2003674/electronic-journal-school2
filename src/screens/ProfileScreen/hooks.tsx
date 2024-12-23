import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { EditPasswordMutationPayload } from './types';
import { UserParams } from '../types/UsersTypes';

export const usePersonInfo = (id: number | null, role: string | null) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['person'],
        queryFn: () =>
            axios.get<UserParams>(`/api/v1/${role}/basic-info/${id}`).then(res => res.data),
    });
    return { personInfo: data, isLoading, error, refetch };
};

export const useEditPassword = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (passwordParams: EditPasswordMutationPayload) =>
            axios.put('/api/v1/admin/change-password', passwordParams),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Пароль был успешно изменен',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при изменении пароля',
                text2: error?.message,
            });
        },
    });

    return { editPassword: mutate, isPending };
};
