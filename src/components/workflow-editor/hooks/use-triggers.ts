"use client";

import {
	useCreateTrigger,
	useDeleteTrigger,
	useTriggers as useTriggersQuery,
	useUpdateTrigger,
} from "../../../hooks/api/use-triggers.js";

/**
 * Hook for managing triggers in the editor
 * @param versionId - Version ID
 * @returns Triggers data and operations
 */
export function useTriggersEditor(versionId: string | undefined) {
	const triggersQuery = useTriggersQuery({
		workflowVersionId: versionId,
		enabled: !!versionId,
	});
	const createMutation = useCreateTrigger();
	const updateMutation = useUpdateTrigger();
	const deleteMutation = useDeleteTrigger();

	return {
		triggers: triggersQuery.data,
		isLoading: triggersQuery.isLoading,
		isError: triggersQuery.isError,
		error: triggersQuery.error,
		createTrigger: createMutation.mutate,
		createTriggerAsync: createMutation.mutateAsync,
		updateTrigger: updateMutation.mutate,
		updateTriggerAsync: updateMutation.mutateAsync,
		deleteTrigger: deleteMutation.mutate,
		deleteTriggerAsync: deleteMutation.mutateAsync,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeleting: deleteMutation.isPending,
	};
}
