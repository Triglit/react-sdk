"use client";

import {
	useCreateWorkflowVersion,
	usePublishWorkflowVersion,
	useUpdateWorkflowVersion,
	useWorkflowVersion as useWorkflowVersionQuery,
} from "../../../hooks/api/use-workflow-versions.js";

/**
 * Return type for useWorkflowVersionEditor hook
 */
type UseWorkflowVersionEditorReturn = {
	version: unknown;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	createVersion: ReturnType<typeof useCreateWorkflowVersion>["mutate"];
	createVersionAsync: ReturnType<
		typeof useCreateWorkflowVersion
	>["mutateAsync"];
	updateVersion: ReturnType<typeof useUpdateWorkflowVersion>["mutate"];
	updateVersionAsync: ReturnType<
		typeof useUpdateWorkflowVersion
	>["mutateAsync"];
	publishVersion: ReturnType<typeof usePublishWorkflowVersion>["mutate"];
	publishVersionAsync: ReturnType<
		typeof usePublishWorkflowVersion
	>["mutateAsync"];
	isCreating: boolean;
	isUpdating: boolean;
	isPublishing: boolean;
};

/**
 * Hook for managing workflow version in the editor
 * @param versionId - Version ID (optional)
 * @param workflowId - Workflow ID
 * @returns Version data and operations
 */
export function useWorkflowVersionEditor(
	versionId: string | undefined,
	_workflowId: string,
): UseWorkflowVersionEditorReturn {
	const versionQuery = useWorkflowVersionQuery(versionId || "", {
		enabled: !!versionId,
	});
	const createMutation = useCreateWorkflowVersion();
	const updateMutation = useUpdateWorkflowVersion();
	const publishMutation = usePublishWorkflowVersion();

	return {
		version: versionQuery.data,
		isLoading: versionQuery.isLoading,
		isError: versionQuery.isError,
		error: versionQuery.error,
		createVersion: createMutation.mutate,
		createVersionAsync: createMutation.mutateAsync,
		updateVersion: updateMutation.mutate,
		updateVersionAsync: updateMutation.mutateAsync,
		publishVersion: publishMutation.mutate,
		publishVersionAsync: publishMutation.mutateAsync,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isPublishing: publishMutation.isPending,
	};
}
