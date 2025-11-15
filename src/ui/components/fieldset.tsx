"use client";

import { Fieldset as FieldsetPrimitive } from "@base-ui-components/react/fieldset";

import { cn } from "@/ui/lib/utils.js";

function Fieldset({ className, ...props }: FieldsetPrimitive.Root.Props) {
	return (
		<FieldsetPrimitive.Root
			data-slot="fieldset"
			className={cn(
				"tg:flex tg:w-full tg:max-w-64 tg:flex-col tg:gap-6",
				className,
			)}
			{...props}
		/>
	);
}
function FieldsetLegend({
	className,
	...props
}: FieldsetPrimitive.Legend.Props) {
	return (
		<FieldsetPrimitive.Legend
			data-slot="fieldset-legend"
			className={cn("tg:font-semibold", className)}
			{...props}
		/>
	);
}

export { Fieldset, FieldsetLegend };
