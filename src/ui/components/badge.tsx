import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/ui/lib/utils.js";

const badgeVariants = cva(
	"tg:relative tg:inline-flex tg:shrink-0 tg:items-center tg:justify-center tg:gap-1 tg:rounded-sm tg:border tg:border-transparent tg:font-medium tg:whitespace-nowrap tg:transition-shadow tg:outline-none tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:disabled:pointer-events-none tg:disabled:opacity-64 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0 tg:[&_svg:not([class*=size-])]:size-3 tg:[button,a&]:cursor-pointer tg:[button,a&]:pointer-coarse:after:absolute tg:[button,a&]:pointer-coarse:after:size-full tg:[button,a&]:pointer-coarse:after:min-h-11 tg:[button,a&]:pointer-coarse:after:min-w-11",
	{
		variants: {
			variant: {
				default:
					"tg:bg-primary tg:text-primary-foreground tg:[button,a&]:hover:bg-primary/90",
				destructive:
					"tg:bg-destructive tg:text-white tg:[button,a&]:hover:bg-destructive/90",
				outline:
					"tg:border-border tg:bg-transparent tg:dark:bg-input/32 tg:[button,a&]:hover:bg-accent/50 tg:dark:[button,a&]:hover:bg-input/48",
				secondary:
					"tg:bg-secondary tg:text-secondary-foreground tg:[button,a&]:hover:bg-secondary/90",
				info: "tg:bg-info/8 tg:text-info-foreground tg:dark:bg-info/16",
				success:
					"tg:bg-success/8 tg:text-success-foreground tg:dark:bg-success/16",
				warning:
					"tg:bg-warning/8 tg:text-warning-foreground tg:dark:bg-warning/16",
				error: "tg:bg-destructive/8 tg:text-destructive-foreground tg:dark:bg-destructive/16",
			},
			size: {
				default: "tg:px-[calc(--spacing(1)-1px)] tg:text-xs",
				sm: "tg:rounded-[calc(var(--radius-sm)-2px)] tg:px-[calc(--spacing(1)-1px)] tg:text-[.625rem]",
				lg: "tg:px-[calc(--spacing(1.5)-1px)] tg:text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface BadgeProps extends useRender.ComponentProps<"span"> {
	variant?: VariantProps<typeof badgeVariants>["variant"];
	size?: VariantProps<typeof badgeVariants>["size"];
}

function Badge({ className, variant, size, render, ...props }: BadgeProps) {
	const defaultProps = {
		"data-slot": "badge",
		className: cn(badgeVariants({ variant, size, className })),
	};

	return useRender({
		defaultTagName: "span",
		render,
		props: mergeProps<"span">(defaultProps, props),
	});
}

export { Badge, badgeVariants };
