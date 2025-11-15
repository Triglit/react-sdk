"use client";

import { useTriglit } from "./use-triglit.js";

/**
 * Hook to access Triglit mutation callbacks
 * @returns Mutation callbacks from TriglitProvider config
 *
 * @example
 * ```tsx
 * const callbacks = useTriglitCallbacks();
 * // callbacks.onWorkflowVersionCreated will be called when a version is created
 * ```
 */
export function useTriglitCallbacks() {
	const { callbacks } = useTriglit();
	return callbacks;
}
