"use client";

import { Avatar as AvatarPrimitive } from "@base-ui-components/react/avatar";

import { cn } from "@/ui/lib/utils.js";

function Avatar({ className, ...props }: AvatarPrimitive.Root.Props) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			className={cn(
				"tg:inline-flex tg:size-8 tg:shrink-0 tg:select-none tg:items-center tg:justify-center tg:overflow-hidden tg:rounded-full tg:bg-background tg:align-middle tg:font-medium tg:text-xs",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn("tg:size-full tg:object-cover", className)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(
				"tg:flex tg:size-full tg:items-center tg:justify-center tg:rounded-full tg:bg-muted",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarFallback, AvatarImage };
