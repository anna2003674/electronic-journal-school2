import { useQuery } from '@tanstack/react-query';
import { ClassParams } from '../screens/types/ClassTypes';
import axios from 'axios';

export const useClassesList = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: () => axios.get<ClassParams[]>('/api/v1/admin/classes').then(res => res.data),
    });

    return { classes: data, isLoading, error, refetch };
};
