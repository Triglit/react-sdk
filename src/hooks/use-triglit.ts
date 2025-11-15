"use client";

import { useContext } from "react";

import { TriglitContext } from "../provider/triglit-context.js";

/**
 * Hook to access the Triglit context
 * @returns Triglit context value
 * @throws Error if used outside TriglitProvider
 *
 * @example
 * ```tsx
 * const { client, apiStatus } = useTriglit();
 * const workflows = await client.workflows.list();
 * ```
 */
export function useTriglit() {
	const context = useContext(TriglitContext);

	if (!context) {
		throw new Error("useTriglit must be used within a TriglitProvider");
	}

	return context;
}
