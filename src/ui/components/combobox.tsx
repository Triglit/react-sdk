"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui-components/react/combobox";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";
import * as React from "react";

import { Input } from "@/ui/components/input.js";
import { ScrollArea } from "@/ui/components/scroll-area.js";
import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const ComboboxContext = React.createContext<{
	chipsRef: React.RefObject<HTMLDivElement | null> | null;
	multiple: boolean;
}>({
	chipsRef: null,
	multiple: false,
});

function Combobox<
	ItemValue,
	SelectedValue = ItemValue,
	Multiple extends boolean | undefined = false,
>(props: ComboboxPrimitive.Root.Props<ItemValue, SelectedValue, Multiple>) {
	const chipsRef = React.useRef<HTMLDivElement | null>(null);
	return (
		<ComboboxContext.Provider
			value={{ chipsRef, multiple: !!props.multiple }}
		>
			<ComboboxPrimitive.Root {...props} />
		</ComboboxContext.Provider>
	);
}

function ComboboxInput({
	className,
	showTrigger = true,
	showClear = false,
	size,
	...props
}: Omit<ComboboxPrimitive.Input.Props, "size"> & {
	showTrigger?: boolean;
	showClear?: boolean;
	size?: "sm" | "default" | "lg" | number;
}) {
	const { multiple } = React.useContext(ComboboxContext);
	const sizeValue = (size ?? "default") as "sm" | "default" | "lg" | number;

	// multiple mode
	if (multiple) {
		return (
			<ComboboxPrimitive.Input
				data-slot="combobox-input"
				className={cn(
					"tg:min-w-12 tg:flex-1 tg:text-base/5 tg:outline-none tg:sm:text-sm tg:[[data-slot=combobox-chip]+&]:ps-0.5",
					sizeValue === "sm" ? "tg:ps-1.5" : "tg:ps-2",
					className,
				)}
				data-size={
					typeof sizeValue === "string" ? sizeValue : undefined
				}
				size={typeof sizeValue === "number" ? sizeValue : undefined}
				{...props}
			/>
		);
	}
	// single mode
	return (
		<div className="tg:relative tg:w-full tg:has-disabled:opacity-64">
			<ComboboxPrimitive.Input
				data-slot="combobox-input"
				className={cn(
					sizeValue === "sm"
						? "tg:has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-6.5"
						: "tg:has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-7",
					className,
				)}
				render={
					<Input
						size={sizeValue}
						className="tg:has-disabled:opacity-100"
					/>
				}
				{...props}
			/>
			{showTrigger && (
				<ComboboxTrigger
					className={cn(
						"tg:-translate-y-1/2 tg:absolute tg:top-1/2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-opacity tg:pointer-coarse:after:absolute tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:has-[+[data-slot=combobox-clear]]:hidden tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
						sizeValue === "sm" ? "tg:end-0" : "tg:end-0.5",
					)}
				>
					<ChevronsUpDownIcon />
				</ComboboxTrigger>
			)}
			{showClear && (
				<ComboboxClear
					className={cn(
						"tg:-translate-y-1/2 tg:absolute tg:top-1/2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-opacity tg:pointer-coarse:after:absolute tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:has-[+[data-slot=combobox-clear]]:hidden tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
						sizeValue === "sm" ? "tg:end-0" : "tg:end-0.5",
					)}
				>
					<XIcon />
				</ComboboxClear>
			)}
		</div>
	);
}

function ComboboxTrigger({
	className,
	...props
}: ComboboxPrimitive.Trigger.Props) {
	return (
		<ComboboxPrimitive.Trigger
			data-slot="combobox-trigger"
			className={className}
			{...props}
		/>
	);
}

function ComboboxPopup({
	className,
	children,
	sideOffset = 4,
	...props
}: ComboboxPrimitive.Popup.Props & {
	sideOffset?: number;
}) {
	const { chipsRef } = React.useContext(ComboboxContext);
	const container = useTriglitRootContainer();

	return (
		<ComboboxPrimitive.Portal container={container || undefined}>
			<ComboboxPrimitive.Positioner
				data-slot="combobox-positioner"
				className="tg:z-50 tg:select-none"
				sideOffset={sideOffset}
				anchor={chipsRef}
			>
				<span className="tg:relative tg:flex tg:max-h-full tg:origin-(--transform-origin) tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:transition-[scale,opacity] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-lg tg:has-data-starting-style:scale-98 tg:has-data-starting-style:opacity-0 tg:dark:not-in-data-[slot=group]:bg-clip-border">
					<ComboboxPrimitive.Popup
						data-slot="combobox-popup"
						className={cn(
							"tg:flex tg:max-h-[min(var(--available-height),23rem)] tg:w-(--anchor-width) tg:max-w-(--available-width) tg:flex-col",
							className,
						)}
						{...props}
					>
						{children}
					</ComboboxPrimitive.Popup>
				</span>
			</ComboboxPrimitive.Positioner>
		</ComboboxPrimitive.Portal>
	);
}

