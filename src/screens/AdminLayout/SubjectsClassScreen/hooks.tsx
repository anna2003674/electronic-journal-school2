import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { SubjectParams } from '../../types/SubjectTypes';
import { SubjectClassParams } from '../../types/SubjectsClassTypes';

export const useSubjectsClassList = (classId: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['subjectsClass', classId],
        queryFn: () => axios.get<SubjectParams[]>(`/api/v1/admin/class/${classId}/subjects`).then(res => res.data),
    });

    return { subjectClass: data, isLoadingSubjectsClass: isLoading, errorSubjectsClass: error, refetchSubjectsClass: refetch };
};

export const useAddSubjectsClass = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (subjectClassParams: SubjectClassParams) => axios.post('/api/v1/admin/assign-subjects-class', subjectClassParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['subjectsClass'] });
            Toast.show({
                type: 'success',
                text1: 'Предметы добавлены',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при добавлении предметов',
                text2: error?.message,
            });
        },
    });

    return { addSubjects: mutate, isAdding: isPending };
};

export const useDeleteSubjectClass = (classId: number) => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (subjectClassParams: SubjectClassParams) => axios.delete(`/api/v1/admin/class/${classId}/remove-subjects-from-class`, { data: subjectClassParams }),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['subjectsClass'] });
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

    return { deleteSubjectClass: mutate, isPending };
};
