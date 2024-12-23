import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SubjectParams } from '../../types/SubjectTypes';

export const useMySubjectsList = (teacherId: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['mySubjects', teacherId],
        queryFn: () => axios.get<SubjectParams[]>(`/api/v1/teacher/${teacherId}/subjects`).then(res => res.data),
    });

    return { mySubjects: data, isLoadingMySubjects: isLoading, errorMySubjects: error, refetchMySubjects: refetch };
};