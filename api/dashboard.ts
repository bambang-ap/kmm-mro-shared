import apiRequest from './helper';

// ============================================================================
// DASHBOARD FILTER PARAMS
// ============================================================================

export interface DashboardFilterParams {
	priority_uuid?: string;
	store_uuid?: string;
	maintenance_type?: 'vendor' | 'internal';
	start_date?: string;
	end_date?: string;
	date_filter_type?: 'due_date' | 'created_at';
}

export interface StoreWorkCategoryDistributionParams extends DashboardFilterParams {
	page?: number;
	limit?: number;
}

export interface TopStoresParams extends DashboardFilterParams {
	limit?: number;
}

// ============================================================================
// DASHBOARD RESPONSE TYPES
// ============================================================================

// Actual API response type
export interface TicketStatusPriorityApiResponse {
	success: boolean;
	message: string;
	data: {
		data: {
			status: string;
			total_request: number;
			priorities: {
				label: string;
				value: number;
			}[];
		}[];
	};
}

// Normalized type used in components
export interface TicketStatusPriorityResponse {
	success: boolean;
	message: string;
	data: {
		status: string;
		total: number;
		priority_breakdown: {
			priority: string;
			count: number;
		}[];
	}[];
}

// Actual API response type
export interface WorkCategoryContributionApiResponse {
	success: boolean;
	message: string;
	data: {
		total: number;
		data: {
			work_category_name: string;
			count: number;
			percentage: number;
		}[];
	};
}

// Normalized type used in components
export interface WorkCategoryContributionResponse {
	success: boolean;
	message: string;
	data: {
		category_name: string;
		count: number;
		percentage: number;
	}[];
}

// Actual API response type
export interface TopStoresApiResponse {
	success: boolean;
	message: string;
	data: {
		data: {
			store_name: string;
			total_request: number;
			priorities: {
				label: string;
				value: number;
			}[];
		}[];
	};
}

// Normalized type used in components
export interface TopStoresResponse {
	success: boolean;
	message: string;
	data: {
		store_name: string;
		total_tickets: number;
	}[];
}

// Actual API response type
export interface FloorAreaDistributionApiResponse {
	success: boolean;
	message: string;
	data: {
		total: number;
		data: {
			floor_area_name: string;
			count: number;
			percentage: number;
		}[];
	};
}

// Normalized type used in components
export interface FloorAreaDistributionResponse {
	success: boolean;
	message: string;
	data: {
		floor_area_name: string;
		count: number;
		percentage: number;
	}[];
}

// Actual API response type
export interface StoreWorkCategoryDistributionApiResponse {
	success: boolean;
	message: string;
	data: {
		data: {
			store_name: string;
			total_request: number;
			work_categories: {
				label: string;
				value: number;
			}[];
		}[];
		pagination: {
			page: number;
			limit: number;
			total_items: number;
			total_pages: number;
		};
	};
}

// Normalized type used in components
export interface StoreWorkCategoryDistributionResponse {
	success: boolean;
	message: string;
	data: {
		store_name: string;
		categories: {
			category_name: string;
			count: number;
		}[];
	}[];
	pagination?: {
		page: number;
		limit: number;
		total: number;
		total_pages: number;
	};
}

// Actual API response type
export interface TrendTotalRequestApiResponse {
	success: boolean;
	message: string;
	data: {
		data: {
			date: string;
			total_request: number;
			priorities: {
				label: string;
				value: number;
			}[];
		}[];
	};
}

// Normalized type used in components
export interface TrendTotalRequestResponse {
	success: boolean;
	message: string;
	data: {
		period: string;
		total: number;
	}[];
}

// Actual API response type
export interface AverageMaintenanceDurationApiResponse {
	success: boolean;
	message: string;
	data: {
		data: {
			work_category_name: string;
			priorities: {
				label: string;
				average_days: number;
				ticket_count: number;
			}[];
		}[];
	};
}

// Normalized type used in components
export interface AverageMaintenanceDurationResponse {
	success: boolean;
	message: string;
	data: {
		category_name: string;
		average_duration: number;
		unit: string;
	}[];
}

// Actual API response type
export interface PreparationSLAAverageApiResponse {
	success: boolean;
	message: string;
	data: {
		total_tickets: number;
		data: {
			label: string;
			average_hours: number;
			ticket_count: number;
		}[];
	};
}

