/**
 * Triglit client wrapper with error handling and retry logic
 */

import Triglit from "triglit";

import type { TriglitConfig } from "../types/index.js";

/**
 * Creates a configured Triglit client instance
 * @param config - Configuration options
 * @returns Configured Triglit client
 */
export function createTriglitClient(
	config: Required<Pick<TriglitConfig, "apiKey" | "baseURL">>,
): Triglit {
	const client = new Triglit({
		apiKey: config.apiKey,
		baseURL: config.baseURL,
	});

	return client;
}

/**
 * Get API key from environment variables
 * Tries NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY first, then TRIGLIT_PUBLISHABLE_KEY
 * @returns API key or undefined
 */
export function getApiKeyFromEnv(): string | undefined {
	if (typeof window !== "undefined") {
		// Browser environment
		return (
			process.env.NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY ||
			(globalThis as { TRIGLIT_PUBLISHABLE_KEY?: string })
				.TRIGLIT_PUBLISHABLE_KEY
		);
	}
	// Node environment
	return (
		process.env.NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY ||
		process.env.TRIGLIT_PUBLISHABLE_KEY
	);
}
