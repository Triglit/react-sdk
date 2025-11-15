import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { Separator } from "@/ui/components/separator.js";
import { cn } from "@/ui/lib/utils.js";

const groupVariants = cva(
	"tg:flex tg:w-fit tg:*:focus-visible:z-10 tg:*:has-focus-visible:z-10 tg:has-[>[data-slot=group]]:gap-2",
	{
		variants: {
			orientation: {
				horizontal:
					"tg:*:not-first:rounded-s-none tg:*:not-first:border-s-0 tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:rounded-e-none tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:border-e-0 tg:*:not-first:before:-start-[0.5px] tg:*:not-first:before:rounded-s-none tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:before:-end-[0.5px] tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:before:rounded-e-none tg:*:pointer-coarse:after:min-w-auto",
				vertical:
					"tg:flex-col tg:*:not-first:rounded-t-none tg:*:not-first:border-t-0 tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:rounded-b-none tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:border-b-0 tg:*:not-first:before:-top-[0.5px] tg:*:not-first:before:rounded-t-none tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:before:-bottom-[0.5px] tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:before:hidden tg:*:not-[&:nth-last-child(1_of_:not([aria-hidden],span[data-base-ui-inert]))]:before:rounded-b-none tg:dark:*:first:before:block tg:dark:*:last:before:hidden tg:*:pointer-coarse:after:min-h-auto",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	},
);

function Group({
	className,
	orientation,
	children,
	...props
}: {
	className?: string;
	orientation?: VariantProps<typeof groupVariants>["orientation"];
	children: React.ReactNode;
} & React.ComponentProps<"div">) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: Ignore
		<div
			data-slot="group"
			data-orientation={orientation}
			className={cn(groupVariants({ orientation }), className)}
			role="group"
			{...props}
		>
			{children}
		</div>
	);
}

function GroupText({
	className,
	render,
	...props
}: useRender.ComponentProps<"div">) {
	const defaultProps = {
		"data-slot": "group-text",
		className: cn(
			"relative inline-flex items-center rounded-lg border border-border bg-muted bg-clip-padding px-[calc(--spacing(3)-1px)] text-sm font-medium whitespace-nowrap shadow-xs transition-shadow outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:bg-input/64 dark:before:shadow-[0_-1px_--theme(--color-white/8%)] [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
			className,
		),
	};
	return useRender({
		defaultTagName: "div",
		render,
		props: mergeProps(defaultProps, props),
	});
}

function GroupSeparator({
	className,
	orientation = "vertical",
	...props
}: {
	className?: string;
} & React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			orientation={orientation}
			className={cn(
				"tg:[[data-slot=input-control]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&]:-translate-x-px tg:relative tg:z-20 tg:has-[+[data-slot=input-control]:focus-within,+[data-slot=select-trigger]:focus-visible+*,+[data-slot=number-field]:focus-within]:translate-x-px tg:has-[+[data-slot=input-control]:focus-within,+[data-slot=select-trigger]:focus-visible+*,+[data-slot=number-field]:focus-within]:bg-ring tg:[[data-slot=input-control]:focus-within+&,[data-slot=select-trigger]:focus-visible+*+&,[data-slot=number-field]:focus-within+&]:bg-ring",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Group as ButtonGroup,
	GroupSeparator as ButtonGroupSeparator,
	GroupText as ButtonGroupText,
	Group,
	GroupSeparator,
	GroupText,
	groupVariants,
};
