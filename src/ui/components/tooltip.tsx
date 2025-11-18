"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui-components/react/tooltip";

import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipPopup({
	className,
	align = "center",
	sideOffset = 4,
	side = "top",
	children,
	...props
}: TooltipPrimitive.Popup.Props & {
	align?: TooltipPrimitive.Positioner.Props["align"];
	side?: TooltipPrimitive.Positioner.Props["side"];
	sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
}) {
	const container = useTriglitRootContainer();
	return (
		<TooltipPrimitive.Portal container={container || undefined}>
			<TooltipPrimitive.Positioner
				data-slot="tooltip-positioner"
				className="tg:z-50"
				sideOffset={sideOffset}
				align={align}
				side={side}
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"tg:relative tg:flex tg:w-fit tg:origin-(--transform-origin) tg:text-balance tg:rounded-md tg:border tg:bg-popover tg:bg-clip-padding tg:px-2 tg:py-1 tg:text-popover-foreground tg:text-xs tg:shadow-black/5 tg:shadow-md tg:transition-[scale,opacity] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-md)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:data-ending-style:scale-98 tg:data-starting-style:scale-98 tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0 tg:data-instant:duration-0 tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
						className,
					)}
					{...props}
				>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export {
	Tooltip,
	TooltipPopup as TooltipContent,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
};
