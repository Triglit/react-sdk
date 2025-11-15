"use client";

import {
	useCreateWorkflowVersion,
	usePublishWorkflowVersion,
	useUpdateWorkflowVersion,
	useWorkflowVersion as useWorkflowVersionQuery,
} from "./api/use-workflow-versions.js";

/**
 * Hook to manage a specific workflow version
 * This is a convenience hook that wraps the API hooks
 *
 * @param versionId - Version ID
 * @param options - Query options
 * @returns Version data and operations
 *
 * @example
 * ```tsx
 * const { version, isLoading, updateVersion, publishVersion } = useWorkflowVersion(versionId);
 * ```
 */
export function useWorkflowVersion(
	versionId: string,
	options?: { enabled?: boolean },
) {
	const versionQuery = useWorkflowVersionQuery(versionId, options);
	const createMutation = useCreateWorkflowVersion();
	const updateMutation = useUpdateWorkflowVersion();
	const publishMutation = usePublishWorkflowVersion();

	return {
		version: versionQuery.data,
		isLoading: versionQuery.isLoading,
		isError: versionQuery.isError,
		error: versionQuery.error,
		refetch: versionQuery.refetch,
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
