"use client";

import { Toggle as TogglePrimitive } from "@base-ui-components/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/ui/lib/utils.js";

const toggleVariants = cva(
	"tg:relative tg:inline-flex tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:gap-2 tg:rounded-lg tg:border tg:text-sm tg:font-medium tg:whitespace-nowrap tg:transition-shadow tg:outline-none tg:select-none tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:hover:bg-accent/50 tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:disabled:pointer-events-none tg:disabled:opacity-64 tg:data-pressed:bg-accent tg:data-pressed:text-accent-foreground tg:data-pressed:transition-none tg:dark:hover:bg-accent tg:dark:data-pressed:bg-input/80 tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0 tg:[&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default: "tg:border-transparent",
				outline:
					"tg:border-border tg:bg-clip-padding tg:shadow-xs tg:not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:bg-input/32 tg:dark:not-disabled:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/4%)] tg:dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:dark:hover:bg-input/64 tg:[&:is(:disabled,:active,[data-pressed])]:shadow-none",
			},
			size: {
				default: "tg:h-8 tg:min-w-8 tg:px-[calc(--spacing(2)-1px)]",
				sm: "tg:h-7 tg:min-w-7 tg:px-[calc(--spacing(1.5)-1px)]",
				lg: "tg:h-9 tg:min-w-9 tg:px-[calc(--spacing(2.5)-1px)]",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Toggle({
	className,
	variant,
	size,
	...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Toggle, toggleVariants };
