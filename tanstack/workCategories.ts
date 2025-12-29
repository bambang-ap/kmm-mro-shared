import { useQuery } from '@tanstack/react-query';
import { workCategoryApi } from '../api/workCategories';
import { QUERY_KEYS } from '../constants/queryKey';

export const useWorkCategories = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.WORK_CATEGORIES],
		queryFn: async () => (await workCategoryApi.getAllActiveWorkCategories()).data,
		staleTime: 300000, // 5 minutes
	});
};