"use client";

import { useEffect, useState } from "react";

/**
 * Hook to find the triglit-root element for portal containers
 * This ensures styles are applied correctly since portals render outside the normal DOM tree
 * By rendering inside triglit-root, all CSS variables and tg: prefixed classes will work
 */
export function useTriglitRootContainer(): HTMLElement | null {
	const [container, setContainer] = useState<HTMLElement | null>(null);

	useEffect(() => {
		if (typeof document !== "undefined") {
			const triglitRoot = document.querySelector(
				".triglit-root",
			) as HTMLElement;
			if (triglitRoot) {
				setContainer(triglitRoot);
			}
		}
	}, []);

	return container;
}
