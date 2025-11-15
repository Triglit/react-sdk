"use client";

import { Field as FieldPrimitive } from "@base-ui-components/react/field";

import { cn } from "@/ui/lib/utils.js";

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
	return (
		<FieldPrimitive.Root
			data-slot="field"
			className={cn(
				"tg:flex tg:flex-col tg:items-start tg:gap-2",
				className,
			)}
			{...props}
		/>
	);
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
	return (
		<FieldPrimitive.Label
			data-slot="field-label"
			className={cn(
				"tg:inline-flex tg:items-center tg:gap-2 tg:text-sm/4",
				className,
			)}
			{...props}
		/>
	);
}

function FieldDescription({
	className,
	...props
}: FieldPrimitive.Description.Props) {
	return (
		<FieldPrimitive.Description
			data-slot="field-description"
			className={cn("tg:text-muted-foreground tg:text-xs", className)}
			{...props}
		/>
	);
}

function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
	return (
		<FieldPrimitive.Error
			data-slot="field-error"
			className={cn(
				"tg:text-destructive-foreground tg:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

const FieldControl = FieldPrimitive.Control;
const FieldValidity = FieldPrimitive.Validity;

export {
	Field,
	FieldControl,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldValidity,
};
