"use client";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Workflow } from "triglit/resources.js";

import { useTriglit } from "../use-triglit.js";

/**
 * Hook to list workflows
 * Uses Triglit's pagination API with pageSize
 *
 * @param options - Query options
 * @param options.pageSize - Number of items per page (default: API default)
 * @param options.enabled - Whether the query is enabled
 * @returns Query result with paginated data
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useWorkflows({ pageSize: 20 });
 *
 * // Access paginated data
 * const workflows = data?.data || [];
 * const hasMore = data?.hasNextPage() || false;
 * ```
 */
export function useWorkflows(options?: {
	pageSize?: number;
	enabled?: boolean;
}): UseQueryResult<unknown, Error> {
	const { client } = useTriglit();

	return useQuery({
		queryKey: ["triglit", "workflows", options?.pageSize],
		queryFn: async () => {
			return client.workflows.list({
				pageSize: options?.pageSize,
			});
		},
		enabled: options?.enabled !== false,
	});
}

/**
 * Hook to retrieve a specific workflow
 *
 * @param workflowId - Workflow ID
 * @param options - Query options
 * @returns Query result with workflow data
 */
export function useWorkflow(
	workflowId: string,
	options?: { enabled?: boolean },
): UseQueryResult<unknown, Error> {
	const { client } = useTriglit();

	return useQuery({
		queryKey: ["triglit", "workflows", workflowId],
		queryFn: async () => {
			return client.workflows.retrieve(workflowId);
		},
		enabled: options?.enabled !== false && !!workflowId,
	});
}

/**
 * Hook to create a workflow
 *
 * @returns Mutation result for creating a workflow
 *
 * @example
 * ```tsx
 * const createWorkflow = useCreateWorkflow();
 *
 * const handleCreate = () => {
 *   createWorkflow.mutate({
 *     name: "My Workflow",
 *     description: "Workflow description"
 *   });
 * };
 * ```
 */
export function useCreateWorkflow(): UseMutationResult<
	unknown,
	Error,
	{ name: string; description?: string },
	unknown
> {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: { name: string; description?: string }) => {
			// Type assertion needed as the SDK types may not be fully exposed
			// The public API SDK should have a create method according to documentation
			return (
				client.workflows as unknown as {
					create: (data: {
						name: string;
						description?: string;
					}) => Promise<unknown>;
				}
			).create(data);
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflows"],
			});
			callbacks.onWorkflowCreated?.(data as Workflow);
		},
		onError: (error) => {
			callbacks.onWorkflowCreateError?.(error);
		},
	});
}
