"use client";

import { useEffect } from "react";

import { useTriglit } from "./use-triglit.js";

/**
 * Hook to monitor API status
 * Automatically checks API health and updates status
 *
 * @param options - Configuration options
 * @returns Current API status
 *
 * @example
 * ```tsx
 * const status = useApiStatus({ checkInterval: 30000 });
 *
 * <TriglitDegraded>
 *   <div className="alert">
 *     <AlertTriangle />
 *     <p>API is experiencing issues</p>
 *   </div>
 * </TriglitDegraded>
 * ```
 */
export function useApiStatus(options?: {
	/**
	 * Interval in milliseconds to check API status (default: 60000)
	 */
	checkInterval?: number;
}) {
	const { client, apiStatus, setApiStatus } = useTriglit();
	const interval = options?.checkInterval ?? 60000;

	useEffect(() => {
		let mounted = true;

		const checkStatus = async () => {
			try {
				// Try a lightweight endpoint to check health
				await client.workflows.list();
				if (mounted) {
					setApiStatus("healthy");
				}
			} catch (error) {
				if (mounted) {
					// Check if it's a rate limit or temporary error
					if (
						error instanceof Error &&
						("status" in error || "statusCode" in error)
					) {
						const status =
							"status" in error
								? (error.status as number)
								: "statusCode" in error
									? (error.statusCode as number)
									: 0;

						if (status === 429 || status >= 500) {
							setApiStatus("degraded");
						} else if (status >= 400) {
							setApiStatus("error");
						} else {
							setApiStatus("healthy");
						}
					} else {
						setApiStatus("error");
					}
				}
			}
		};

		// Initial check
		checkStatus();

		// Set up interval
		const intervalId = setInterval(checkStatus, interval);

		return () => {
			mounted = false;
			clearInterval(intervalId);
		};
	}, [client, setApiStatus, interval]);

	return apiStatus;
}
