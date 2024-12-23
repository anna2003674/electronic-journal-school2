import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ClassParams } from '../screens/types/ClassTypes';

export const useMyClassesList = (teacherId: number) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['myClasses'],
        queryFn: () => axios.get<ClassParams[]>(`/api/v1/teacher/${teacherId}/classes`).then(res => res.data),
    });

    return { classes: data, isLoading, error, refetch };
};
