"use client";

import type { ReactNode } from "react";

import { useApiStatus } from "../../hooks/use-api-status.js";

/**
 * Props for TriglitLoading component
 */
export interface TriglitLoadingProps {
	/**
	 * Children to render when the API is in a loading state
	 */
	children: ReactNode;
}

/**
 * Logical component that renders children when the API is in a loading state
 *
 * @example
 * ```tsx
 * <TriglitLoading>
 *   <div className="spinner">
 *     <Loader2Icon className="animate-spin" />
 *     <p>Loading...</p>
 *   </div>
 * </TriglitLoading>
 * ```
 */
export function TriglitLoading({ children }: TriglitLoadingProps) {
	const status = useApiStatus();

	if (status !== "loading") {
		return null;
	}

	return <>{children}</>;
}
