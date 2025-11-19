/**
 * Utility functions for managing trigger diffs and synchronization
 */

import type { Node } from "@xyflow/react";

import type { NodeData, Trigger } from "../../../types/index.js";
import { convertTriggerConfigToApi } from "../../../utils/trigger-config-converter.js";

/**
 * Represents a trigger node with its processed data
 */
interface TriggerNodeData {
	node: Node<NodeData>;
	triggerType: string;
	triggerName: string;
	apiConfig: ReturnType<typeof convertTriggerConfigToApi>;
	triggerId?: string;
}

/**
 * Result of trigger diff analysis
 */
export interface TriggerDiffResult {
	toCreate: TriggerNodeData[];
	toUpdate: Array<{
		trigger: Trigger;
		nodeData: TriggerNodeData;
		hasChanges: boolean;
	}>;
	toDelete: Trigger[];
}

/**
 * Compare two configurations to determine if they are different
 */
function configsAreDifferent(
	config1: Record<string, unknown>,
	config2: Record<string, unknown>,
): boolean {
	// Deep comparison of configs
	const keys1 = Object.keys(config1).sort();
	const keys2 = Object.keys(config2).sort();

	if (keys1.length !== keys2.length) {
		return true;
	}

	for (const key of keys1) {
		const val1 = config1[key];
		const val2 = config2[key];

		if (
			typeof val1 === "object" &&
			val1 !== null &&
			typeof val2 === "object" &&
			val2 !== null
		) {
			if (JSON.stringify(val1) !== JSON.stringify(val2)) {
				return true;
			}
		} else if (val1 !== val2) {
			return true;
		}
	}

	return false;
}

/**
 * Process trigger nodes and prepare them for diff analysis
 */
function processTriggerNodes(
	triggerNodes: Node<NodeData>[],
): TriggerNodeData[] {
	return triggerNodes.map((node) => {
		const triggerType = node.data.type.replace("trigger_", "");
		const visualConfig = (node.data.config || {}) as Record<
			string,
			unknown
		>;
		const triggerId = node.data._triggerId;
		const apiConfig = convertTriggerConfigToApi(
			node.data.type,
			visualConfig,
		);
		const triggerName = (node.data.customName || node.data.name) as string;

		return {
			node,
			triggerType,
			triggerName,
			apiConfig,
			triggerId,
		};
	});
}

/**
 * Analyze differences between existing triggers and trigger nodes
 * to determine what needs to be created, updated, or deleted
 *
 * @param triggerNodes - Nodes that represent triggers in the workflow
 * @param existingTriggers - Triggers that currently exist in the API
 * @returns Diff result with triggers to create, update, or delete
 */
export function analyzeTriggerDiff(
	triggerNodes: Node<NodeData>[],
	existingTriggers: Trigger[],
): TriggerDiffResult {
	const processedNodes = processTriggerNodes(triggerNodes);

	// Create maps for efficient lookup
	const existingTriggersMap = new Map<string, Trigger>(
		existingTriggers.map((t) => [t.id, t]),
	);

	const toCreate: TriggerNodeData[] = [];
	const toUpdate: Array<{
		trigger: Trigger;
		nodeData: TriggerNodeData;
		hasChanges: boolean;
	}> = [];
	const processedTriggerIds = new Set<string>();

	// Process each trigger node
	for (const nodeData of processedNodes) {
		const { triggerId, triggerName, triggerType, apiConfig } = nodeData;

		// Try to find existing trigger by ID first (most reliable)
		let existingTrigger: Trigger | undefined;
		if (triggerId && existingTriggersMap.has(triggerId)) {
			existingTrigger = existingTriggersMap.get(triggerId);
		} else {
			// If no ID match, try to find by matching name and type
			// This handles cases where _triggerId might not be set but trigger exists
			// Only match if there's exactly one unprocessed trigger with matching name and type
			// to avoid ambiguous matches
			const candidates = existingTriggers.filter(
				(t) =>
					!processedTriggerIds.has(t.id) &&
					t.type === triggerType &&
					(t.name === triggerName || (!t.name && !triggerName)),
			);

			// Only use the match if there's exactly one candidate (no ambiguity)
			if (candidates.length === 1) {
				existingTrigger = candidates[0];
			}
		}

		if (existingTrigger) {
			// Trigger exists - check if it needs to be updated
			processedTriggerIds.add(existingTrigger.id);

			// Compare configurations and name to determine if update is needed
			const configChanged = configsAreDifferent(
				apiConfig,
				(existingTrigger.config || {}) as Record<string, unknown>,
			);
			const nameChanged = existingTrigger.name !== triggerName;

			if (configChanged || nameChanged) {
				toUpdate.push({
					trigger: existingTrigger,
					nodeData,
					hasChanges: true,
				});
			} else {
				// No changes, but we still track it to ensure _triggerId is set correctly
				toUpdate.push({
					trigger: existingTrigger,
					nodeData,
					hasChanges: false,
				});
			}
		} else {
			// Trigger doesn't exist or match is ambiguous - needs to be created
			toCreate.push(nodeData);
		}
	}

	// Find triggers that were removed (exist in API but not in nodes)
	const toDelete = existingTriggers.filter(
		(trigger) => !processedTriggerIds.has(trigger.id),
	);

	return {
		toCreate,
		toUpdate,
		toDelete,
	};
}
