"use client";

import type { ReactNode } from "react";

import { useI18n } from "../../hooks/use-i18n.js";

/**
 * Node registry item structure
 * Compatible with RegistryNodeDto from the API
 */
export interface NodeRegistryItem {
	type: string;
	name: string;
	description?: string;
	configSchema?: Record<string, unknown>;
	isBuiltIn?: boolean;
	version?: string;
	inputSchema?: Record<string, unknown>;
	outputSchema?: Record<string, unknown>;
	canPause?: boolean;
	[key: string]: unknown;
}

/**
 * Props for WorkflowNodesList component
 */
export interface WorkflowNodesListProps {
	/**
	 * List of available nodes from registry
	 */
	nodes?: NodeRegistryItem[];
	/**
	 * Callback when a node is clicked to add
	 */
	onAddNode: (nodeType: string) => void;
	/**
	 * Render function for each node item
	 * @param node - The node registry item
	 * @param onAdd - Callback to add the node
	 */
	renderNode?: (node: NodeRegistryItem, onAdd: () => void) => ReactNode;
	/**
	 * Render function for empty state
	 */
	renderEmpty?: () => ReactNode;
	/**
	 * Custom className for the container
	 */
	className?: string;
	/**
	 * Custom className for the list container
	 */
	listClassName?: string;
}

/**
 * Unstyled component for rendering a list of available nodes
 * This component provides the structure and logic but no styling,
 * allowing clients to build their own custom layouts
 *
 * @example
 * ```tsx
 * <WorkflowNodesList
 *   nodes={nodeRegistry?.nodes || []}
 *   onAddNode={(type) => handleAddNode(type)}
 *   renderNode={(node, onAdd) => (
 *     <button onClick={onAdd}>{node.name}</button>
 *   )}
 *   renderEmpty={() => <div>No nodes available</div>}
 * />
 * ```
 */
export function WorkflowNodesList({
	nodes = [],
	onAddNode,
	renderNode,
	renderEmpty,
	className,
	listClassName,
}: WorkflowNodesListProps) {
	const t = useI18n();

	const defaultRenderNode = (node: NodeRegistryItem) => (
		<button
			type="button"
			onClick={() => onAddNode(node.type)}
			aria-label={t("workflow.editor.addNodeAria", { name: node.name })}
		>
			{node.name}
			{node.description && <span>{node.description}</span>}
		</button>
	);

	const defaultRenderEmpty = () => (
		<div>
			<p>{t("workflow.editor.noNodesAvailable")}</p>
			<p>{t("workflow.editor.noNodesDescription")}</p>
		</div>
	);

	if (!nodes || nodes.length === 0) {
		return (
			<div className={className}>
				{renderEmpty ? renderEmpty() : defaultRenderEmpty()}
			</div>
		);
	}

	return (
		<div className={className}>
			<div className={listClassName}>
				{nodes.map((node) => (
					<div key={node.type}>
						{renderNode
							? renderNode(node, () => onAddNode(node.type))
							: defaultRenderNode(node)}
					</div>
				))}
			</div>
		</div>
	);
}
