import { useQuery } from '@tanstack/react-query';
import { RoomParams } from '../screens/types/RoomTypes';
import axios from 'axios';

export const useRoomsList = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['rooms'],
        queryFn: () => axios.get<RoomParams[]>('/api/v1/admin/room').then(res => res.data),
    });

    return { rooms: data, isLoadingRooms: isLoading, errorRooms: error, refetchRooms: refetch };
};
