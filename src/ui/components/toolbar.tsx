"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui-components/react/toolbar";

import { cn } from "@/ui/lib/utils.js";

function Toolbar({ className, ...props }: ToolbarPrimitive.Root.Props) {
	return (
		<ToolbarPrimitive.Root
			data-slot="toolbar"
			className={cn(
				"tg:relative tg:flex tg:gap-2 tg:rounded-xl tg:border tg:bg-card tg:bg-clip-padding tg:p-1 tg:text-card-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function ToolbarButton({ className, ...props }: ToolbarPrimitive.Button.Props) {
	return (
		<ToolbarPrimitive.Button
			data-slot="toolbar-button"
			className={cn(className)}
			{...props}
		/>
	);
}

function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
	return (
		<ToolbarPrimitive.Link
			data-slot="toolbar-link"
			className={cn(className)}
			{...props}
		/>
	);
}

function ToolbarInput({ className, ...props }: ToolbarPrimitive.Input.Props) {
	return (
		<ToolbarPrimitive.Input
			data-slot="toolbar-input"
			className={cn(className)}
			{...props}
		/>
	);
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
	return (
		<ToolbarPrimitive.Group
			data-slot="toolbar-group"
			className={cn("tg:flex tg:items-center tg:gap-1", className)}
			{...props}
		/>
	);
}

function ToolbarSeparator({
	className,
	...props
}: ToolbarPrimitive.Separator.Props) {
	return (
		<ToolbarPrimitive.Separator
			data-slot="toolbar-separator"
			className={cn(
				"tg:shrink-0 tg:bg-border tg:data-[orientation=horizontal]:my-0.5 tg:data-[orientation=vertical]:my-1.5 tg:data-[orientation=horizontal]:h-px tg:data-[orientation=horizontal]:w-full tg:data-[orientation=vertical]:w-px tg:data-[orientation=vertical]:not-[[class^=h-]]:not-[[class*=_h-]]:self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarInput,
	ToolbarLink,
	ToolbarSeparator,
};
