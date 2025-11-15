"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui-components/react/collapsible";

import { cn } from "@/ui/lib/utils.js";

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

function CollapsibleTrigger({
	className,
	...props
}: CollapsiblePrimitive.Trigger.Props) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			className={cn("tg:cursor-pointer", className)}
			{...props}
		/>
	);
}

function CollapsiblePanel({
	className,
	...props
}: CollapsiblePrimitive.Panel.Props) {
	return (
		<CollapsiblePrimitive.Panel
			data-slot="collapsible-panel"
			className={cn(
				"tg:h-(--collapsible-panel-height) tg:overflow-hidden tg:transition-[height] tg:duration-200 tg:data-ending-style:h-0 tg:data-starting-style:h-0",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Collapsible,
	CollapsiblePanel as CollapsibleContent,
	CollapsiblePanel,
	CollapsibleTrigger,
};
