import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { SubjectParams } from '../../types/SubjectTypes';

export const useSubjectParams = (id: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['subject', id],
        queryFn: () => axios.get<SubjectParams>(`/api/v1/admin/subject/${id}`).then(res => res.data),
        enabled: !!id,
    });

    return { subjectParams: data, isLoading, error, refetch };
};

export const useEditSubject = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (subjectParams: SubjectParams) => axios.put('/api/v1/admin/subject', subjectParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['subjects'] });
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

    return { editSubject: mutate, isPending };
};

export const useCreateSubject = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (subjectParams: Omit<SubjectParams, 'id'>) => axios.post('/api/v1/admin/subject', subjectParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['subjects'] });
            Toast.show({
                type: 'success',
                text1: 'Предмет успешно создан',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при создании предмета',
                text2: error?.message,
            });
        },
    });

    return { createSubject: mutate, isCreating: isPending };
};
