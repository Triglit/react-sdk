/**
 * Core types for the Triglit React SDK
 */

import type {
	VersionPublishResponse,
	Workflow,
} from "triglit/resources/workflows.mjs";

/**
 * Callbacks for mutation events
 */
export interface TriglitMutationCallbacks {
	/**
	 * Called when a workflow version is created successfully
	 */
	onWorkflowVersionCreated?: (data: WorkflowVersion) => void;
	/**
	 * Called when creating a workflow version fails
	 */
	onWorkflowVersionCreateError?: (error: Error) => void;
	/**
	 * Called when a workflow version is updated successfully
	 */
	onWorkflowVersionUpdated?: (data: WorkflowVersion) => void;
	/**
	 * Called when updating a workflow version fails
	 */
	onWorkflowVersionUpdateError?: (error: Error) => void;
	/**
	 * Called when a workflow version is published successfully
	 */
	onWorkflowVersionPublished?: (data: VersionPublishResponse) => void;
	/**
	 * Called when publishing a workflow version fails
	 */
	onWorkflowVersionPublishError?: (error: Error) => void;
	/**
	 * Called when a trigger is created successfully
	 */
	onTriggerCreated?: (data: Trigger) => void;
	/**
	 * Called when creating a trigger fails
	 */
	onTriggerCreateError?: (error: Error) => void;
	/**
	 * Called when a trigger is updated successfully
	 */
	onTriggerUpdated?: (data: Trigger) => void;
	/**
	 * Called when updating a trigger fails
	 */
	onTriggerUpdateError?: (error: Error) => void;
	/**
	 * Called when a trigger is deleted successfully
	 */
	onTriggerDeleted?: () => void;
	/**
	 * Called when deleting a trigger fails
	 */
	onTriggerDeleteError?: (error: Error) => void;
	/**
	 * Called when a workflow is created successfully
	 */
	onWorkflowCreated?: (data: Workflow) => void;
	/**
	 * Called when creating a workflow fails
	 */
	onWorkflowCreateError?: (error: Error) => void;
}

/**
 * Configuration options for the Triglit SDK
 */
export interface TriglitConfig {
	/**
	 * API key for authentication (publishable key for frontend)
	 * If not provided, will try to read from environment variables:
	 * - NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY
	 * - TRIGLIT_PUBLISHABLE_KEY
	 */
	apiKey?: string;
	/**
	 * Base URL for the API (defaults to https://api.triglit.com)
	 */
	baseURL?: string;
	/**
	 * Custom i18n translations (optional, defaults to English)
	 */
	i18n?: TriglitI18n;
	/**
	 * Callbacks for mutation events (success and error)
	 */
	callbacks?: TriglitMutationCallbacks;
}

/**
 * i18n translations interface
 * This is a public API that allows users to override translations
 */
export interface TriglitI18n {
	/**
	 * Language code (e.g., 'en', 'pt', 'es')
	 */
	locale?: string;
	/**
	 * Translation function or object
	 */
	translations?: Record<string, string> | ((key: string) => string);
}

/**
 * API status types
 */
export type ApiStatus = "healthy" | "degraded" | "error" | "loading";

/**
 * Node data interface for workflow editor
 */
export interface NodeData extends Record<string, unknown> {
	type: string;
	version?: string;
	name: string;
	description?: string;
	config?: Record<string, unknown>;
	inputSchema?: Record<string, unknown>;
	outputSchema?: Record<string, unknown>;
	isBuiltIn?: boolean;
	configSchema?: Record<string, unknown>;
	canPause?: boolean;
	customName?: string;
	customId?: string;
	_triggerId?: string;
}

/**
 * Trigger configuration types
 */
export type TriggerType = "event" | "schedule" | "webhook" | "queue";

/**
 * Workflow version node structure
 */
export interface WorkflowVersionNode {
	id: string;
	type: string;
	version?: string;
	name: string;
	description?: string;
	config: Record<string, unknown>;
	inputSchema: Record<string, unknown>;
	outputSchema: Record<string, unknown>;
	canPause?: boolean;
	position?: { x: number; y: number };
}

/**
 * Workflow version edge structure
 */
export interface WorkflowVersionEdge {
	id: string;
	sourceNodeId: string;
	targetNodeId: string;
	sourceOutputKey?: string;
	targetInputKey?: string;
	condition?: string;
	label?: string;
}

/**
 * Workflow version structure
 */
export interface WorkflowVersion {
	id: string;
	workflowId: string;
	tenantId: string;
	subTenantId?: string;
	version: number;
	nodes: WorkflowVersionNode[];
	edges: WorkflowVersionEdge[];
	isActive: boolean;
	createdAt: string;
	publishedAt?: string;
}

/**
 * Trigger structure
 */
export interface Trigger {
	id: string;
	workflowVersionId: string;
	type: TriggerType;
	name?: string;
	config?: Record<string, unknown>;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

/**
 * Triggers list response
 */
export interface TriggersListResponse {
	triggers: Trigger[];
}

/**
 * Workflow editor props
 */
export interface WorkflowEditorProps {
	/**
	 * Workflow ID to edit
	 */
	workflowId: string;
	/**
	 * Initial version ID (optional)
	 */
	initialVersionId?: string;
	/**
	 * Callback when workflow is saved
	 */
	onSave?: (versionId: string) => void;
	/**
	 * Custom className for styling
	 */
	className?: string;
}
