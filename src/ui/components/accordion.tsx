"use client";

import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/ui/lib/utils.js";

function Accordion(props: AccordionPrimitive.Root.Props) {
	return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("tg:border-b tg:last:border-b-0", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="tg:flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"tg:flex tg:flex-1 tg:cursor-pointer tg:items-start tg:justify-between tg:gap-4 tg:rounded-md tg:py-4 tg:text-left tg:font-medium tg:text-sm tg:outline-none tg:transition-all tg:focus-visible:ring-[3px] tg:focus-visible:ring-ring tg:disabled:pointer-events-none tg:disabled:opacity-64 tg:[&[data-panel-open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDownIcon className="tg:pointer-events-none tg:size-4 tg:shrink-0 tg:translate-y-0.5 tg:opacity-72 tg:transition-transform tg:duration-200 tg:ease-in-out" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionPanel({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-panel"
			className="tg:h-(--accordion-panel-height) tg:overflow-hidden tg:text-muted-foreground tg:text-sm tg:transition-[height] tg:duration-200 tg:ease-in-out tg:data-ending-style:h-0 tg:data-starting-style:h-0"
			{...props}
		>
			<div className={cn("tg:pt-0 tg:pb-4", className)}>{children}</div>
		</AccordionPrimitive.Panel>
	);
}

export {
	Accordion,
	AccordionPanel as AccordionContent,
	AccordionItem,
	AccordionPanel,
	AccordionTrigger,
};
