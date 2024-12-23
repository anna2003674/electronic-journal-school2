import { useQuery } from '@tanstack/react-query';
import { SubjectParams } from '../screens/types/SubjectTypes';
import axios from 'axios';

export const useSubjectsList = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => axios.get<SubjectParams[]>('/api/v1/admin/subject/list').then(res => res.data),
    });

    return { subjects: data, isLoadingSubjects: isLoading, errorSubjects: error, refetchSubjects: refetch };
};
