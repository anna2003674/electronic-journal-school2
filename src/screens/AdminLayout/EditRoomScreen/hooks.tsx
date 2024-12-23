import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { RoomParams } from '../../types/RoomTypes';

export const useRoomParams = (id: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['room', id],
        queryFn: () => axios.get<RoomParams>(`/api/v1/admin/room/${id}`).then(res => res.data),
        enabled: !!id,
    });

    return { roomParams: data, isLoading, error, refetch };
};

export const useEditRoom = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (roomParams: RoomParams) => axios.put('/api/v1/admin/room', roomParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['rooms'] });
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

    return { editRoom: mutate, isPending };
};

export const useCreateRoom = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (roomParams: Omit<RoomParams, 'id'>) => axios.post('/api/v1/admin/room', roomParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['rooms'] });
            Toast.show({
                type: 'success',
                text1: 'Кабинет успешно создан',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при создании кабинета',
                text2: error?.message,
            });
        },
    });

    return { createRoom: mutate, isCreating: isPending };
};
