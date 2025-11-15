"use client";

import { Switch as SwitchPrimitive } from "@base-ui-components/react/switch";

import { cn } from "@/ui/lib/utils.js";

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"tg:group/switch tg:inset-shadow-[0_1px_--theme(--color-black/4%)] tg:inline-flex tg:h-[1.125rem] tg:w-7.5 tg:shrink-0 tg:items-center tg:rounded-full tg:p-px tg:outline-none tg:transition-all tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:disabled:cursor-not-allowed tg:disabled:opacity-64 tg:data-checked:bg-primary tg:data-unchecked:bg-input",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"tg:pointer-events-none tg:block tg:size-4 tg:rounded-full tg:bg-background tg:shadow-sm tg:transition-[translate,width] tg:group-active/switch:w-4.5 tg:data-checked:translate-x-3 tg:data-unchecked:translate-x-0 tg:data-checked:group-active/switch:translate-x-2.5",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
