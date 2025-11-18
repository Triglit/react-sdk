"use client";

import type {
	UseMutateAsyncFunction,
	UseMutateFunction,
} from "@tanstack/react-query";
import type {
	Workflow,
	WorkflowCreateParams,
	WorkflowUpdateParams,
} from "triglit/resources.js";

import {
	useCreateWorkflow,
	useDeleteWorkflow,
	useUpdateWorkflow,
	useWorkflow as useWorkflowQuery,
} from "./api/use-workflows.js";

export interface UseWorkflowReturn {
	workflow: Workflow | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => void;
	createWorkflow: UseMutateFunction<
		Workflow,
		Error,
		WorkflowCreateParams,
		unknown
	>;
	createWorkflowAsync: UseMutateAsyncFunction<
		Workflow,
		Error,
		WorkflowCreateParams,
		unknown
	>;
	updateWorkflow: UseMutateFunction<
		Workflow,
		Error,
		{
			workflowId: string;
			data: WorkflowUpdateParams;
		},
		unknown
	>;
	updateWorkflowAsync: UseMutateAsyncFunction<
		Workflow,
		Error,
		{
			workflowId: string;
			data: WorkflowUpdateParams;
		},
		unknown
	>;
	deleteWorkflow: UseMutateFunction<void, Error, string, unknown>;
	deleteWorkflowAsync: UseMutateAsyncFunction<void, Error, string, unknown>;
	isCreating: boolean;
	isUpdating: boolean;
	isDeleting: boolean;
}

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
 * const { workflow, isLoading, updateWorkflow, deleteWorkflow } = useWorkflow(workflowId);
 * ```
 */
export function useWorkflow(
	workflowId: string,
	options?: { enabled?: boolean },
): UseWorkflowReturn {
	const workflowQuery = useWorkflowQuery(workflowId, options);
	const createMutation = useCreateWorkflow();
	const updateMutation = useUpdateWorkflow();
	const deleteMutation = useDeleteWorkflow();

	return {
		workflow: workflowQuery.data,
		isLoading: workflowQuery.isLoading,
		isError: workflowQuery.isError,
		error: workflowQuery.error,
		refetch: workflowQuery.refetch,
		createWorkflow: createMutation.mutate,
		createWorkflowAsync: createMutation.mutateAsync,
		updateWorkflow: updateMutation.mutate,
		updateWorkflowAsync: updateMutation.mutateAsync,
		deleteWorkflow: deleteMutation.mutate,
		deleteWorkflowAsync: deleteMutation.mutateAsync,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeleting: deleteMutation.isPending,
	};
}
