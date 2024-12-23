import { useMutation } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { LoginMutationResponse, LoginMutationVariables } from './types';

export const useLoginMutation = () => {
    const { data, isPending, error, mutate } = useMutation({
        mutationFn: async (payload: LoginMutationVariables) => {
            try {
                const { data } = await axios.post<LoginMutationResponse>('/api/v1/auth/authenticate', payload);
                return data;
            } catch (err) {
                if (isAxiosError(err) && err.response?.status === 401) {
                    throw new Error('Некорректные логин или пароль');
                }
                throw err;
            }
        },
    });

    return { data, isPending, error, mutate };
};
