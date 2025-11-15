"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { Input, type InputProps } from "@/ui/components/input.js";
import { Textarea, type TextareaProps } from "@/ui/components/textarea.js";
import { cn } from "@/ui/lib/utils.js";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: Ignore
		<div
			data-slot="input-group"
			role="group"
			className={cn(
				"tg:relative tg:inline-flex tg:w-full tg:min-w-0 tg:items-center tg:rounded-lg tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:text-base/5 tg:shadow-xs tg:ring-ring/24 tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:not-has-[input:disabled,textarea:disabled]:not-has-[input:focus-visible,textarea:focus-visible]:not-has-[input[aria-invalid],textarea[aria-invalid]]:before:shadow-[0_1px_--theme(--color-black/4%)] tg:has-[input:focus-visible,textarea:focus-visible]:has-[input[aria-invalid],textarea[aria-invalid]]:border-destructive/64 tg:has-[input:focus-visible,textarea:focus-visible]:has-[input[aria-invalid],textarea[aria-invalid]]:ring-destructive/16 tg:has-[textarea]:h-auto tg:has-data-[align=block-end]:h-auto tg:has-data-[align=block-start]:h-auto tg:has-data-[align=block-end]:flex-col tg:has-data-[align=block-start]:flex-col tg:has-[input:focus-visible,textarea:focus-visible]:border-ring tg:has-[input[aria-invalid],textarea[aria-invalid]]:border-destructive/36 tg:has-[input:disabled,textarea:disabled]:opacity-64 tg:has-[input:disabled,textarea:disabled,input:focus-visible,textarea:focus-visible,input[aria-invalid],textarea[aria-invalid]]:shadow-none tg:has-[input:focus-visible,textarea:focus-visible]:ring-[3px] tg:sm:text-sm tg:dark:bg-input/32 tg:dark:not-in-data-[slot=group]:bg-clip-border tg:dark:has-[input[aria-invalid],textarea[aria-invalid]]:ring-destructive/24 tg:dark:not-has-[input:disabled,textarea:disabled]:not-has-[input:focus-visible,textarea:focus-visible]:not-has-[input[aria-invalid],textarea[aria-invalid]]:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:*:[&:is([data-slot=input-control],[data-slot=textarea-control])]:contents tg:*:[&:is([data-slot=input-control],[data-slot=textarea-control])]:before:hidden tg:has-data-[align=inline-start]:**:[[data-size=sm]_input]:ps-1.5 tg:has-data-[align=inline-end]:**:[[data-size=sm]_input]:pe-1.5 tg:has-data-[align=inline-start]:**:[input]:ps-2 tg:has-data-[align=inline-end]:**:[input]:pe-2 tg:has-data-[align=block-end]:**:[input]:pt-3 tg:has-data-[align=block-start]:**:[input]:pb-[calc(--spacing(3)-1px)] tg:**:[textarea]:min-h-20.5 tg:**:[textarea]:resize-none tg:**:[textarea]:py-[calc(--spacing(3)-1px)] tg:**:[textarea]:max-sm:min-h-23.5 tg:**:[textarea_button]:rounded-[calc(var(--radius-md)-1px)]",
				className,
			)}
			{...props}
		/>
	);
}

const inputGroupAddonVariants = cva(
	"tg:flex tg:h-auto tg:cursor-text tg:items-center tg:justify-center tg:gap-2 tg:select-none tg:not-has-[button]:**:[svg]:opacity-72 tg:[&>kbd]:rounded-[calc(var(--radius)-5px)] tg:[&>svg:not([class*=size-])]:size-4",
	{
		variants: {
			align: {
				"inline-start":
					"tg:order-first tg:ps-[calc(--spacing(3)-1px)] tg:has-[>[data-slot=badge]]:-ms-1.5 tg:has-[>button]:-ms-2 tg:has-[>kbd]:ms-[-0.35rem] tg:[[data-size=sm]+&]:ps-[calc(--spacing(2.5)-1px)]",
				"inline-end":
					"tg:order-last tg:pe-[calc(--spacing(3)-1px)] tg:has-[>[data-slot=badge]]:-me-1.5 tg:has-[>button]:-me-2 tg:has-[>kbd]:me-[-0.35rem] tg:[[data-size=sm]+&]:pe-[calc(--spacing(2.5)-1px)]",
				"block-start":
					"tg:order-first tg:w-full tg:justify-start tg:px-[calc(--spacing(3)-1px)] tg:pt-[calc(--spacing(3)-1px)] tg:[.border-b]:pb-[calc(--spacing(3)-1px)] tg:[[data-size=sm]+&]:px-[calc(--spacing(2.5)-1px)]",
				"block-end":
					"tg:order-last tg:w-full tg:justify-start tg:px-[calc(--spacing(3)-1px)] tg:pb-[calc(--spacing(3)-1px)] tg:[.border-t]:pt-[calc(--spacing(3)-1px)] tg:[[data-size=sm]+&]:px-[calc(--spacing(2.5)-1px)]",
			},
		},
		defaultVariants: {
			align: "inline-start",
		},
	},
);

function InputGroupAddon({
	className,
	align = "inline-start",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: Ignore
		<div
			data-slot="input-group-addon"
			data-align={align}
			className={cn(inputGroupAddonVariants({ align }), className)}
			onMouseDown={(e) => {
				const target = e.target as HTMLElement;
				const isInteractive = target.closest("button, a");
				if (isInteractive) return;
				e.preventDefault();
				const parent = e.currentTarget.parentElement;
				const input = parent?.querySelector<
					HTMLInputElement | HTMLTextAreaElement
				>("input, textarea");
				if (
					input &&
					!parent?.querySelector("input:focus, textarea:focus")
				) {
					input.focus();
				}
			}}
			{...props}
		/>
	);
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"tg:flex tg:items-center tg:gap-2 tg:text-muted-foreground tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function InputGroupInput({ className, ...props }: InputProps) {
	return <Input className={className} unstyled {...props} />;
}

function InputGroupTextarea({ className, ...props }: TextareaProps) {
	return <Textarea className={className} unstyled {...props} />;
}

export {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
	InputGroupTextarea,
};