function ComboboxItem({
	className,
	children,
	...props
}: ComboboxPrimitive.Item.Props) {
	return (
		<ComboboxPrimitive.Item
			data-slot="combobox-item"
			className={cn(
				"tg:grid tg:in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] tg:cursor-default tg:grid-cols-[1rem_1fr] tg:items-center tg:gap-2 tg:rounded-sm tg:py-1 tg:ps-2 tg:pe-4 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<ComboboxPrimitive.ItemIndicator className="tg:col-start-1">
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
			</ComboboxPrimitive.ItemIndicator>
			<div className="tg:col-start-2">{children}</div>
		</ComboboxPrimitive.Item>
	);
}

function ComboboxSeparator({
	className,
	...props
}: ComboboxPrimitive.Separator.Props) {
	return (
		<ComboboxPrimitive.Separator
			className={cn(
				"tg:mx-2 tg:my-1 tg:h-px tg:bg-border tg:last:hidden",
				className,
			)}
			data-slot="combobox-separator"
			{...props}
		/>
	);
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
	return (
		<ComboboxPrimitive.Group
			data-slot="combobox-group"
			className={className}
			{...props}
		/>
	);
}

function ComboboxGroupLabel({
	className,
	...props
}: ComboboxPrimitive.GroupLabel.Props) {
	return (
		<ComboboxPrimitive.GroupLabel
			className={cn(
				"tg:px-2 tg:py-1.5 tg:font-medium tg:text-muted-foreground tg:text-xs",
				className,
			)}
			data-slot="combobox-group-label"
			{...props}
		/>
	);
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
	return (
		<ComboboxPrimitive.Empty
			className={cn(
				"tg:not-empty:p-2 tg:text-center tg:text-muted-foreground tg:text-sm",
				className,
			)}
			data-slot="combobox-empty"
			{...props}
		/>
	);
}

function ComboboxRow({ className, ...props }: ComboboxPrimitive.Row.Props) {
	return (
		<ComboboxPrimitive.Row
			data-slot="combobox-row"
			className={className}
			{...props}
		/>
	);
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
	return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
	return (
		<ScrollArea className="tg:flex-1">
			<ComboboxPrimitive.List
				data-slot="combobox-list"
				className={cn(
					"tg:not-empty:scroll-py-1 tg:not-empty:px-1 tg:not-empty:py-1 tg:in-data-has-overflow-y:pe-3",
					className,
				)}
				{...props}
			/>
		</ScrollArea>
	);
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
	return (
		<ComboboxPrimitive.Clear
			data-slot="combobox-clear"
			className={className}
			{...props}
		/>
	);
}

function ComboboxStatus({
	className,
	...props
}: ComboboxPrimitive.Status.Props) {
	return (
		<ComboboxPrimitive.Status
			data-slot="combobox-status"
			className={cn(
				"tg:px-3 tg:py-2 tg:font-medium tg:text-muted-foreground tg:text-xs tg:empty:m-0 tg:empty:p-0",
				className,
			)}
			{...props}
		/>
	);
}

function ComboboxCollection(props: ComboboxPrimitive.Collection.Props) {
	return (
		<ComboboxPrimitive.Collection
			data-slot="combobox-collection"
			{...props}
		/>
	);
}

function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props) {
	const { chipsRef } = React.useContext(ComboboxContext);

	return (
		<ComboboxPrimitive.Chips
			ref={chipsRef}
			data-slot="combobox-chips"
			className={cn(
				"tg:relative tg:inline-flex tg:min-h-8 tg:w-full tg:flex-wrap tg:gap-1 tg:rounded-lg tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:p-[calc(--spacing(1)-1px)] tg:text-base/5 tg:shadow-xs tg:outline-none tg:ring-ring/24 tg:transition-shadow tg:*:min-h-6 tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] tg:focus-within:border-ring tg:focus-within:ring-[3px] tg:has-disabled:pointer-events-none tg:has-data-[size=lg]:min-h-9 tg:has-data-[size=sm]:min-h-7 tg:has-aria-invalid:border-destructive/36 tg:has-disabled:opacity-64 tg:has-[:disabled,:focus-within,[aria-invalid]]:shadow-none tg:focus-within:has-aria-invalid:border-destructive/64 tg:focus-within:has-aria-invalid:ring-destructive/16 tg:has-data-[size=lg]:*:min-h-7 tg:has-data-[size=sm]:*:min-h-5 tg:sm:text-sm tg:dark:not-has-disabled:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:has-aria-invalid:ring-destructive/24 tg:dark:not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)]",
				className,
			)}
			{...props}
		/>
	);
}

function ComboboxChip({ children, ...props }: ComboboxPrimitive.Chip.Props) {
	return (
		<ComboboxPrimitive.Chip
			data-slot="combobox-chip"
			className="tg:flex tg:items-center tg:rounded-[calc(var(--radius-md)-1px)] tg:bg-accent tg:ps-2 tg:font-medium tg:text-accent-foreground tg:text-xs tg:outline-none"
			{...props}
		>
			{children}
			<ComboboxChipRemove />
		</ComboboxPrimitive.Chip>
	);
}

function ComboboxChipRemove(props: ComboboxPrimitive.ChipRemove.Props) {
	return (
		<ComboboxPrimitive.ChipRemove
			data-slot="combobox-chip-remove"
			className="tg:h-full tg:shrink-0 tg:cursor-pointer tg:px-1.5 tg:opacity-72 tg:hover:opacity-100 tg:[&_svg:not([class*=size-])]:size-3.5"
			aria-label="Remove"
			{...props}
		>
			<XIcon />
		</ComboboxPrimitive.ChipRemove>
	);
}

export {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxClear,
	ComboboxCollection,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxGroupLabel,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxPopup,
	ComboboxRow,
	ComboboxSeparator,
	ComboboxStatus,
	ComboboxTrigger,
	ComboboxValue,
};
