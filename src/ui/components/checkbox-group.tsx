"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui-components/react/checkbox-group";

import { cn } from "@/ui/lib/utils.js";

function CheckboxGroup({ className, ...props }: CheckboxGroupPrimitive.Props) {
	return (
		<CheckboxGroupPrimitive
			className={cn(
				"tg:flex tg:flex-col tg:items-start tg:gap-3",
				className,
			)}
			{...props}
		/>
	);
}

export { CheckboxGroup };
