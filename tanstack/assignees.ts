import { useQuery } from '@tanstack/react-query';
import { assigneeApi } from '../api';
import { QUERY_KEYS } from '../constants/queryKey';

export const useGetAssignees = (type: 'vendor' | 'internal') => {
	const query = useQuery({
		queryKey: [...QUERY_KEYS.ASSIGNEES, type],
		queryFn: () => assigneeApi.getAssignees(type),
		enabled: type !== undefined,
	});

	const mappedData =
		query.data?.data?.map((e) => ({
			label: e.name,
			value: e.uuid,
		})) || [];

	return { ...query, mappedData };
};
