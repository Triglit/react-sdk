import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd"
			className={cn(
				"tg:pointer-events-none tg:inline-flex tg:h-5 tg:min-w-5 tg:select-none tg:items-center tg:justify-center tg:gap-1 tg:rounded tg:bg-muted tg:px-1 tg:font-medium tg:font-sans tg:text-muted-foreground tg:text-xs tg:[&_svg:not([class*=size-])]:size-3",
				className,
			)}
			{...props}
		/>
	);
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="kbd-group"
			className={cn("tg:inline-flex tg:items-center tg:gap-1", className)}
			{...props}
		/>
	);
}

export { Kbd, KbdGroup };
