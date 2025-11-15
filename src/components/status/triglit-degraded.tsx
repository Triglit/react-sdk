"use client";

import type { ReactNode } from "react";

import { useApiStatus } from "../../hooks/use-api-status.js";

/**
 * Props for TriglitDegraded component
 */
export interface TriglitDegradedProps {
	/**
	 * Children to render when the API is in a degraded state
	 */
	children: ReactNode;
}

/**
 * Logical component that renders children when the API is in a degraded state
 *
 * @example
 * ```tsx
 * <TriglitDegraded>
 *   <div className="alert">
 *     <AlertTriangle />
 *     <p>API is experiencing issues</p>
 *   </div>
 * </TriglitDegraded>
 * ```
 */
export function TriglitDegraded({ children }: TriglitDegradedProps) {
	const status = useApiStatus();

	if (status !== "degraded") {
		return null;
	}

	return <>{children}</>;
}
