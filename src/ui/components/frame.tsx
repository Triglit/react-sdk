import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

function Frame({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="frame"
			className={cn(
				"tg:relative tg:flex tg:flex-col tg:rounded-2xl tg:bg-muted tg:p-1",
				className,
			)}
			{...props}
		/>
	);
}

function FramePanel({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="frame-panel"
			className={cn(
				"tg:relative tg:not-has-[table]:rounded-xl tg:not-has-[table]:border tg:not-has-[table]:bg-card tg:bg-clip-padding tg:not-has-[table]:p-5 tg:not-has-[table]:shadow-xs tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-xl)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:has-[table]:before:hidden tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
				className,
			)}
			{...props}
		/>
	);
}

function FrameHeader({ className, ...props }: React.ComponentProps<"header">) {
	return (
		<header
			data-slot="frame-panel-header"
			className={cn("tg:flex tg:flex-col tg:px-5 tg:py-4", className)}
			{...props}
		/>
	);
}

function FrameTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="frame-panel-title"
			className={cn("tg:font-semibold tg:text-sm", className)}
			{...props}
		/>
	);
}

function FrameDescription({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="frame-panel-description"
			className={cn("tg:text-muted-foreground tg:text-sm", className)}
			{...props}
		/>
	);
}

function FrameFooter({ className, ...props }: React.ComponentProps<"footer">) {
	return (
		<footer
			data-slot="frame-panel-footer"
			className={cn(
				"tg:flex tg:flex-col tg:gap-1 tg:px-5 tg:py-4",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Frame,
	FrameDescription,
	FrameFooter,
	FrameHeader,
	FramePanel,
	FrameTitle,
};
