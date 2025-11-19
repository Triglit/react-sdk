"use client";

import {
	Background,
	Controls,
	type Edge,
	getOutgoers,
	type IsValidConnection,
	type Node,
	type NodeProps,
	type OnConnect,
	ReactFlow,
	type ReactFlowProps,
} from "@xyflow/react";
import { useCallback, useMemo } from "react";

import type { NodeData } from "../../types/index.js";
import { BranchNode } from "./nodes/branch-node.js";
import { OneWayLeftNode } from "./nodes/one-way-left.js";
import { OneWayRightNode } from "./nodes/one-way-right.js";
import { TwoWayNode } from "./nodes/two-way.js";

/**
 * Props for WorkflowCanvas component
 */
export interface WorkflowCanvasProps {
	/**
	 * Nodes to display in the canvas
	 */
	nodes: Node<NodeData>[];
	/**
	 * Edges to display in the canvas
	 */
	edges: Edge[];
	/**
	 * Callback when nodes change
	 */
	onNodesChange: ReactFlowProps<Node<NodeData>>["onNodesChange"];
	/**
	 * Callback when edges change
	 */
	onEdgesChange: ReactFlowProps<Node<NodeData>>["onEdgesChange"];
	/**
	 * Callback when a node is clicked for configuration
	 */
	onNodeConfigClick?: (nodeId: string, data: NodeData) => void;
	/**
	 * Custom connection validation function
	 */
	isValidConnection?: IsValidConnection;
	/**
	 * Callback when a connection is made between nodes
	 */
	onConnect: OnConnect;
	/**
	 * Function to get all nodes (for connection validation)
	 * Must return Node<NodeData>[]
	 */
	getNodes?: () => Node<NodeData>[];
	/**
	 * Function to get all edges (for connection validation)
	 */
	getEdges?: () => Edge[];
	/**
	 * Custom className for the canvas container
	 */
	className?: string;
	/**
	 * Additional ReactFlow props
	 */
	reactFlowProps?: Omit<
		ReactFlowProps<Node<NodeData>>,
		| "nodes"
		| "edges"
		| "onNodesChange"
		| "onEdgesChange"
		| "onConnect"
		| "isValidConnection"
		| "nodeTypes"
		| "className"
	>;
}

/**
 * Unstyled component for rendering the workflow canvas (ReactFlow editor)
 * This component provides the ReactFlow integration and connection logic
 * but allows custom styling through className and reactFlowProps
 *
 * @example
 * ```tsx
 * <WorkflowCanvas
 *   nodes={nodes}
 *   edges={edges}
 *   onNodesChange={onNodesChange}
 *   onEdgesChange={onEdgesChange}
 *   onNodeConfigClick={(nodeId, data) => handleConfigClick(nodeId, data)}
 *   className="my-custom-canvas"
 * />
 * ```
 */
export function WorkflowCanvas({
	nodes,
	edges,
	onNodesChange,
	onEdgesChange,
	onNodeConfigClick,
	isValidConnection: customIsValidConnection,
	onConnect,
	getNodes: customGetNodes,
	getEdges: customGetEdges,
	className,
	reactFlowProps,
}: WorkflowCanvasProps) {
	const handleNodeConfigClick = useCallback(
		(nodeId: string, data: NodeData) => {
			onNodeConfigClick?.(nodeId, data);
		},
		[onNodeConfigClick],
	);

	const nodeTypes = useMemo(
		() => ({
			oneWayRight: (props: NodeProps<Node<NodeData>>) => (
				<OneWayRightNode
					{...props}
					onConfigClick={handleNodeConfigClick}
				/>
			),
			twoWay: (props: NodeProps<Node<NodeData>>) => (
				<TwoWayNode {...props} onConfigClick={handleNodeConfigClick} />
			),
			oneWayLeft: (props: NodeProps<Node<NodeData>>) => (
				<OneWayLeftNode
					{...props}
					onConfigClick={handleNodeConfigClick}
				/>
			),
			branch: (props: NodeProps<Node<NodeData>>) => (
				<BranchNode {...props} onConfigClick={handleNodeConfigClick} />
			),
		}),
		[handleNodeConfigClick],
	);

	const defaultIsValidConnection: IsValidConnection = useCallback(
		(connection) => {
			if (!customGetNodes || !customGetEdges) return true;

			const allNodes = customGetNodes();
			const allEdges = customGetEdges();
			const target = allNodes.find(
				(node) => node.id === connection.target,
			);

			if (target?.type === "oneWayRight") {
				return false;
			}

			const hasCycle = (node: Node, visited = new Set<string>()) => {
				if (visited.has(node.id)) return false;

				visited.add(node.id);

				for (const outgoer of getOutgoers(node, allNodes, allEdges)) {
					if (outgoer.id === connection.source) return true;
					if (hasCycle(outgoer, visited)) return true;
				}
			};

			if (target?.id === connection.source) return false;
			return !hasCycle(target as Node);
		},
		[customGetNodes, customGetEdges],
	);

	return (
		<div className={className} style={{ width: "100%", height: "100%" }}>
			<ReactFlow
				colorMode="dark"
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				isValidConnection={
					customIsValidConnection || defaultIsValidConnection
				}
				fitView
				nodeTypes={nodeTypes}
				{...reactFlowProps}
			>
				<Background />
				<Controls />
			</ReactFlow>
		</div>
	);
}