// Normalized type used in components
export interface PreparationSLAAverageResponse {
	success: boolean;
	message: string;
	data: {
		average: number;
		unit: string;
	};
}

// Actual API response type
export interface FixingSLAAverageApiResponse {
	success: boolean;
	message: string;
	data: {
		total_tickets: number;
		data: {
			label: string;
			average_hours: number;
			ticket_count: number;
		}[];
	};
}

// Normalized type used in components
export interface FixingSLAAverageResponse {
	success: boolean;
	message: string;
	data: {
		average: number;
		unit: string;
	};
}

// ============================================================================
// HELPER FUNCTION
// ============================================================================

const buildQueryString = (params: Record<string, unknown>): string => {
	const queryParts: string[] = [];

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== '') {
			queryParts.push(`${key}=${encodeURIComponent(String(value))}`);
		}
	});

	return queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
};

// ============================================================================
// DASHBOARD API SERVICE
// ============================================================================

export const dashboardApi = {
	/**
	 * Get Ticket Status Priority
	 * GET /api/v1/dashboard/ticket-status-priority
	 */
	getTicketStatusPriority: async (
		params?: DashboardFilterParams
	): Promise<TicketStatusPriorityApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<TicketStatusPriorityApiResponse>(
			`/dashboard/ticket-status-priority${queryString}`
		);
	},

	/**
	 * Get Work Category Contribution
	 * GET /api/v1/dashboard/work-category-contribution
	 */
	getWorkCategoryContribution: async (
		params?: DashboardFilterParams
	): Promise<WorkCategoryContributionApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<WorkCategoryContributionApiResponse>(
			`/dashboard/work-category-contribution${queryString}`
		);
	},

	/**
	 * Get Top Stores
	 * GET /api/v1/dashboard/top-stores
	 */
	getTopStores: async (params?: TopStoresParams): Promise<TopStoresApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<TopStoresApiResponse>(`/dashboard/top-stores${queryString}`);
	},

	/**
	 * Get Floor Area Distribution
	 * GET /api/v1/dashboard/floor-area-distribution
	 */
	getFloorAreaDistribution: async (
		params?: DashboardFilterParams
	): Promise<FloorAreaDistributionApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<FloorAreaDistributionApiResponse>(
			`/dashboard/floor-area-distribution${queryString}`
		);
	},

	/**
	 * Get Store Work Category Distribution
	 * GET /api/v1/dashboard/store-work-category-distribution
	 */
	getStoreWorkCategoryDistribution: async (
		params?: StoreWorkCategoryDistributionParams
	): Promise<StoreWorkCategoryDistributionApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<StoreWorkCategoryDistributionApiResponse>(
			`/dashboard/store-work-category-distribution${queryString}`
		);
	},

	/**
	 * Get Trend Total Request
	 * GET /api/v1/dashboard/trend-total-request
	 */
	getTrendTotalRequest: async (
		params?: DashboardFilterParams
	): Promise<TrendTotalRequestApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<TrendTotalRequestApiResponse>(
			`/dashboard/trend-total-request${queryString}`
		);
	},

	/**
	 * Get Average Maintenance Duration
	 * GET /api/v1/dashboard/average-maintenance-duration
	 */
	getAverageMaintenanceDuration: async (
		params?: DashboardFilterParams
	): Promise<AverageMaintenanceDurationApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<AverageMaintenanceDurationApiResponse>(
			`/dashboard/average-maintenance-duration${queryString}`
		);
	},

	/**
	 * Get Preparation SLA Average
	 * GET /api/v1/dashboard/preparation-sla-average
	 */
	getPreparationSLAAverage: async (
		params?: DashboardFilterParams
	): Promise<PreparationSLAAverageApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<PreparationSLAAverageApiResponse>(
			`/dashboard/preparation-sla-average${queryString}`
		);
	},

	/**
	 * Get Fixing SLA Average
	 * GET /api/v1/dashboard/fixing-sla-average
	 */
	getFixingSLAAverage: async (
		params?: DashboardFilterParams
	): Promise<FixingSLAAverageApiResponse> => {
		const queryString = buildQueryString(params || {});
		return apiRequest<FixingSLAAverageApiResponse>(
			`/dashboard/fixing-sla-average${queryString}`
		);
	},
};
