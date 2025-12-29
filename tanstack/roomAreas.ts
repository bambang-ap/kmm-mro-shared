import { useQuery } from '@tanstack/react-query';
import { roomAreaApi } from '../api/roomAreas';
import { QUERY_KEYS } from '../constants/queryKey';

export const useRoomAreas = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.ROOM_AREAS],
		queryFn: async () => (await roomAreaApi.getAllActiveRoomAreas()).data,
		staleTime: 300000, // 5 minutes
	});
};