"use client";

import {
	useCreateTrigger,
	useDeleteTrigger,
	useTrigger as useTriggerQuery,
	useUpdateTrigger,
} from "./api/use-triggers.js";

/**
 * Return type for useTrigger hook
 */
export interface UseTriggerReturn {
	trigger: unknown;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => void;
	createTrigger: (data: unknown) => void;
	createTriggerAsync: (data: unknown) => Promise<unknown>;
	updateTrigger: (data: unknown) => void;
	updateTriggerAsync: (data: unknown) => Promise<unknown>;
	deleteTrigger: (id: string) => void;
	deleteTriggerAsync: (id: string) => Promise<void>;
	isCreating: boolean;
	isUpdating: boolean;
	isDeleting: boolean;
}

/**
 * Hook to manage a specific trigger
 * This is a convenience hook that wraps the API hooks
 *
 * @param triggerId - Trigger ID
 * @param options - Query options
 * @returns Trigger data and operations
 *
 * @example
 * ```tsx
 * const { trigger, isLoading, updateTrigger, deleteTrigger } = useTrigger(triggerId);
 * ```
 */
export function useTrigger(
	triggerId: string,
	options?: { enabled?: boolean },
): UseTriggerReturn {
	const triggerQuery = useTriggerQuery(triggerId, options);
	const createMutation = useCreateTrigger();
	const updateMutation = useUpdateTrigger();
	const deleteMutation = useDeleteTrigger();

	return {
		trigger: triggerQuery.data,
		isLoading: triggerQuery.isLoading,
		isError: triggerQuery.isError,
		error: triggerQuery.error,
		refetch: triggerQuery.refetch,
		createTrigger: createMutation.mutate as (data: unknown) => void,
		createTriggerAsync: createMutation.mutateAsync as (
			data: unknown,
		) => Promise<unknown>,
		updateTrigger: updateMutation.mutate as (data: unknown) => void,
		updateTriggerAsync: updateMutation.mutateAsync as (
			data: unknown,
		) => Promise<unknown>,
		deleteTrigger: deleteMutation.mutate as (id: string) => void,
		deleteTriggerAsync: deleteMutation.mutateAsync as (
			id: string,
		) => Promise<void>,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeleting: deleteMutation.isPending,
	};
}
