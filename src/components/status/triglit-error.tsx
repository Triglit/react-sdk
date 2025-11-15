"use client";

import type { ReactNode } from "react";

import { useApiStatus } from "../../hooks/use-api-status.js";

/**
 * Props for TriglitError component
 */
export interface TriglitErrorProps {
	/**
	 * Children to render when the API is in an error state
	 */
	children: ReactNode;
}

/**
 * Logical component that renders children when the API is in an error state
 *
 * @example
 * ```tsx
 * <TriglitError>
 *   <div className="alert">
 *     <XCircle />
 *     <p>An error occurred</p>
 *   </div>
 * </TriglitError>
 * ```
 */
export function TriglitError({ children }: TriglitErrorProps) {
	const status = useApiStatus();

	if (status !== "error") {
		return null;
	}

	return <>{children}</>;
}
