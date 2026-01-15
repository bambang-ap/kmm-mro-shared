import { useQuery } from '@tanstack/react-query';
import {
	dashboardApi,
	type DashboardFilterParams,
	type TopStoresParams,
	type StoreWorkCategoryDistributionParams,
	type TicketStatusPriorityResponse,
	type TopStoresResponse,
	type FloorAreaDistributionResponse,
	type TrendTotalRequestResponse,
	type PreparationSLAAverageResponse,
	type FixingSLAAverageResponse,
	type WorkCategoryContributionResponse,
	type StoreWorkCategoryDistributionResponse,
	type AverageMaintenanceDurationResponse,
} from '../api/dashboard';
import { QUERY_KEYS } from '../constants/queryKey';

/**
 * Hook for fetching ticket status priority data
 * Maps API response to normalized format used by components
 */
export const useTicketStatusPriority = (params?: DashboardFilterParams) => {
	return useQuery<TicketStatusPriorityResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_TICKET_STATUS_PRIORITY, params],
		queryFn: async () => {
			const response = await dashboardApi.getTicketStatusPriority(params);

			// Map API response to normalized format
			return {
				success: response.success,
				message: response.message,
				data: response.data.data.map((item) => ({
					status: item.status,
					total: item.total_request,
					priority_breakdown: item.priorities.map((p) => ({
						priority: p.label,
						count: p.value,
					})),
				})),
			};
		},
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

export const useWorkCategoryContribution = (params?: DashboardFilterParams) => {
	return useQuery<WorkCategoryContributionResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_WORK_CATEGORY_CONTRIBUTION, params],
		queryFn: async () => {
			const response = await dashboardApi.getWorkCategoryContribution(params);

			// Map API response to normalized format
			return {
				success: response.success,
				message: response.message,
				data: response.data.data.map((item) => ({
					category_name: item.work_category_name,
					count: item.count,
					percentage: item.percentage,
				})),
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useTopStores = (params?: TopStoresParams) => {
	return useQuery<TopStoresResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_TOP_STORES, params],
		queryFn: async () => {
			const response = await dashboardApi.getTopStores(params);

			// Map API response to normalized format
			return {
				success: response.success,
				message: response.message,
				data: response.data.data.map((item) => ({
					store_name: item.store_name,
					total_tickets: item.total_request,
				})),
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useFloorAreaDistribution = (params?: DashboardFilterParams) => {
	return useQuery<FloorAreaDistributionResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_FLOOR_AREA_DISTRIBUTION, params],
		queryFn: async () => {
			const response = await dashboardApi.getFloorAreaDistribution(params);

			// Map API response to normalized format
			return {
				success: response.success,
				message: response.message,
				data: response.data.data,
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useStoreWorkCategoryDistribution = (
	params?: StoreWorkCategoryDistributionParams
) => {
	return useQuery<StoreWorkCategoryDistributionResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_STORE_WORK_CATEGORY_DISTRIBUTION, params],
		queryFn: async () => {
			const response = await dashboardApi.getStoreWorkCategoryDistribution(params);

			// Map API response to normalized format
			return {
				success: response.success,
				message: response.message,
				data: response.data.data.map((item) => ({
					store_name: item.store_name,
					categories: item.work_categories.map((cat) => ({
						category_name: cat.label,
						count: cat.value,
					})),
				})),
				pagination: {
					page: response.data.pagination.page,
					limit: response.data.pagination.limit,
					total: response.data.pagination.total_items,
					total_pages: response.data.pagination.total_pages,
				},
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useTrendTotalRequest = (params?: DashboardFilterParams) => {
	return useQuery<TrendTotalRequestResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_TREND_TOTAL_REQUEST, params],
		queryFn: async () => {
			const response = await dashboardApi.getTrendTotalRequest(params);

			// Map API response to normalized format
			return {
				success: response.success,
				message: response.message,
				data: response.data.data.map((item) => ({
					period: item.date,
					total: item.total_request,
				})),
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useAverageMaintenanceDuration = (params?: DashboardFilterParams) => {
	return useQuery<AverageMaintenanceDurationResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_AVERAGE_MAINTENANCE_DURATION, params],
		queryFn: async () => {
			const response = await dashboardApi.getAverageMaintenanceDuration(params);

			// Map API response to normalized format
			// Calculate weighted average for each category
			return {
				success: response.success,
				message: response.message,
				data: response.data.data.map((item) => {
					const totalTickets = item.priorities.reduce(
						(sum, p) => sum + p.ticket_count,
						0
					);
					const weightedSum = item.priorities.reduce(
						(sum, p) => sum + p.average_days * p.ticket_count,
						0
					);
					const avgDuration = totalTickets > 0 ? weightedSum / totalTickets : 0;

					return {
						category_name: item.work_category_name,
						average_duration: Math.round(avgDuration * 100) / 100,
						unit: 'days',
					};
				}),
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const usePreparationSLAAverage = (params?: DashboardFilterParams) => {
	return useQuery<PreparationSLAAverageResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_PREPARATION_SLA_AVERAGE, params],
		queryFn: async () => {
			const response = await dashboardApi.getPreparationSLAAverage(params);

			// Calculate weighted average from all priorities
			const { data: priorities } = response.data;
			const totalTickets = priorities.reduce((sum, p) => sum + p.ticket_count, 0);
			const weightedSum = priorities.reduce(
				(sum, p) => sum + p.average_hours * p.ticket_count,
				0
			);
			const average = totalTickets > 0 ? weightedSum / totalTickets : 0;

			return {
				success: response.success,
				message: response.message,
				data: {
					average: Math.round(average * 100) / 100,
					unit: 'hours',
				},
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useFixingSLAAverage = (params?: DashboardFilterParams) => {
	return useQuery<FixingSLAAverageResponse>({
		queryKey: [...QUERY_KEYS.DASHBOARD_FIXING_SLA_AVERAGE, params],
		queryFn: async () => {
			const response = await dashboardApi.getFixingSLAAverage(params);

			// Calculate weighted average from all priorities
			const { data: priorities } = response.data;
			const totalTickets = priorities.reduce((sum, p) => sum + p.ticket_count, 0);
			const weightedSum = priorities.reduce(
				(sum, p) => sum + p.average_hours * p.ticket_count,
				0
			);
			const average = totalTickets > 0 ? weightedSum / totalTickets : 0;

			return {
				success: response.success,
				message: response.message,
				data: {
					average: Math.round(average * 100) / 100,
					unit: 'hours',
				},
			};
		},
		staleTime: 1000 * 60 * 5,
	});
};
