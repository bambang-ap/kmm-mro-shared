/**
 * Query Keys for TanStack Query
 * Centralized query key management
 */

export const QUERY_KEYS = {
	// Auth
	AUTH: ['auth'] as const,

	// Stores
	STORES: ['stores'] as const,
	get STORES_LIST() {
		return [...this.STORES, 'list'] as const;
	},
	get STORES_DETAIL() {
		return [...this.STORES, 'detail'] as const;
	},

	// Locations
	LOCATIONS: ['locations'] as const,
	get LOCATIONS_LIST() {
		return [...this.LOCATIONS, 'list'] as const;
	},
	get LOCATIONS_DETAIL() {
		return [...this.LOCATIONS, 'detail'] as const;
	},
	COUNTRIES: ['countries'] as const,
	SUBLOCATIONS: ['sublocations'] as const,
	LOCATION_HIERARCHIES: ['hierarchies'] as const,

	// Roles
	ROLES: ['roles'] as const,
	get ROLES_LIST() {
		return [...this.ROLES, 'list'] as const;
	},
	get ROLES_DETAIL() {
		return [...this.ROLES, 'detail'] as const;
	},

	// Menus
	MENUS: ['menus'] as const,
	get MENUS_BY_ROLE() {
		return [...this.MENUS, 'by-role'] as const;
	},
	ACTIVE_MENUS: ['active_menus'] as const,

	// Users (Accounts)
	USERS: ['users'] as const,
	get USERS_LIST() {
		return [...this.USERS, 'list'] as const;
	},
	get USERS_DETAIL() {
		return [...this.USERS, 'detail'] as const;
	},

	// Work Categories
	WORK_CATEGORIES: ['work-categories'] as const,

	// Floor Areas
	FLOOR_AREAS: ['floor-areas'] as const,

	// Room Areas
	ROOM_AREAS: ['room-areas'] as const,

	// Reason Pendings
	REASON_PENDINGS: ['reason-pendings'] as const,

	// Reason Transfers
	REASON_TRANSFERS: ['reason-transfers'] as const,

	// Reason Rejects
	REASON_REJECTS: ['reason-rejects'] as const,

	// Ticket Priorities
	TICKET_PRIORITIES: ['ticket-priorities'] as const,

	// Tickets
	TICKETS: ['tickets'] as const,
	get TICKET_STATUS_COUNT() {
		return [...this.TICKETS, 'status-count'] as const;
	},
	get TICKET_DETAIL() {
		return [...this.TICKETS, 'detail'] as const;
	},
	get TICKET_ACTIVITIES() {
		return [...this.TICKETS, 'activities'] as const;
	},
	get TICKET_HISTORIES() {
		return [...this.TICKETS, 'histories'] as const;
	},

	// Assignees
	ASSIGNEES: ['assignees'] as const,
};
