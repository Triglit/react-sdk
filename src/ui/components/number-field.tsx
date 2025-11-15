"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui-components/react/number-field";
import { MinusIcon, PlusIcon } from "lucide-react";
import * as React from "react";

import { Label } from "@/ui/components/label.js";
import { cn } from "@/ui/lib/utils.js";

const NumberFieldContext = React.createContext<{
	fieldId: string;
} | null>(null);

function NumberField({
	id,
	className,
	size = "default",
	...props
}: NumberFieldPrimitive.Root.Props & {
	size?: "sm" | "default" | "lg";
}) {
	const generatedId = React.useId();
	const fieldId = id ?? generatedId;

	return (
		<NumberFieldContext.Provider value={{ fieldId }}>
			<NumberFieldPrimitive.Root
				id={fieldId}
				className={cn(
					"tg:flex tg:w-full tg:flex-col tg:items-start tg:gap-2",
					className,
				)}
				data-slot="number-field"
				data-size={size}
				{...props}
			/>
		</NumberFieldContext.Provider>
	);
}

function NumberFieldGroup({
	className,
	...props
}: NumberFieldPrimitive.Group.Props) {
	return (
		<NumberFieldPrimitive.Group
			className={cn(
				"tg:relative tg:flex tg:w-full tg:justify-between tg:rounded-lg tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:text-sm tg:shadow-xs tg:ring-ring/24 tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] tg:focus-within:border-ring tg:focus-within:ring-[3px] tg:has-aria-invalid:border-destructive/36 tg:focus-within:has-aria-invalid:border-destructive/64 tg:focus-within:has-aria-invalid:ring-destructive/48 tg:data-disabled:pointer-events-none tg:data-disabled:opacity-64 tg:dark:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:has-aria-invalid:ring-destructive/24 tg:dark:not-data-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&:is([data-disabled],:focus-within,[aria-invalid])]:shadow-none tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			data-slot="number-field-group"
			{...props}
		/>
	);
}

function NumberFieldDecrement({
	className,
	...props
}: NumberFieldPrimitive.Decrement.Props) {
	return (
		<NumberFieldPrimitive.Decrement
			className={cn(
				"tg:relative tg:flex tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-s-[calc(var(--radius-lg)-1px)] tg:in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] tg:px-[calc(--spacing(3)-1px)] tg:transition-colors tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:bg-accent",
				className,
			)}
			data-slot="number-field-decrement"
			{...props}
		>
			<MinusIcon />
		</NumberFieldPrimitive.Decrement>
	);
}

function NumberFieldIncrement({
	className,
	...props
}: NumberFieldPrimitive.Increment.Props) {
	return (
		<NumberFieldPrimitive.Increment
			className={cn(
				"tg:relative tg:flex tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-e-[calc(var(--radius-lg)-1px)] tg:in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] tg:px-[calc(--spacing(3)-1px)] tg:transition-colors tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:bg-accent",
				className,
			)}
			data-slot="number-field-increment"
			{...props}
		>
			<PlusIcon />
		</NumberFieldPrimitive.Increment>
	);
}

function NumberFieldInput({
	className,
	...props
}: NumberFieldPrimitive.Input.Props) {
	return (
		<NumberFieldPrimitive.Input
			className={cn(
				"tg:w-full tg:min-w-0 tg:flex-1 tg:bg-transparent tg:in-data-[size=sm]:px-[calc(--spacing(2.5)-1px)] tg:px-[calc(--spacing(3)-1px)] tg:in-data-[size=lg]:py-[calc(--spacing(2)-1px)] tg:in-data-[size=sm]:py-[calc(--spacing(1)-1px)] tg:py-[calc(--spacing(1.5)-1px)] tg:text-center tg:tabular-nums tg:outline-none",
				className,
			)}
			data-slot="number-field-input"
			{...props}
		/>
	);
}

function NumberFieldScrubArea({
	className,
	label,
	...props
}: NumberFieldPrimitive.ScrubArea.Props & {
	label: string;
}) {
	const context = React.useContext(NumberFieldContext);

	if (!context) {
		throw new Error(
			"NumberFieldScrubArea must be used within a NumberField component for accessibility.",
		);
	}

	return (
		<NumberFieldPrimitive.ScrubArea
			className={cn("tg:flex tg:cursor-ew-resize", className)}
			data-slot="number-field-scrub-area"
			{...props}
		>
			<Label htmlFor={context.fieldId} className="tg:cursor-ew-resize">
				{label}
			</Label>
			<NumberFieldPrimitive.ScrubAreaCursor className="tg:drop-shadow-[0_1px_1px_#0008] tg:filter">
				<CursorGrowIcon />
			</NumberFieldPrimitive.ScrubAreaCursor>
		</NumberFieldPrimitive.ScrubArea>
	);
}

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
	return (
		<svg
			width="26"
			height="14"
			viewBox="0 0 24 14"
			fill="black"
			stroke="white"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Cursor Grow Icon</title>
			<path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
		</svg>
	);
}

export {
	NumberField,
	NumberFieldDecrement,
	NumberFieldGroup,
	NumberFieldIncrement,
	NumberFieldInput,
	NumberFieldScrubArea,
};
