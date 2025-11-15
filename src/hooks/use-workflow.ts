"use client";

import {
	useCreateWorkflow,
	useWorkflow as useWorkflowQuery,
} from "./api/use-workflows.js";

/**
 * Hook to manage a specific workflow
 * This is a convenience hook that wraps the API hooks
 *
 * @param workflowId - Workflow ID
 * @param options - Query options
 * @returns Workflow data and operations
 *
 * @example
 * ```tsx
 * const { workflow, isLoading, createWorkflow } = useWorkflow(workflowId);
 * ```
 */
export function useWorkflow(
	workflowId: string,
	options?: { enabled?: boolean },
) {
	const workflowQuery = useWorkflowQuery(workflowId, options);
	const createMutation = useCreateWorkflow();

	return {
		workflow: workflowQuery.data,
		isLoading: workflowQuery.isLoading,
		isError: workflowQuery.isError,
		error: workflowQuery.error,
		refetch: workflowQuery.refetch,
		createWorkflow: createMutation.mutate,
		createWorkflowAsync: createMutation.mutateAsync,
		isCreating: createMutation.isPending,
	};
}
