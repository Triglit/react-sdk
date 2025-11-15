"use client";

import { Form as FormPrimitive } from "@base-ui-components/react/form";

import { cn } from "@/ui/lib/utils.js";

function Form({ className, ...props }: FormPrimitive.Props) {
	return (
		<FormPrimitive
			data-slot="form"
			className={cn("tg:flex tg:w-full tg:flex-col tg:gap-4", className)}
			{...props}
		/>
	);
}

export { Form };
