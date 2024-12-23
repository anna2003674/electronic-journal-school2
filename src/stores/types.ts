import { Role } from '../screens/types/UsersTypes';

export type Store = {
    token: string | null,
    role: Role | null,
    id: number | null,
    setToken: (jwtToken: string) => void,
    clearToken: () => void,
    loadToken: () => Promise<void>,
}

export type JwtPayload = {
    roles: Role[],
    id: number,
}
