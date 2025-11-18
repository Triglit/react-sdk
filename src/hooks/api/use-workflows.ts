"use client";

import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
	WorkflowCreateParams,
	WorkflowUpdateParams,
} from "triglit/resources";
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
}) {
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
): UseQueryResult<Workflow, Error> {
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
	Workflow,
	Error,
	WorkflowCreateParams,
	unknown
> {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: WorkflowCreateParams) => {
			return client.workflows.create(data);
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

/**
 * Hook to update a workflow
 *
 * @returns Mutation result for updating a workflow
 *
 * @example
 * ```tsx
 * const updateWorkflow = useUpdateWorkflow();
 *
 * const handleUpdate = () => {
 *   updateWorkflow.mutate({
 *     workflowId: 'wf_123',
 *     data: {
 *       name: "Updated Workflow Name",
 *       description: "Updated description"
 *     }
 *   });
 * };
 * ```
 */
export function useUpdateWorkflow() {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			workflowId,
			data,
		}: {
			workflowId: string;
			data: WorkflowUpdateParams;
		}) => {
			return client.workflows.update(workflowId, data);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflows", variables.workflowId],
			});
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflows"],
			});
			callbacks.onWorkflowUpdated?.(data as Workflow);
		},
		onError: (error) => {
			callbacks.onWorkflowUpdateError?.(error);
		},
	});
}

/**
 * Hook to delete a workflow
 *
 * @returns Mutation result for deleting a workflow
 *
 * @example
 * ```tsx
 * const deleteWorkflow = useDeleteWorkflow();
 *
 * const handleDelete = () => {
 *   deleteWorkflow.mutate('wf_123');
 * };
 * ```
 */
export function useDeleteWorkflow() {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (workflowId: string) => {
			return client.workflows.delete(workflowId);
		},
		onSuccess: (_, workflowId) => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflows", workflowId],
			});
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflows"],
			});
			callbacks.onWorkflowDeleted?.();
		},
		onError: (error) => {
			callbacks.onWorkflowDeleteError?.(error);
		},
	});
}
