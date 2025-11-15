import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

function Label({ className, ...props }: React.ComponentProps<"label">) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Ignore
		<label
			data-slot="label"
			className={cn(
				"tg:inline-flex tg:items-center tg:gap-2 tg:text-sm/4",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
