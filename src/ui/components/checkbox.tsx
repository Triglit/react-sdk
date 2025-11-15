"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui-components/react/checkbox";

import { cn } from "@/ui/lib/utils.js";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				"tg:relative tg:inline-flex tg:size-4 tg:shrink-0 tg:items-center tg:justify-center tg:rounded-[0.25rem] tg:border tg:border-input tg:bg-background tg:bg-clip-padding tg:shadow-xs tg:outline-none tg:ring-ring tg:transition-shadow tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(0.25rem-1px)] tg:not-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] tg:focus-visible:ring-2 tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:disabled:cursor-not-allowed tg:disabled:opacity-64 tg:aria-invalid:border-destructive/36 tg:focus-visible:aria-invalid:border-destructive/64 tg:focus-visible:aria-invalid:ring-destructive/48 tg:dark:not-data-checked:bg-input/32 tg:dark:bg-clip-border tg:dark:aria-invalid:ring-destructive/24 tg:dark:not-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&:is(:disabled,[data-checked],[aria-invalid])]:shadow-none",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="tg:-inset-px tg:absolute tg:flex tg:items-center tg:justify-center tg:rounded-[0.25rem] tg:text-primary-foreground tg:data-unchecked:hidden tg:data-checked:bg-primary tg:data-indeterminate:text-foreground"
				render={(props, state) => (
					<span {...props}>
						{state.indeterminate ? (
							<svg
								className="tg:size-3"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Check</title>
								<path d="M5.252 12h13.496" />
							</svg>
						) : (
							<svg
								className="tg:size-3"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Check</title>
								<path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
							</svg>
						)}
					</span>
				)}
			/>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
