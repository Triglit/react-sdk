"use client";

import { Field as FieldPrimitive } from "@base-ui-components/react/field";
import { mergeProps } from "@base-ui-components/react/merge-props";
import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

type TextareaProps = React.ComponentProps<"textarea"> & {
	size?: "sm" | "default" | "lg" | number;
	unstyled?: boolean;
};

function Textarea({
	className,
	size = "default",
	unstyled = false,
	...props
}: TextareaProps) {
	return (
		<span
			data-slot="textarea-control"
			data-size={size}
			className={
				cn(
					!unstyled &&
						"tg:relative tg:inline-flex tg:w-full tg:rounded-lg tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:text-base tg:shadow-xs tg:ring-ring/24 tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:has-focus-visible:has-aria-invalid:border-destructive/64 tg:has-focus-visible:has-aria-invalid:ring-destructive/16 tg:has-aria-invalid:border-destructive/36 tg:has-focus-visible:border-ring tg:has-disabled:opacity-64 tg:has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none tg:has-focus-visible:ring-[3px] tg:not-has-disabled:has-not-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] tg:sm:text-sm tg:dark:bg-input/32 tg:dark:bg-clip-border tg:dark:has-aria-invalid:ring-destructive/24 tg:dark:not-has-disabled:has-not-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)]",
					className,
				) || undefined
			}
		>
			<FieldPrimitive.Control
				render={(defaultProps) => (
					<textarea
						data-slot="textarea"
						className={cn(
							"tg:field-sizing-content tg:min-h-17.5 tg:w-full tg:rounded-[inherit] tg:px-[calc(--spacing(3)-1px)] tg:py-[calc(--spacing(1.5)-1px)] tg:outline-none tg:max-sm:min-h-20.5",
							size === "sm" &&
								"tg:min-h-16.5 tg:px-[calc(--spacing(2.5)-1px)] tg:py-[calc(--spacing(1)-1px)] tg:max-sm:min-h-19.5",
							size === "lg" &&
								"tg:min-h-18.5 tg:py-[calc(--spacing(2)-1px)] tg:max-sm:min-h-21.5",
						)}
						{...mergeProps(defaultProps, props)}
					/>
				)}
			/>
		</span>
	);
}

export { Textarea, type TextareaProps };
