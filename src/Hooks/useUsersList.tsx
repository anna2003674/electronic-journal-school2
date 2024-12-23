import { useQuery } from '@tanstack/react-query';
import { UserParams } from '../screens/types/UsersTypes';
import axios from 'axios';

export const useUsersList = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios.get<UserParams[]>('/api/v1/admin/users/list').then(res => res.data),
    });

    return { users: data, isLoadingUsers: isLoading, errorUsers: error, refetchUsers: refetch };
};
