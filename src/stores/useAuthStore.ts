import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { JwtPayload, Store } from './types';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';

const initialState = {
    token: null,
    role: null,
    id: null,
};

export const useAuthStore = create<Store>((set, get) => ({
    ...initialState,
    setToken: (jwtToken) => {
        const decoded = jwtDecode<JwtPayload>(jwtToken);
        if (decoded) {
            Keychain.setGenericPassword('Token', jwtToken);
            set({ token: jwtToken, role: decoded.roles[0], id: decoded.id });
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        }
    },
    clearToken: () => {
        Keychain.resetGenericPassword();
        set({ token: null, role: null, id: null });
    },
    loadToken: () => Keychain.getGenericPassword().then((credentials) => {
        const { setToken } = get();
        if (credentials) {
            setToken(credentials.password);
        }
    }),
}));
