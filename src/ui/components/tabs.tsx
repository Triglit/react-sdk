"use client";

import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";

import { cn } from "@/ui/lib/utils.js";

type TabsVariant = "default" | "underline";

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn(
				"tg:flex tg:flex-col tg:gap-2 tg:data-[orientation=vertical]:flex-row",
				className,
			)}
			{...props}
		/>
	);
}

function TabsList({
	variant = "default",
	className,
	children,
	...props
}: TabsPrimitive.List.Props & {
	variant?: TabsVariant;
}) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				"tg:relative tg:z-0 tg:flex tg:w-fit tg:items-center tg:justify-center tg:gap-x-0.5 tg:text-muted-foreground",
				"tg:data-[orientation=vertical]:flex-col",
				variant === "default"
					? "tg:rounded-lg tg:bg-muted tg:p-0.5 tg:text-muted-foreground/64"
					: "tg:data-[orientation=vertical]:px-1 tg:data-[orientation=horizontal]:py-1 tg:*:data-[slot=tabs-trigger]:hover:bg-accent",
				className,
			)}
			{...props}
		>
			{children}
			<TabsPrimitive.Indicator
				data-slot="tab-indicator"
				className={cn(
					"tg:-translate-y-(--active-tab-bottom) tg:absolute tg:bottom-0 tg:left-0 tg:h-(--active-tab-height) tg:w-(--active-tab-width) tg:translate-x-(--active-tab-left) tg:transition-[width,translate] tg:duration-200 tg:ease-in-out",
					variant === "underline"
						? "tg:data-[orientation=vertical]:-translate-x-px tg:z-10 tg:bg-primary tg:data-[orientation=horizontal]:h-0.5 tg:data-[orientation=vertical]:w-0.5 tg:data-[orientation=horizontal]:translate-y-px"
						: "tg:-z-1 tg:rounded-md tg:bg-background tg:shadow-sm tg:dark:bg-accent",
				)}
			/>
		</TabsPrimitive.List>
	);
}

function TabsTab({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				"tg:flex tg:flex-1 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:whitespace-nowrap tg:rounded-md tg:border tg:border-transparent tg:font-medium tg:text-sm tg:outline-none tg:transition-[color,background-color,box-shadow] tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:data-disabled:pointer-events-none tg:data-disabled:opacity-64 tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				"tg:hover:text-muted-foreground tg:data-selected:text-foreground",
				"tg:gap-1.5 tg:px-[calc(--spacing(2.5)-1px)] tg:py-[calc(--spacing(1.5)-1px)]",
				"tg:data-[orientation=vertical]:w-full tg:data-[orientation=vertical]:justify-start",
				className,
			)}
			{...props}
		/>
	);
}

function TabsPanel({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn("tg:flex-1 tg:outline-none", className)}
			{...props}
		/>
	);
}

export {
	Tabs,
	TabsPanel as TabsContent,
	TabsList,
	TabsPanel,
	TabsTab,
	TabsTab as TabsTrigger,
};
