"use client";

import type {
	UseMutateAsyncFunction,
	UseMutateFunction,
} from "@tanstack/react-query";
import type {
	VersionCreateParams,
	VersionPublishResponse,
	VersionUpdateParams,
	WorkflowVersion,
} from "triglit/resources/workflows.mjs";

import {
	useCreateWorkflowVersion,
	usePublishWorkflowVersion,
	useUpdateWorkflowVersion,
	useWorkflowVersion as useWorkflowVersionQuery,
} from "./api/use-workflow-versions.js";

export interface UseWorkflowVersionReturn {
	version: WorkflowVersion | undefined;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	refetch: () => void;
	createVersion: UseMutateFunction<
		WorkflowVersion,
		Error,
		VersionCreateParams,
		unknown
	>;
	createVersionAsync: UseMutateAsyncFunction<
		WorkflowVersion,
		Error,
		VersionCreateParams,
		unknown
	>;
	updateVersion: UseMutateFunction<
		WorkflowVersion,
		Error,
		{
			versionId: string;
			data: VersionUpdateParams;
		},
		unknown
	>;
	updateVersionAsync: UseMutateAsyncFunction<
		WorkflowVersion,
		Error,
		{
			versionId: string;
			data: VersionUpdateParams;
		},
		unknown
	>;
	publishVersion: UseMutateFunction<
		VersionPublishResponse,
		Error,
		string,
		unknown
	>;
	publishVersionAsync: UseMutateAsyncFunction<
		VersionPublishResponse,
		Error,
		string,
		unknown
	>;
	isCreating: boolean;
	isUpdating: boolean;
	isPublishing: boolean;
}

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
): UseWorkflowVersionReturn {
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
