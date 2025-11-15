/**
 * Validation utilities for workflows and nodes
 */

import type { NodeData } from "../types/index.js";

/**
 * Validate a workflow node
 * @param node - Node to validate
 * @returns Validation result
 */
export function validateNode(node: NodeData): {
	valid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	if (!node.id) {
		errors.push("Node must have an id");
	}

	if (!node.type) {
		errors.push("Node must have a type");
	}

	if (!node.name) {
		errors.push("Node must have a name");
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}

/**
 * Validate workflow edges
 * @param edges - Edges to validate
 * @param nodes - Nodes in the workflow
 * @returns Validation result
 */
export function validateEdges(
	edges: Array<{ source: string; target: string }>,
	nodes: NodeData[],
): {
	valid: boolean;
	errors: string[];
} {
	const errors: string[] = [];
	const nodeIds = new Set(nodes.map((n) => n.id));

	for (const edge of edges) {
		if (!nodeIds.has(edge.source)) {
			errors.push(`Edge source node "${edge.source}" not found`);
		}

		if (!nodeIds.has(edge.target)) {
			errors.push(`Edge target node "${edge.target}" not found`);
		}

		if (edge.source === edge.target) {
			errors.push("Edge cannot connect a node to itself");
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}

/**
 * Check if workflow has cycles
 * @param edges - Edges in the workflow
 * @returns true if cycle detected
 */
export function hasCycle(
	edges: Array<{ source: string; target: string }>,
): boolean {
	const graph = new Map<string, string[]>();

	// Build adjacency list
	for (const edge of edges) {
		if (!graph.has(edge.source)) {
			graph.set(edge.source, []);
		}
		graph.get(edge.source)?.push(edge.target);
	}

	// DFS to detect cycles
	const visited = new Set<string>();
	const recStack = new Set<string>();

	const dfs = (node: string): boolean => {
		if (recStack.has(node)) {
			return true; // Cycle detected
		}

		if (visited.has(node)) {
			return false;
		}

		visited.add(node);
		recStack.add(node);

		const neighbors = graph.get(node) || [];
		for (const neighbor of neighbors) {
			if (dfs(neighbor)) {
				return true;
			}
		}

		recStack.delete(node);
		return false;
	};

	for (const node of graph.keys()) {
		if (!visited.has(node)) {
			if (dfs(node)) {
				return true;
			}
		}
	}

	return false;
}
