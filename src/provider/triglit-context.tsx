"use client";

import { createContext } from "react";
import type { Triglit } from "triglit";

import type {
	ApiStatus,
	TriglitConfig,
	TriglitI18n,
	TriglitMutationCallbacks,
} from "../types/index.js";

/**
 * Context value for Triglit provider
 */
export interface TriglitContextValue {
	/**
	 * Triglit client instance
	 */
	client: Triglit;
	/**
	 * Current API status
	 */
	apiStatus: ApiStatus;
	/**
	 * Configuration
	 */
	config: Required<Omit<TriglitConfig, "callbacks">> & {
		callbacks?: TriglitMutationCallbacks;
	};
	/**
	 * i18n instance
	 */
	i18n: TriglitI18n;
	/**
	 * Mutation callbacks
	 */
	callbacks: TriglitMutationCallbacks;
	/**
	 * Update API status
	 */
	setApiStatus: (status: ApiStatus) => void;
}

/**
 * Triglit context
 */
export const TriglitContext = createContext<TriglitContextValue | null>(null);
