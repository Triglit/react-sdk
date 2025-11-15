import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"tg:relative tg:flex tg:flex-col tg:gap-6 tg:rounded-2xl tg:border tg:bg-card tg:bg-clip-padding tg:py-6 tg:text-card-foreground tg:shadow-xs tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-2xl)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"tg:@container/card-header tg:grid tg:auto-rows-min tg:grid-rows-[auto_auto] tg:items-start tg:gap-1.5 tg:px-6 tg:has-data-[slot=card-action]:grid-cols-[1fr_auto] tg:[.border-b]:pb-6",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"tg:font-semibold tg:text-lg tg:leading-none",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("tg:text-muted-foreground tg:text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"tg:col-start-2 tg:row-span-2 tg:row-start-1 tg:self-start tg:justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardPanel({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("tg:px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"tg:flex tg:items-center tg:px-6 tg:[.border-t]:pt-6",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardPanel as CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardPanel,
	CardTitle,
};
