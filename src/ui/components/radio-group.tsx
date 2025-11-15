"use client";

import { Radio as RadioPrimitive } from "@base-ui-components/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui-components/react/radio-group";

import { cn } from "@/ui/lib/utils.js";

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
	return (
		<RadioGroupPrimitive
			data-slot="radio-group"
			className={cn("tg:flex tg:flex-col tg:gap-3", className)}
			{...props}
		/>
	);
}

function Radio({ className, ...props }: RadioPrimitive.Root.Props) {
	return (
		<RadioPrimitive.Root
			data-slot="radio"
			className={cn(
				"tg:relative tg:inline-flex tg:size-4 tg:shrink-0 tg:items-center tg:justify-center tg:rounded-full tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:shadow-xs tg:outline-none tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-full tg:not-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:disabled:cursor-not-allowed tg:disabled:opacity-64 tg:aria-invalid:border-destructive/36 tg:focus-visible:aria-invalid:border-destructive/64 tg:focus-visible:aria-invalid:ring-destructive/48 tg:dark:not-data-checked:bg-input/32 tg:dark:bg-clip-border tg:dark:aria-invalid:ring-destructive/24 tg:dark:not-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&:is(:disabled,[data-checked],[aria-invalid])]:shadow-none",
				className,
			)}
			{...props}
		>
			<RadioPrimitive.Indicator
				data-slot="radio-indicator"
				className="tg:-inset-px tg:absolute tg:flex tg:size-4 tg:items-center tg:justify-center tg:rounded-full tg:before:size-1.5 tg:before:rounded-full tg:before:bg-primary-foreground tg:data-unchecked:hidden tg:data-checked:bg-primary"
			/>
		</RadioPrimitive.Root>
	);
}

export { Radio, RadioGroup, Radio as RadioGroupItem };
