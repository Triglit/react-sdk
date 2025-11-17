"use client";

import {
	type UseMutationResult,
	type UseQueryResult,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import type {
	VersionCreateParams,
	VersionPublishResponse,
	VersionUpdateParams,
	WorkflowVersionsPageBased,
} from "triglit/resources/workflows.mjs";

import { useTriglit } from "../use-triglit.js";

/**
 * Hook to list workflow versions
 * Uses Triglit's pagination API with pageSize
 *
 * @param options - Query options
 * @param options.workflowId - Optional workflow ID to filter versions
 * @param options.pageSize - Number of items per page (default: API default)
 * @param options.enabled - Whether the query is enabled
 * @returns Query result with paginated data
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useWorkflowVersions({
 *   workflowId: 'wf_123',
 *   pageSize: 20
 * });
 *
 * // Access paginated data
 * const versions = data?.data || [];
 * const hasMore = data?.hasNextPage() || false;
 * ```
 */
export function useWorkflowVersions(options?: {
	workflowId?: string;
	pageSize?: number;
	enabled?: boolean;
}): UseQueryResult<WorkflowVersionsPageBased, Error> {
	const { client } = useTriglit();

	return useQuery({
		queryKey: [
			"triglit",
			"workflow-versions",
			options?.workflowId,
			options?.pageSize,
		],
		queryFn: async () => {
			if (options?.workflowId) {
				return client.workflows.versions.list0(options.workflowId, {
					pageSize: options?.pageSize,
				});
			}
			// If no workflowId, we can't list versions
			// This should be handled by the enabled option
			throw new Error("workflowId is required to list workflow versions");
		},
		enabled: options?.enabled !== false && !!options?.workflowId,
	});
}

/**
 * Hook to retrieve a specific workflow version
 */
export function useWorkflowVersion(
	versionId: string,
	options?: { enabled?: boolean },
) {
	const { client } = useTriglit();

	return useQuery({
		queryKey: ["triglit", "workflow-versions", versionId],
		queryFn: async () => {
			return client.workflows.versions.retrieve0(versionId);
		},
		enabled: options?.enabled !== false && !!versionId,
	});
}

/**
 * Hook to create a workflow version
 */
export function useCreateWorkflowVersion() {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: VersionCreateParams) => {
			// Ensure inputSchema, outputSchema, config, position, and version are always set
			const normalizedData = {
				...data,
				nodes: data.nodes.map((node) => ({
					...node,
					version: node.version || "1.0.0",
					inputSchema: node.inputSchema || {},
					outputSchema: node.outputSchema || {},
					config: node.config || {},
					position: node.position || { x: 0, y: 0 },
				})),
			};
			return client.workflows.versions.create(
				normalizedData as unknown as Parameters<
					typeof client.workflows.versions.create
				>[0],
			);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflow-versions"],
			});
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflows", variables.workflowId],
			});
			callbacks.onWorkflowVersionCreated?.(data);
		},
		onError: (error) => {
			callbacks.onWorkflowVersionCreateError?.(error);
		},
	});
}

/**
 * Hook to update a workflow version
 */
export function useUpdateWorkflowVersion() {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			versionId,
			data,
		}: {
			versionId: string;
			data: VersionUpdateParams;
		}) => {
			return client.workflows.versions.update(versionId, data);
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflow-versions", variables.versionId],
			});
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflow-versions"],
			});
			callbacks.onWorkflowVersionUpdated?.(data);
		},
		onError: (error) => {
			callbacks.onWorkflowVersionUpdateError?.(error);
		},
	});
}

/**
 * Hook to publish a workflow version
 */
export function usePublishWorkflowVersion(): UseMutationResult<
	VersionPublishResponse,
	Error,
	string,
	unknown
> {
	const { client, callbacks } = useTriglit();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (versionId: string) => {
			return client.workflows.versions.publish(versionId);
		},
		onSuccess: (data) => {
			// VersionPublishResponse has a 'version' property that is a WorkflowVersion object
			const versionId =
				"version" in data &&
				typeof data.version === "object" &&
				data.version !== null &&
				"id" in data.version
					? (data.version as { id: string }).id
					: typeof data === "object" &&
							data !== null &&
							"versionId" in data
						? (data as { versionId: string }).versionId
						: "";
			if (versionId) {
				queryClient.invalidateQueries({
					queryKey: ["triglit", "workflow-versions", versionId],
				});
			}
			queryClient.invalidateQueries({
				queryKey: ["triglit", "workflow-versions"],
			});
			callbacks.onWorkflowVersionPublished?.(data);
		},
		onError: (error) => {
			callbacks.onWorkflowVersionPublishError?.(error);
		},
	});
}
