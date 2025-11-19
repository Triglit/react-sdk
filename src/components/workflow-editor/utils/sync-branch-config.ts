import type { NodeData } from "../../../types/index.js";

/**
 * Updates the config of a branch node based on edge connections
 *
 * @param nodeData - The node data to update
 * @param sourceHandle - The handle ID (e.g., "true", "false", "case-0", "default")
 * @param targetNodeId - The target node ID to connect to
 * @returns Updated config object
 */
export function updateBranchConfigFromEdge(
	nodeData: NodeData,
	sourceHandle: string | null | undefined,
	targetNodeId: string,
): Record<string, unknown> {
	const { type, config } = nodeData;
	const configObj = { ...(config || {}) } as Record<string, unknown>;

	if (type === "condition") {
		if (sourceHandle === "true") {
			configObj.trueBranch = targetNodeId;
		} else if (sourceHandle === "false") {
			configObj.falseBranch = targetNodeId;
		}
	} else if (type === "switch") {
		if (sourceHandle === "default") {
			configObj.defaultNode = targetNodeId;
		} else if (sourceHandle?.startsWith("case-")) {
			const caseIndex = parseInt(sourceHandle.replace("case-", ""), 10);
			if (!Number.isNaN(caseIndex)) {
				const cases = [
					...((configObj.cases as Array<Record<string, unknown>>) ||
						[]),
				];
				if (cases[caseIndex]) {
					cases[caseIndex] = {
						...cases[caseIndex],
						nodeId: targetNodeId,
					};
					configObj.cases = cases;
				}
			}
		}
	}

	return configObj;
}

/**
 * Clears the config of a branch node when an edge is disconnected
 *
 * @param nodeData - The node data to update
 * @param sourceHandle - The handle ID that was disconnected
 * @returns Updated config object
 */
export function clearBranchConfigFromEdge(
	nodeData: NodeData,
	sourceHandle: string | null | undefined,
): Record<string, unknown> {
	const { type, config } = nodeData;
	const configObj = { ...(config || {}) } as Record<string, unknown>;

	if (type === "condition") {
		if (sourceHandle === "true") {
			configObj.trueBranch = "";
		} else if (sourceHandle === "false") {
			configObj.falseBranch = "";
		}
	} else if (type === "switch") {
		if (sourceHandle === "default") {
			configObj.defaultNode = "";
		} else if (sourceHandle?.startsWith("case-")) {
			const caseIndex = parseInt(sourceHandle.replace("case-", ""), 10);
			if (!Number.isNaN(caseIndex)) {
				const cases = [
					...((configObj.cases as Array<Record<string, unknown>>) ||
						[]),
				];
				if (cases[caseIndex]) {
					cases[caseIndex] = {
						...cases[caseIndex],
						nodeId: "",
					};
					configObj.cases = cases;
				}
			}
		}
	}

	return configObj;
}

/**
 * Checks if a config field is a branch-related field that should be synced from edges
 *
 * @param nodeType - The node type
 * @param fieldName - The field name
 * @returns True if the field is branch-related
 */
export function isBranchConfigField(
	nodeType: string,
	fieldName: string,
): boolean {
	if (nodeType === "condition") {
		return fieldName === "trueBranch" || fieldName === "falseBranch";
	}
	if (nodeType === "switch") {
		return fieldName === "defaultNode" || fieldName === "cases";
	}
	return false;
}

/**
 * Gets the source handle ID from a branch config value
 *
 * @param nodeType - The node type
 * @param fieldName - The config field name
 * @param caseIndex - For switch nodes, the case index (if applicable)
 * @returns The handle ID or null
 */
export function getHandleIdFromConfigField(
	nodeType: string,
	fieldName: string,
	caseIndex?: number,
): string | null {
	if (nodeType === "condition") {
		if (fieldName === "trueBranch") return "true";
		if (fieldName === "falseBranch") return "false";
	}
	if (nodeType === "switch") {
		if (fieldName === "defaultNode") return "default";
		if (fieldName === "cases" && caseIndex !== undefined) {
			return `case-${caseIndex}`;
		}
	}
	return null;
}
