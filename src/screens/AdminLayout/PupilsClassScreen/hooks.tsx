import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { PupilClassParams, PupilsParams } from '../../types/PupilsClassTypes';

export const usePupilsClassList = (classId: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['pupilsClass', classId],
        queryFn: () => axios.get<PupilsParams[]>(`/api/v1/admin/class/${classId}/pupils`).then(res => res.data),
    });

    return { pupilsClass: data, isLoadingPupilsClass: isLoading, errorPupilsClass: error, refetchPupilsClass: refetch };
};

export const useAddPupilClass = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (pupilClassParams: PupilClassParams) => axios.post('/api/v1/admin/add-pupil-to-class', pupilClassParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['pupilsClass'] });
            Toast.show({
                type: 'success',
                text1: 'Ученик добавлен',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при добавлении ученика',
                text2: error?.message,
            });
        },
    });

    return { addPupil: mutate, isAdding: isPending };
};

export const useDeletePupilClass = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (pupilClassParams: PupilClassParams) => axios.delete('/api/v1/admin/remove-pupil-from-class', { data: pupilClassParams }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['pupilsClass'] });
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

    return { deletePupilClass: mutate, isPending };
};
