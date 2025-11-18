/**
 * @triglit/react-sdk
 * React SDK for Triglit - Components and hooks for building workflow automation UIs
 */

// Client
export {
	createTriglitClient,
	getApiKeyFromEnv,
} from "./client/triglit-client.js";
// Status Components
export {
	TriglitDegraded,
	type TriglitDegradedProps,
} from "./components/status/triglit-degraded.js";
export {
	TriglitError,
	type TriglitErrorProps,
} from "./components/status/triglit-error.js";
export {
	TriglitLoading,
	type TriglitLoadingProps,
} from "./components/status/triglit-loading.js";
export {
	NodeConfigDialog,
	type NodeConfigDialogProps,
} from "./components/workflow-editor/node-config-dialog.js";
export {
	OneWayLeftNode,
	type OneWayLeftNodeProps,
} from "./components/workflow-editor/nodes/one-way-left.js";
export {
	OneWayRightNode,
	type OneWayRightNodeProps,
} from "./components/workflow-editor/nodes/one-way-right.js";
export {
	TwoWayNode,
	type TwoWayNodeProps,
} from "./components/workflow-editor/nodes/two-way.js";
export {
	WorkflowCanvas,
	type WorkflowCanvasProps,
} from "./components/workflow-editor/workflow-canvas.js";
export { WorkflowEditor } from "./components/workflow-editor/workflow-editor.js";
// Components
export {
	WorkflowEditorHeader,
	type WorkflowEditorHeaderProps,
} from "./components/workflow-editor/workflow-editor-header.js";
export {
	type NodeRegistryItem,
	WorkflowNodesList,
	type WorkflowNodesListProps,
} from "./components/workflow-editor/workflow-nodes-list.js";
export {
	WorkflowTriggersList,
	type WorkflowTriggersListProps,
} from "./components/workflow-editor/workflow-triggers-list.js";
// API Hooks
export {
	useCreateTrigger,
	useDeleteTrigger,
	useTrigger as useTriggerQuery,
	useTriggers,
	useUpdateTrigger,
} from "./hooks/api/use-triggers.js";
export {
	useCreateWorkflowVersion,
	usePublishWorkflowVersion,
	useUpdateWorkflowVersion,
	useWorkflowVersion as useWorkflowVersionQuery,
	useWorkflowVersions,
} from "./hooks/api/use-workflow-versions.js";
export {
	useCreateWorkflow,
	useDeleteWorkflow,
	useUpdateWorkflow,
	useWorkflow as useWorkflowQuery,
	useWorkflows,
} from "./hooks/api/use-workflows.js";
// Hooks (convenience wrappers)
export { useApiStatus } from "./hooks/use-api-status.js";
export { useI18n } from "./hooks/use-i18n.js";
export { useTrigger } from "./hooks/use-trigger.js";
export { useTriglit } from "./hooks/use-triglit.js";
export { useTriglitCallbacks } from "./hooks/use-triglit-callbacks.js";
export { useWorkflow } from "./hooks/use-workflow.js";
export { useWorkflowVersion } from "./hooks/use-workflow-version.js";
export {
	TriglitContext,
	type TriglitContextValue,
} from "./provider/triglit-context.js";
// Provider
export {
	TriglitProvider,
	type TriglitProviderProps,
} from "./provider/triglit-provider.js";
// Types
export type {
	ApiStatus,
	NodeData,
	Trigger,
	TriggersListResponse,
	TriggerType,
	TriglitConfig,
	TriglitI18n,
	TriglitMutationCallbacks,
	WorkflowEditorProps,
	WorkflowVersion,
	WorkflowVersionEdge,
	WorkflowVersionNode,
} from "./types/index.js";
export type { SupportedLocale } from "./utils/i18n/translations/index.js";
export {
	en,
	getTranslationsForLocale,
	ptBR,
	translations,
} from "./utils/i18n/translations/index.js";
export type { TranslationPackage, TranslationVariables } from "./utils/i18n.js";
export { t } from "./utils/i18n.js";
// Utils
export {
	convertTriggerConfigToApi,
	getTriggerConfigSchemas,
} from "./utils/trigger-config-converter.js";
export { hasCycle, validateEdges, validateNode } from "./utils/validation.js";
