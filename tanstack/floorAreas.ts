import { useQuery } from '@tanstack/react-query';
import { floorAreaApi } from '../api/floorAreas';
import { QUERY_KEYS } from '../constants/queryKey';

export const useFloorAreas = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.FLOOR_AREAS],
		queryFn: async () => (await floorAreaApi.getAllActiveFloorAreas()).data,
		staleTime: 300000, // 5 minutes
	});
};