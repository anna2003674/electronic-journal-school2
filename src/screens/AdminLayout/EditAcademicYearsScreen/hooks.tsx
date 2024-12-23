import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { AcademicYearParams } from '../../types/AcademicYearTypes';

export const useAcademicYearParams = (startDate: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['academicYear', startDate],
        queryFn: () => axios.get<AcademicYearParams>(`/api/v1/admin/school_year/${startDate}`).then(res => res.data),
        enabled: !!startDate,
    });

    return { academicYearParams: data, isLoading, error, refetch };
};

export const useEditAcademicYearParams = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (academicYearParams: AcademicYearParams) => axios.put('/api/v1/admin/school_year', academicYearParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['academicYears'] });
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

    return { editAcademicYear: mutate, isPending };
};

export const useCreateAcademicYearParams = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (academicYearParams: AcademicYearParams) => axios.post('/api/v1/admin/school_year', academicYearParams),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ['academicYears'] });
            Toast.show({
                type: 'success',
                text1: 'Учебный год создан',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при создании',
                text2: error?.message,
            });
        },
    });

    return { createAcademicYear: mutate, isCreating: isPending };
};
