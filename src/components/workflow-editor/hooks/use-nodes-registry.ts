"use client";

import { useQuery } from "@tanstack/react-query";

import { useTriglit } from "../../../hooks/use-triglit.js";

/**
 * Hook to fetch the nodes registry from the API
 * @returns Nodes registry data
 */
export function useNodesRegistry(options?: { enabled?: boolean }) {
	const { client } = useTriglit();

	return useQuery({
		queryKey: ["triglit", "custom-nodes", "registry"],
		queryFn: async () => {
			return client.customNodes.retrieveRegistry();
		},
		enabled: options?.enabled !== false,
	});
}
