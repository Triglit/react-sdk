"use client";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Trigger } from "triglit/resources.js";

import type { TriggerType } from "../../types/index.js";
import { useTriglit } from "../use-triglit.js";

/**
 * Hook to list triggers
 * Uses Triglit's pagination API with pageSize
 *
 * _IMPORTANT_: Refetch options are disabled to prevent data loss in the editor.
 * When users are editing a workflow version, automatic refetches would overwrite
 * their unsaved changes. Manual refetch is still available via the refetch function.
 *
 * @param options - Query options
 * @param options.workflowVersionId - Optional workflow version ID to filter triggers
 * @param options.pageSize - Number of items per page (default: API default)
 * @param options.enabled - Whether the query is enabled
 * @returns Query result with paginated data
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useTriggers({
 *   workflowVersionId: 'wfv_123',
 *   pageSize: 20
 * });
 *
 * // Access paginated data
 * const triggers = data?.data || [];
 * const hasMore = data?.hasNextPage() || false;
 * ```
 */
export function useTriggers(options?: {
	workflowVersionId?: string;
	pageSize?: number;
	enabled?: boolean;
}) {
	const { client } = useTriglit();

	return useQuery({
		queryKey: [
			"triglit",
			"triggers",
			options?.workflowVersionId,
			options?.pageSize,
		],
		queryFn: async () => {
			if (options?.workflowVersionId) {
				return client.triggers.listByWorkflowVersion(
					options.workflowVersionId,
					{
						pageSize: options?.pageSize,
					},
				);
			}
			return client.triggers.list({
				pageSize: options?.pageSize,
			});
		},
		enabled: options?.enabled !== false,
		// Disable automatic refetches to prevent data loss in the editor
		// Triggers are managed separately and refetches could cause desynchronization
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});
}

/**
 * Hook to retrieve a specific trigger
 *
 * @param triggerId - Trigger ID
 * @param options - Query options
 * @returns Query result with trigger data
 */
export function useTrigger(
	triggerId: string,
	options?: { enabled?: boolean },
): UseQueryResult<Trigger, Error> {
	const { client } = useTriglit();

	return useQuery({
		queryKey: ["triglit", "triggers", triggerId],
		queryFn: async () => {
			return client.triggers.retrieve(triggerId);
		},
		enabled: options?.enabled !== false && !!triggerId,
	});
}

/**
 * Hook to create a trigger
 *
 * @returns Mutation result for creating a trigger
 *
 * @example
 * ```tsx
 * const createTrigger = useCreateTrigger();
 *
 * const handleCreate = () => {
 *   createTrigger.mutate({
 *     workflowVersionId: 'wfv_123',
 *     type: 'webhook',
 *     name: 'My Trigger',
 *     config: { path: '/webhook' }
 *   });
 * };
 * ```
 */
export function useCreateTrigger() {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			workflowVersionId: string;
			type: TriggerType;
			name?: string;
			config?: Record<string, unknown>;
			isActive?: boolean;
		}) => {
			// Ensure config is always an object
			const normalizedData = {
				...data,
				config: data.config || {},
			};
			return client.triggers.create(
				normalizedData as unknown as Parameters<
					typeof client.triggers.create
				>[0],
			);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "triggers"],
			});
			queryClient.invalidateQueries({
				queryKey: ["triglit", "triggers", variables.workflowVersionId],
			});
			callbacks.onTriggerCreated?.(data);
		},
		onError: (error) => {
			callbacks.onTriggerCreateError?.(error);
		},
	});
}

/**
 * Hook to update a trigger
 *
 * @returns Mutation result for updating a trigger
 *
 * @example
 * ```tsx
 * const updateTrigger = useUpdateTrigger();
 *
 * const handleUpdate = () => {
 *   updateTrigger.mutate({
 *     triggerId: 'trg_123',
 *     name: 'Updated Trigger',
 *     config: { path: '/updated' }
 *   });
 * };
 * ```
 */
export function useUpdateTrigger() {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: {
			triggerId: string;
			name?: string;
			config?: Record<string, unknown>;
			isActive?: boolean;
		}) => {
			const { triggerId, ...updateData } = data;
			return client.triggers.update(triggerId, updateData);
		},
		onSuccess: (data) => {
			// Type assertion needed as the SDK types may not be fully exposed
			const triggerData = data as { id: string } | undefined;
			if (triggerData?.id) {
				queryClient.invalidateQueries({
					queryKey: ["triglit", "triggers", triggerData.id],
				});
			}
			queryClient.invalidateQueries({
				queryKey: ["triglit", "triggers"],
			});
			callbacks.onTriggerUpdated?.(data);
		},
		onError: (error) => {
			callbacks.onTriggerUpdateError?.(error);
		},
	});
}

/**
 * Hook to delete a trigger
 *
 * @returns Mutation result for deleting a trigger
 *
 * @example
 * ```tsx
 * const deleteTrigger = useDeleteTrigger();
 *
 * const handleDelete = () => {
 *   deleteTrigger.mutate('trg_123');
 * };
 * ```
 */
export function useDeleteTrigger(): UseMutationResult<
	void,
	Error,
	string,
	unknown
> {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (triggerId: string) => {
			return client.triggers.delete(triggerId);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "triggers"],
			});
			callbacks.onTriggerDeleted?.();
		},
		onError: (error) => {
			callbacks.onTriggerDeleteError?.(error);
		},
	});
}
