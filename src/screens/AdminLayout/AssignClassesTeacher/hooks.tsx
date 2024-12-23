import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AssignClassesParams } from '../../types/AssignClassesTeacherType';

export const useAssignClasses = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: (assignParentsParams: AssignClassesParams) => axios.post('/api/v1/admin/assign-classes', assignParentsParams),
        onSuccess: () => {
            Toast.show({
                type: 'success',
                text1: 'Классы успешно назначены',
            });
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Произошла ошибка при назначении классов',
                text2: error?.message,
            });
        },
    });

    return { assignClasses: mutate, isAssign: isPending };
};
