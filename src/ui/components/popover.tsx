"use client";

import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover";

import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const Popover = PopoverPrimitive.Root;

function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverPopup({
	children,
	className,
	side = "bottom",
	align = "center",
	sideOffset = 4,
	alignOffset = 0,
	tooltipStyle = false,
	...props
}: PopoverPrimitive.Popup.Props & {
	side?: PopoverPrimitive.Positioner.Props["side"];
	align?: PopoverPrimitive.Positioner.Props["align"];
	sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
	alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
	tooltipStyle?: boolean;
}) {
	const container = useTriglitRootContainer();
	return (
		<PopoverPrimitive.Portal container={container || undefined}>
			<PopoverPrimitive.Positioner
				data-slot="popover-positioner"
				className="tg:z-50"
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
			>
				<span
					className={cn(
						"tg:relative tg:flex tg:origin-(--transform-origin) tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:shadow-lg tg:transition-[scale,opacity] tg:not-[class*=w-]:[min-w-80] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:has-data-starting-style:scale-98 tg:has-data-starting-style:opacity-0 tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
						tooltipStyle &&
							"tg:w-fit tg:text-balance tg:rounded-md tg:text-xs tg:shadow-black/5 tg:shadow-md tg:before:rounded-[calc(var(--radius-md)-1px)]",
						className,
					)}
				>
					<PopoverPrimitive.Popup
						data-slot="popover-content"
						className={cn(
							"tg:max-h-(--available-height) tg:w-full tg:overflow-y-auto tg:p-4 tg:outline-none",
							tooltipStyle &&
								"tg:px-[calc(--spacing(2)+1px)] tg:py-[calc(--spacing(1)+1px)]",
						)}
						{...props}
					>
						{children}
					</PopoverPrimitive.Popup>
				</span>
			</PopoverPrimitive.Positioner>
		</PopoverPrimitive.Portal>
	);
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
	return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
	return (
		<PopoverPrimitive.Title
			data-slot="popover-title"
			className={cn(
				"tg:font-semibold tg:text-lg tg:leading-none",
				className,
			)}
			{...props}
		/>
	);
}

function PopoverDescription({
	className,
	...props
}: PopoverPrimitive.Description.Props) {
	return (
		<PopoverPrimitive.Description
			data-slot="popover-description"
			className={cn("tg:text-muted-foreground tg:text-sm", className)}
			{...props}
		/>
	);
}

export {
	Popover,
	PopoverClose,
	PopoverPopup as PopoverContent,
	PopoverDescription,
	PopoverPopup,
	PopoverTitle,
	PopoverTrigger,
};
