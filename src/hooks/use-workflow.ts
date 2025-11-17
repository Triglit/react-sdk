"use client";

import type {
	UseMutateAsyncFunction,
	UseMutateFunction,
} from "@tanstack/react-query";
import type { Workflow } from "triglit/resources.js";

import {
	useCreateWorkflow,
	useWorkflow as useWorkflowQuery,
} from "./api/use-workflows.js";

export interface UseWorkflowReturn {
	workflow: Workflow | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => void;
	createWorkflow: UseMutateFunction<
		unknown,
		Error,
		{
			name: string;
			description?: string | undefined;
		},
		unknown
	>;
	createWorkflowAsync: UseMutateAsyncFunction<
		unknown,
		Error,
		{
			name: string;
			description?: string | undefined;
		},
		unknown
	>;
	isCreating: boolean;
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
 * const { workflow, isLoading, createWorkflow } = useWorkflow(workflowId);
 * ```
 */
export function useWorkflow(
	workflowId: string,
	options?: { enabled?: boolean },
): UseWorkflowReturn {
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
