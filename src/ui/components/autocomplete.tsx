"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui-components/react/autocomplete";
import { ChevronsUpDownIcon, XIcon } from "lucide-react";

import { Input } from "@/ui/components/input.js";
import { ScrollArea } from "@/ui/components/scroll-area.js";
import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const Autocomplete = AutocompletePrimitive.Root;

function AutocompleteInput({
	className,
	showTrigger = false,
	showClear = false,
	size,
	...props
}: Omit<AutocompletePrimitive.Input.Props, "size"> & {
	showTrigger?: boolean;
	showClear?: boolean;
	size?: "sm" | "default" | "lg" | number;
}) {
	const sizeValue = (size ?? "default") as "sm" | "default" | "lg" | number;

	return (
		<div className="tg:relative tg:w-full">
			<AutocompletePrimitive.Input
				data-slot="autocomplete-input"
				className={cn(
					sizeValue === "sm"
						? "tg:has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-6.5"
						: "tg:has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-7",
					className,
				)}
				render={<Input size={sizeValue} />}
				{...props}
			/>
			{showTrigger && (
				<AutocompleteTrigger
					className={cn(
						"tg:-translate-y-1/2 tg:absolute tg:top-1/2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-colors tg:pointer-coarse:after:absolute tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:has-[+[data-slot=autocomplete-clear]]:hidden tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
						sizeValue === "sm" ? "tg:end-0" : "tg:end-0.5",
					)}
				>
					<ChevronsUpDownIcon />
				</AutocompleteTrigger>
			)}
			{showClear && (
				<AutocompleteClear
					className={cn(
						"tg:-translate-y-1/2 tg:absolute tg:top-1/2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-colors tg:pointer-coarse:after:absolute tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:has-[+[data-slot=autocomplete-clear]]:hidden tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
						sizeValue === "sm" ? "tg:end-0" : "tg:end-0.5",
					)}
				>
					<XIcon />
				</AutocompleteClear>
			)}
		</div>
	);
}

function AutocompletePopup({
	className,
	children,
	sideOffset = 4,
	...props
}: AutocompletePrimitive.Popup.Props & {
	sideOffset?: number;
}) {
	const container = useTriglitRootContainer();
	return (
		<AutocompletePrimitive.Portal container={container || undefined}>
			<AutocompletePrimitive.Positioner
				data-slot="autocomplete-positioner"
				className="tg:z-50 tg:select-none"
				sideOffset={sideOffset}
			>
				<span className="tg:relative tg:flex tg:max-h-full tg:origin-(--transform-origin) tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:transition-[scale,opacity] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-lg tg:has-data-starting-style:scale-98 tg:has-data-starting-style:opacity-0 tg:dark:not-in-data-[slot=group]:bg-clip-border">
					<AutocompletePrimitive.Popup
						data-slot="autocomplete-popup"
						className={cn(
							"tg:flex tg:max-h-[min(var(--available-height),23rem)] tg:w-(--anchor-width) tg:max-w-(--available-width) tg:flex-col",
							className,
						)}
						{...props}
					>
						{children}
					</AutocompletePrimitive.Popup>
				</span>
			</AutocompletePrimitive.Positioner>
		</AutocompletePrimitive.Portal>
	);
}

function AutocompleteItem({
	className,
	children,
	...props
}: AutocompletePrimitive.Item.Props) {
	return (
		<AutocompletePrimitive.Item
			data-slot="autocomplete-item"
			className={cn(
				"tg:flex tg:cursor-default tg:select-none tg:items-center tg:rounded-sm tg:px-2 tg:py-1 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm",
				className,
			)}
			{...props}
		>
			{children}
		</AutocompletePrimitive.Item>
	);
}

function AutocompleteSeparator({
	className,
	...props
}: AutocompletePrimitive.Separator.Props) {
	return (
		<AutocompletePrimitive.Separator
			className={cn(
				"tg:mx-2 tg:my-1 tg:h-px tg:bg-border tg:last:hidden",
				className,
			)}
			data-slot="autocomplete-separator"
			{...props}
		/>
	);
}

