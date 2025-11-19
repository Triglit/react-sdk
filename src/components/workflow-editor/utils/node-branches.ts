import type { NodeData } from "../../../types/index.js";

/**
 * Represents a branch output handle for a node
 */
export interface BranchHandle {
	/**
	 * Unique identifier for the handle (used as sourceHandle in edges)
	 */
	id: string;
	/**
	 * Display label for the handle
	 */
	label: string;
}

/**
 * Determines which output handles (branches) a node needs based on its type and configuration
 *
 * @param nodeData - The node data containing type and config
 * @returns Array of branch handles, or null if the node doesn't support branches
 */
export function getNodeBranches(nodeData: NodeData): BranchHandle[] | null {
	const { type, config } = nodeData;

	// Condition node: true and false branches
	if (type === "condition") {
		return [
			{ id: "true", label: "True" },
			{ id: "false", label: "False" },
		];
	}

	// Switch node: one handle per case + default
	if (type === "switch") {
		const configObj = (config || {}) as Record<string, unknown>;
		const cases =
			(configObj.cases as
				| Array<{ value: unknown; description?: string }>
				| undefined) || [];
		const branches: BranchHandle[] = [];

		// Add a handle for each case
		cases.forEach((caseItem, index) => {
			const caseValue = caseItem.value;
			// Create a readable label for the case
			let caseLabel: string;
			if (caseItem.description) {
				caseLabel = caseItem.description;
			} else if (caseValue === null || caseValue === undefined) {
				caseLabel = String(caseValue);
			} else if (
				typeof caseValue === "string" ||
				typeof caseValue === "number" ||
				typeof caseValue === "boolean"
			) {
				caseLabel = String(caseValue);
			} else {
				caseLabel = `Case ${index + 1}`;
			}
			// Use index-based ID to ensure uniqueness
			// The ID will be used as sourceOutputKey in edges
			branches.push({
				id: `case-${index}`,
				label: caseLabel,
			});
		});

		// Always add default branch (even if no cases are configured yet)
		branches.push({
			id: "default",
			label: "Default",
		});

		return branches;
	}

	// Node doesn't support branches
	return null;
}

/**
 * Checks if a node type supports multiple output branches
 *
 * @param nodeType - The node type to check
 * @returns True if the node type supports branches
 */
export function supportsBranches(nodeType: string): boolean {
	return nodeType === "condition" || nodeType === "switch";
}
