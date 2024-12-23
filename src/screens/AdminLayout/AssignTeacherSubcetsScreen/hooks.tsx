import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AssignSubjectParams } from '../../types/AssignSubjectsTypes';

export const useAssignSubjects = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (assignSubjectsParams: AssignSubjectParams) => axios.post('/api/v1/admin/assign-subjects', assignSubjectsParams),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Предметы успешно назначены',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при назначении предметов',
                text2: error?.message,
            });
        },
    });

    return { assignSubjects: mutate, isAssign: isPending };
};
