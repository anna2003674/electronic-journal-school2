import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AssignParentsParams } from '../../types/AssignParentsPupilTypes';

export const useAssignParents = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (assignParentsParams: AssignParentsParams) => axios.post('/api/v1/admin/assign-parents-to-pupil', assignParentsParams),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Родители успешно назначены',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при назначении родителей',
                text2: error?.message,
            });
        },
    });

    return { assignParents: mutate, isAssign: isPending };
};
