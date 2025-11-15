"use client";

import { Input as InputPrimitive } from "@base-ui-components/react/input";
import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

type InputProps = Omit<
	InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
	"size"
> & {
	size?: "sm" | "default" | "lg" | number;
	unstyled?: boolean;
};

function Input({
	className,
	size = "default",
	unstyled = false,
	...props
}: InputProps) {
	return (
		<span
			data-slot="input-control"
			data-size={size}
			className={
				cn(
					!unstyled &&
						"tg:relative tg:inline-flex tg:w-full tg:rounded-lg tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:text-base/5 tg:shadow-xs tg:ring-ring/24 tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] tg:has-focus-visible:has-aria-invalid:border-destructive/64 tg:has-focus-visible:has-aria-invalid:ring-destructive/16 tg:has-aria-invalid:border-destructive/36 tg:has-focus-visible:border-ring tg:has-disabled:opacity-64 tg:has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none tg:has-focus-visible:ring-[3px] tg:sm:text-sm tg:dark:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:has-aria-invalid:ring-destructive/24 tg:dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)]",
					className,
				) || undefined
			}
		>
			<InputPrimitive
				data-slot="input"
				className={cn(
					"tg:w-full tg:min-w-0 tg:rounded-[inherit] tg:px-[calc(--spacing(3)-1px)] tg:py-[calc(--spacing(1.5)-1px)] tg:outline-none tg:placeholder:text-muted-foreground/64",
					size === "sm" &&
						"tg:px-[calc(--spacing(2.5)-1px)] tg:py-[calc(--spacing(1)-1px)]",
					size === "lg" && "tg:py-[calc(--spacing(2)-1px)]",
					props.type === "search" &&
						"tg:[&::-webkit-search-cancel-button]:appearance-none tg:[&::-webkit-search-decoration]:appearance-none tg:[&::-webkit-search-results-button]:appearance-none tg:[&::-webkit-search-results-decoration]:appearance-none",
					props.type === "file" &&
						"tg:text-muted-foreground tg:file:me-3 tg:file:bg-transparent tg:file:font-medium tg:file:text-foreground tg:file:text-sm",
				)}
				size={typeof size === "number" ? size : undefined}
				{...props}
			/>
		</span>
	);
}

export { Input, type InputProps };
