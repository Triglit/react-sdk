"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactFlowProvider } from "@xyflow/react";
import { type ReactNode, useMemo, useState } from "react";

import {
	createTriglitClient,
	getApiKeyFromEnv,
} from "../client/triglit-client.js";
import type { ApiStatus, TriglitConfig, TriglitI18n } from "../types/index.js";
import { TriglitContext, type TriglitContextValue } from "./triglit-context.js";

/**
 * Default i18n (English)
 */
const defaultI18n: TriglitI18n = {
	locale: "en",
};

/**
 * Props for TriglitProvider
 */
export interface TriglitProviderProps {
	/**
	 * Configuration options
	 */
	config?: TriglitConfig;
	/**
	 * Children components
	 */
	children: ReactNode;
}

/**
 * TriglitProvider - Main provider component for the Triglit SDK
 *
 * @example
 * ```tsx
 * <TriglitProvider config={{ apiKey: 'pk_...' }}>
 *   <App />
 * </TriglitProvider>
 * ```
 */
export function TriglitProvider({
	config = {},
	children,
}: TriglitProviderProps) {
	const apiKey = useMemo(() => {
		if (config.apiKey) {
			return config.apiKey;
		}
		return getApiKeyFromEnv();
	}, [config.apiKey]);

	if (!apiKey) {
		throw new Error(
			"Triglit API key is required. Provide it via config.apiKey or set NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY environment variable.",
		);
	}

	const baseURL = config.baseURL || "https://api.triglit.com";
	const i18n = config.i18n || defaultI18n;
	const callbacks = config.callbacks || {};

	const client = useMemo(() => {
		return createTriglitClient({ apiKey, baseURL });
	}, [apiKey, baseURL]);
	const [apiStatus, setApiStatus] = useState<ApiStatus>("loading");
	const queryClient = useMemo(() => new QueryClient(), []);

	const contextValue: TriglitContextValue = useMemo(
		() => ({
			client,
			apiStatus,
			config: {
				apiKey,
				baseURL,
				i18n,
				callbacks,
			},
			i18n,
			callbacks,
			setApiStatus,
		}),
		[client, apiStatus, apiKey, baseURL, i18n, callbacks],
	);

	return (
		<QueryClientProvider client={queryClient}>
			<TriglitContext.Provider value={contextValue}>
				<div className="triglit-root dark">
					<ReactFlowProvider>{children}</ReactFlowProvider>
				</div>
			</TriglitContext.Provider>
		</QueryClientProvider>
	);
}