function AutocompleteGroup({
	className,
	...props
}: AutocompletePrimitive.Group.Props) {
	return (
		<AutocompletePrimitive.Group
			data-slot="autocomplete-group"
			className={className}
			{...props}
		/>
	);
}

function AutocompleteGroupLabel({
	className,
	...props
}: AutocompletePrimitive.GroupLabel.Props) {
	return (
		<AutocompletePrimitive.GroupLabel
			className={cn(
				"tg:px-2 tg:py-1.5 tg:font-medium tg:text-muted-foreground tg:text-xs",
				className,
			)}
			data-slot="autocomplete-group-label"
			{...props}
		/>
	);
}

function AutocompleteEmpty({
	className,
	...props
}: AutocompletePrimitive.Empty.Props) {
	return (
		<AutocompletePrimitive.Empty
			className={cn(
				"tg:not-empty:p-2 tg:text-center tg:text-muted-foreground tg:text-sm",
				className,
			)}
			data-slot="autocomplete-empty"
			{...props}
		/>
	);
}

function AutocompleteRow({
	className,
	...props
}: AutocompletePrimitive.Row.Props) {
	return (
		<AutocompletePrimitive.Row
			data-slot="autocomplete-row"
			className={className}
			{...props}
		/>
	);
}

function AutocompleteValue({ ...props }: AutocompletePrimitive.Value.Props) {
	return (
		<AutocompletePrimitive.Value
			data-slot="autocomplete-value"
			{...props}
		/>
	);
}

function AutocompleteList({
	className,
	...props
}: AutocompletePrimitive.List.Props) {
	return (
		<ScrollArea className="tg:flex-1">
			<AutocompletePrimitive.List
				data-slot="autocomplete-list"
				className={cn(
					"tg:not-empty:scroll-py-1 tg:not-empty:px-1 tg:not-empty:py-1 tg:in-data-has-overflow-y:pe-3",
					className,
				)}
				{...props}
			/>
		</ScrollArea>
	);
}

function AutocompleteClear({
	className,
	...props
}: AutocompletePrimitive.Clear.Props) {
	return (
		<AutocompletePrimitive.Clear
			data-slot="autocomplete-clear"
			className={cn(
				"tg:-translate-y-1/2 tg:absolute tg:end-0.5 tg:top-1/2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-[color,background-color,box-shadow,opacity] tg:pointer-coarse:after:absolute tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<XIcon />
		</AutocompletePrimitive.Clear>
	);
}

function AutocompleteStatus({
	className,
	...props
}: AutocompletePrimitive.Status.Props) {
	return (
		<AutocompletePrimitive.Status
			data-slot="autocomplete-status"
			className={cn(
				"tg:px-3 tg:py-2 tg:font-medium tg:text-muted-foreground tg:text-xs tg:empty:m-0 tg:empty:p-0",
				className,
			)}
			{...props}
		/>
	);
}

function AutocompleteCollection({
	...props
}: AutocompletePrimitive.Collection.Props) {
	return (
		<AutocompletePrimitive.Collection
			data-slot="autocomplete-collection"
			{...props}
		/>
	);
}

function AutocompleteTrigger({
	className,
	...props
}: AutocompletePrimitive.Trigger.Props) {
	return (
		<AutocompletePrimitive.Trigger
			data-slot="autocomplete-trigger"
			className={className}
			{...props}
		/>
	);
}

export {
	Autocomplete,
	AutocompleteClear,
	AutocompleteCollection,
	AutocompleteEmpty,
	AutocompleteGroup,
	AutocompleteGroupLabel,
	AutocompleteInput,
	AutocompleteItem,
	AutocompleteList,
	AutocompletePopup,
	AutocompleteRow,
	AutocompleteSeparator,
	AutocompleteStatus,
	AutocompleteTrigger,
	AutocompleteValue,
};
