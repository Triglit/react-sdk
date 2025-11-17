"use client";

import type {
	UseMutateAsyncFunction,
	UseMutateFunction,
} from "@tanstack/react-query";
import type { TriggerType } from "index.js";
import type { Trigger } from "triglit/resources.js";

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
	trigger: Trigger | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => void;
	createTrigger: UseMutateFunction<
		Trigger,
		Error,
		{
			workflowVersionId: string;
			type: TriggerType;
			name?: string | undefined;
			config?: Record<string, unknown> | undefined;
			isActive?: boolean | undefined;
		},
		unknown
	>;
	createTriggerAsync: UseMutateAsyncFunction<
		Trigger,
		Error,
		{
			workflowVersionId: string;
			type: TriggerType;
			name?: string | undefined;
			config?: Record<string, unknown> | undefined;
			isActive?: boolean | undefined;
		},
		unknown
	>;
	updateTrigger: UseMutateFunction<
		Trigger,
		Error,
		{
			triggerId: string;
			name?: string | undefined;
			config?: Record<string, unknown> | undefined;
			isActive?: boolean | undefined;
		},
		unknown
	>;
	updateTriggerAsync: UseMutateAsyncFunction<
		Trigger,
		Error,
		{
			triggerId: string;
			name?: string | undefined;
			config?: Record<string, unknown> | undefined;
			isActive?: boolean | undefined;
		},
		unknown
	>;
	deleteTrigger: UseMutateFunction<void, Error, string, unknown>;
	deleteTriggerAsync: UseMutateAsyncFunction<void, Error, string, unknown>;
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
		createTrigger: createMutation.mutate,
		createTriggerAsync: createMutation.mutateAsync,
		updateTrigger: updateMutation.mutate,
		updateTriggerAsync: updateMutation.mutateAsync,
		deleteTrigger: deleteMutation.mutate,
		deleteTriggerAsync: deleteMutation.mutateAsync,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeleting: deleteMutation.isPending,
	};
}
