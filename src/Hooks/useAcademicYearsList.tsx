import { useQuery } from '@tanstack/react-query';
import { AcademicYearParams } from '../screens/types/AcademicYearTypes';
import axios from 'axios';

export const useAcademicYearsList = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['academicYears'],
        queryFn: () => axios.get<AcademicYearParams[]>('/api/v1/admin/school_year/list').then(res => res.data),
    });

    return { academicYears: data, isLoading, error, refetch };
};
