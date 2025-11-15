import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

const alertVariants = cva(
	"tg:relative tg:grid tg:w-full tg:items-start tg:gap-x-2 tg:gap-y-0.5 tg:rounded-xl tg:border tg:px-3.5 tg:py-3 tg:text-sm tg:text-card-foreground tg:has-data-[slot=alert-action]:grid-cols-[1fr_auto] tg:has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] tg:has-[>svg]:gap-x-2 tg:has-[>svg]:has-data-[slot=alert-action]:grid-cols-[calc(var(--spacing)*4)_1fr_auto] tg:[&>svg]:h-[1lh] tg:[&>svg]:w-4",
	{
		variants: {
			variant: {
				default:
					"tg:bg-transparent tg:dark:bg-input/32 tg:[&>svg]:text-muted-foreground",
				info: "tg:border-info/32 tg:bg-info/4 tg:[&>svg]:text-info",
				success:
					"tg:border-success/32 tg:bg-success/4 tg:[&>svg]:text-success",
				warning:
					"tg:border-warning/32 tg:bg-warning/4 tg:[&>svg]:text-warning",
				error: "tg:border-destructive/32 tg:bg-destructive/4 tg:[&>svg]:text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn("tg:font-medium tg:[svg~&]:col-start-2", className)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"tg:flex tg:flex-col tg:gap-2.5 tg:text-muted-foreground tg:[svg~&]:col-start-2",
				className,
			)}
			{...props}
		/>
	);
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-action"
			className={cn(
				"tg:flex tg:gap-1 tg:max-sm:col-start-2 tg:max-sm:mt-2 tg:sm:row-start-1 tg:sm:row-end-3 tg:sm:self-center tg:sm:[[data-slot=alert-description]~&]:col-start-2 tg:sm:[[data-slot=alert-title]~&]:col-start-2 tg:sm:[svg~&]:col-start-2 tg:sm:[svg~[data-slot=alert-description]~&]:col-start-3 tg:sm:[svg~[data-slot=alert-title]~&]:col-start-3",
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
