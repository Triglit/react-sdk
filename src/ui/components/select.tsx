"use client";

import { Select as SelectPrimitive } from "@base-ui-components/react/select";
import {
	ChevronDownIcon,
	ChevronsUpDownIcon,
	ChevronUpIcon,
} from "lucide-react";

import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const Select = SelectPrimitive.Root;

function SelectTrigger({
	className,
	size = "default",
	children,
	...props
}: SelectPrimitive.Trigger.Props & {
	size?: "sm" | "default" | "lg";
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			className={cn(
				"tg:relative tg:inline-flex tg:w-full tg:min-w-36 tg:select-none tg:items-center tg:justify-between tg:gap-2 tg:rounded-lg tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:px-[calc(--spacing(3)-1px)] tg:py-[calc(--spacing(1.5)-1px)] tg:in-data-[slot=field]:not-data-filled:text-muted-foreground tg:text-base/5 tg:shadow-xs tg:outline-none tg:ring-ring/24 tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:focus-visible:border-ring tg:focus-visible:ring-[3px] tg:aria-invalid:border-destructive/36 tg:focus-visible:aria-invalid:border-destructive/64 tg:focus-visible:aria-invalid:ring-destructive/16 tg:data-disabled:pointer-events-none tg:data-disabled:opacity-64 tg:sm:text-sm tg:dark:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:aria-invalid:ring-destructive/24 tg:dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&:is([data-disabled],:focus-visible,[aria-invalid],[data-pressed])]:shadow-none tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0 tg:[&_svg]:opacity-72",
				size === "sm" &&
					"tg:gap-1.5 tg:px-[calc(--spacing(2.5)-1px)] tg:py-[calc(--spacing(1)-1px)]",
				size === "lg" && "tg:py-[calc(--spacing(2)-1px)]",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon data-slot="select-icon">
				<ChevronsUpDownIcon className="tg:-me-1 tg:size-4 tg:opacity-72" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={cn("tg:flex-1 tg:truncate", className)}
			{...props}
		/>
	);
}

function SelectPopup({
	className,
	children,
	sideOffset = 4,
	alignItemWithTrigger = true,
	...props
}: SelectPrimitive.Popup.Props & {
	sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
	alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
}) {
	const container = useTriglitRootContainer();
	return (
		<SelectPrimitive.Portal container={container || undefined}>
			<SelectPrimitive.Positioner
				data-slot="select-positioner"
				className="tg:z-50 tg:select-none"
				sideOffset={sideOffset}
				alignItemWithTrigger={alignItemWithTrigger}
			>
				<SelectPrimitive.Popup
					data-slot="select-popup"
					className="tg:origin-(--transform-origin) tg:transition-[scale,opacity] tg:has-data-[side=none]:scale-100 tg:has-data-starting-style:scale-98 tg:has-data-starting-style:opacity-0 tg:has-data-[side=none]:transition-none"
					{...props}
				>
					<SelectPrimitive.ScrollUpArrow
						className="tg:top-0 tg:z-50 tg:flex tg:h-6 tg:w-full tg:cursor-default tg:items-center tg:justify-center tg:before:pointer-events-none tg:before:absolute tg:before:inset-x-px tg:before:top-px tg:before:h-[200%] tg:before:rounded-t-[calc(var(--radius-lg)-1px)] tg:before:bg-gradient-to-b tg:before:from-50% tg:before:from-popover"
						data-slot="select-scroll-up-arrow"
					>
						<ChevronUpIcon className="tg:relative tg:size-4" />
					</SelectPrimitive.ScrollUpArrow>
					<span className="tg:relative tg:block tg:h-full tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-lg tg:dark:not-in-data-[slot=group]:bg-clip-border">
						<SelectPrimitive.List
							data-slot="select-list"
							className={cn(
								"tg:max-h-(--available-height) tg:min-w-(--anchor-width) tg:overflow-y-auto tg:p-1",
								className,
							)}
						>
							{children}
						</SelectPrimitive.List>
					</span>
					<SelectPrimitive.ScrollDownArrow
						className="tg:bottom-0 tg:z-50 tg:flex tg:h-6 tg:w-full tg:cursor-default tg:items-center tg:justify-center tg:before:pointer-events-none tg:before:absolute tg:before:inset-x-px tg:before:bottom-px tg:before:h-[200%] tg:before:rounded-b-[calc(var(--radius-lg)-1px)] tg:before:bg-gradient-to-t tg:before:from-50% tg:before:from-popover"
						data-slot="select-scroll-down-arrow"
					>
						<ChevronDownIcon className="tg:relative tg:size-4" />
					</SelectPrimitive.ScrollDownArrow>
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectItem({
	className,
	children,
	...props
}: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"tg:grid tg:in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] tg:cursor-default tg:grid-cols-[1rem_1fr] tg:items-center tg:gap-2 tg:rounded-sm tg:py-1 tg:ps-2 tg:pe-4 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<SelectPrimitive.ItemIndicator className="tg:col-start-1">
				<svg
					xmlns="http://www.w3.org/1500/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<title>Check</title>
					<path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
				</svg>
			</SelectPrimitive.ItemIndicator>
			<SelectPrimitive.ItemText className="tg:col-start-2 tg:min-w-0">
				{children}
			</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			className={cn("tg:mx-2 tg:my-1 tg:h-px tg:bg-border", className)}
			data-slot="select-separator"
			{...props}
		/>
	);
}

function SelectGroup(props: SelectPrimitive.Group.Props) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectGroupLabel(props: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			className="tg:px-2 tg:py-1.5 tg:font-medium tg:text-muted-foreground tg:text-xs"
			data-slot="select-group-label"
			{...props}
		/>
	);
}

export {
	Select,
	SelectPopup as SelectContent,
	SelectGroup,
	SelectGroupLabel,
	SelectItem,
	SelectPopup,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
