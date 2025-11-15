import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

const buttonVariants = cva(
	"tg:relative tg:inline-flex tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:gap-2 tg:rounded-lg tg:border tg:bg-clip-padding tg:text-sm tg:font-medium tg:whitespace-nowrap tg:transition-shadow tg:outline-none tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:disabled:pointer-events-none tg:disabled:opacity-64 tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0 tg:[&_svg:not([class*=size-])]:size-4",
	{
		variants: {
			variant: {
				default:
					"tg:border-primary tg:bg-primary tg:text-primary-foreground tg:shadow-xs tg:shadow-primary/24 tg:not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] tg:hover:bg-primary/90 tg:[&:is(:active,[data-pressed])]:inset-shadow-[0_1px_--theme(--color-black/8%)] tg:[&:is(:disabled,:active,[data-pressed])]:shadow-none",
				outline:
					"tg:border-border tg:bg-background tg:shadow-xs tg:not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/4%)] tg:dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&:is(:disabled,:active,[data-pressed])]:shadow-none tg:[&:is(:hover,[data-pressed])]:bg-accent/50 tg:dark:[&:is(:hover,[data-pressed])]:bg-input/64",
				secondary:
					"tg:border-secondary tg:bg-secondary tg:text-secondary-foreground tg:hover:bg-secondary/90 tg:data-pressed:bg-secondary/90",
				destructive:
					"tg:border-destructive tg:bg-destructive tg:text-white tg:shadow-xs tg:shadow-destructive/24 tg:not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] tg:hover:bg-destructive/90 tg:[&:is(:active,[data-pressed])]:inset-shadow-[0_1px_--theme(--color-black/8%)] tg:[&:is(:disabled,:active,[data-pressed])]:shadow-none",
				"destructive-outline":
					"tg:border-border tg:bg-transparent tg:text-destructive-foreground tg:shadow-xs tg:not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/4%)] tg:dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&:is(:disabled,:active,[data-pressed])]:shadow-none tg:[&:is(:hover,[data-pressed])]:border-destructive/32 tg:[&:is(:hover,[data-pressed])]:bg-destructive/4",
				ghost: "tg:border-transparent tg:hover:bg-accent tg:data-pressed:bg-accent",
				link: "tg:border-transparent tg:underline-offset-4 tg:hover:underline",
			},
			size: {
				default:
					"tg:min-h-8 tg:px-[calc(--spacing(3)-1px)] tg:py-[calc(--spacing(1.5)-1px)]",
				xs: "tg:min-h-6 tg:gap-1 tg:rounded-md tg:px-[calc(--spacing(2)-1px)] tg:py-[calc(--spacing(1)-1px)] tg:text-xs tg:before:rounded-[calc(var(--radius-md)-1px)] tg:[&_svg:not([class*=size-])]:size-3",
				sm: "tg:min-h-7 tg:gap-1.5 tg:px-[calc(--spacing(2.5)-1px)] tg:py-[calc(--spacing(1)-1px)]",
				lg: "tg:min-h-9 tg:px-[calc(--spacing(3.5)-1px)] tg:py-[calc(--spacing(2)-1px)]",
				xl: "tg:min-h-10 tg:px-[calc(--spacing(4)-1px)] tg:py-[calc(--spacing(2)-1px)] tg:text-base tg:[&_svg:not([class*=size-])]:size-4.5",
				icon: "tg:size-8",
				"icon-xs":
					"tg:size-6 tg:rounded-md tg:before:rounded-[calc(var(--radius-md)-1px)]",
				"icon-sm": "tg:size-7",
				"icon-lg": "tg:size-9",
				"icon-xl": "tg:size-10 tg:[&_svg:not([class*=size-])]:size-4.5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface ButtonProps extends useRender.ComponentProps<"button"> {
	variant?: VariantProps<typeof buttonVariants>["variant"];
	size?: VariantProps<typeof buttonVariants>["size"];
}

function Button({ className, variant, size, render, ...props }: ButtonProps) {
	const typeValue: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] =
		render ? undefined : "button";

	const defaultProps = {
		"data-slot": "button",
		className: cn(buttonVariants({ variant, size, className })),
		type: typeValue,
	};

	return useRender({
		defaultTagName: "button",
		render,
		props: mergeProps<"button">(defaultProps, props),
	});
}

export { Button, buttonVariants };
