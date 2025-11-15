"use client";

import { Menu as MenuPrimitive } from "@base-ui-components/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

const Menu = MenuPrimitive.Root;

const MenuPortal = MenuPrimitive.Portal;

function MenuTrigger(props: MenuPrimitive.Trigger.Props) {
	return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />;
}

function MenuPopup({
	className,
	sideOffset = 4,
	align = "center",
	alignOffset = 0,
	side = "bottom",
	...props
}: MenuPrimitive.Popup.Props & {
	align?: MenuPrimitive.Positioner.Props["align"];
	sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
	alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
	side?: MenuPrimitive.Positioner.Props["side"];
}) {
	return (
		<MenuPrimitive.Portal>
			<MenuPrimitive.Positioner
				data-slot="menu-positioner"
				className="tg:z-50"
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
			>
				<span
					className={cn(
						"tg:relative tg:flex tg:origin-(--transform-origin) tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:shadow-lg tg:transition-[scale,opacity] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:has-data-starting-style:scale-98 tg:has-data-starting-style:opacity-0 tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
						className,
					)}
				>
					<MenuPrimitive.Popup
						data-slot="menu-popup"
						className="tg:max-h-(--available-height) tg:not-[class*=w-]:min-w-32 tg:overflow-y-auto tg:p-1"
						{...props}
					/>
				</span>
			</MenuPrimitive.Positioner>
		</MenuPrimitive.Portal>
	);
}

function MenuGroup(props: MenuPrimitive.Group.Props) {
	return <MenuPrimitive.Group data-slot="menu-group" {...props} />;
}

function MenuItem({
	className,
	inset,
	variant = "default",
	...props
}: MenuPrimitive.Item.Props & {
	inset?: boolean;
	variant?: "default" | "destructive";
}) {
	return (
		<MenuPrimitive.Item
			data-slot="menu-item"
			data-inset={inset}
			data-variant={variant}
			className={cn(
				"tg:flex tg:cursor-default tg:select-none tg:items-center tg:gap-2 tg:rounded-sm tg:px-2 tg:py-1 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-inset:ps-8 tg:data-[variant=destructive]:text-destructive-foreground tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			{...props}
		/>
	);
}

function MenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: MenuPrimitive.CheckboxItem.Props) {
	return (
		<MenuPrimitive.CheckboxItem
			data-slot="menu-checkbox-item"
			className={cn(
				"tg:grid tg:in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] tg:cursor-default tg:grid-cols-[1rem_1fr] tg:items-center tg:gap-2 tg:rounded-sm tg:py-1 tg:ps-2 tg:pe-4 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			checked={checked}
			{...props}
		>
			<MenuPrimitive.CheckboxItemIndicator className="tg:col-start-1">
				<CheckIcon />
			</MenuPrimitive.CheckboxItemIndicator>
			<span className="tg:col-start-2">{children}</span>
		</MenuPrimitive.CheckboxItem>
	);
}

function MenuRadioGroup(props: MenuPrimitive.RadioGroup.Props) {
	return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />;
}

function MenuRadioItem({
	className,
	children,
	...props
}: MenuPrimitive.RadioItem.Props) {
	return (
		<MenuPrimitive.RadioItem
			data-slot="menu-radio-item"
			className={cn(
				"tg:grid tg:in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] tg:cursor-default tg:grid-cols-[1rem_1fr] tg:items-center tg:gap-2 tg:rounded-sm tg:py-1 tg:ps-2 tg:pe-4 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
				className,
			)}
			{...props}
		>
			<MenuPrimitive.RadioItemIndicator className="tg:col-start-1">
				<CheckIcon />
			</MenuPrimitive.RadioItemIndicator>
			<span className="tg:col-start-2">{children}</span>
		</MenuPrimitive.RadioItem>
	);
}

function MenuGroupLabel({
	className,
	inset,
	...props
}: MenuPrimitive.GroupLabel.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.GroupLabel
			data-slot="menu-label"
			data-inset={inset}
			className={cn(
				"tg:px-2 tg:py-1.5 tg:font-medium tg:text-muted-foreground tg:text-xs tg:data-inset:ps-9 tg:sm:data-inset:ps-8",
				className,
			)}
			{...props}
		/>
	);
}

function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
	return (
		<MenuPrimitive.Separator
			data-slot="menu-separator"
			className={cn("tg:mx-2 tg:my-1 tg:h-px tg:bg-border", className)}
			{...props}
		/>
	);
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="menu-shortcut"
			className={cn(
				"tg:ms-auto tg:text-muted-foreground/64 tg:text-xs tg:tracking-widest",
				className,
			)}
			{...props}
		/>
	);
}

function MenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
	return <MenuPrimitive.SubmenuRoot data-slot="menu-sub" {...props} />;
}

function MenuSubTrigger({
	className,
	inset,
	children,
	...props
}: MenuPrimitive.SubmenuTrigger.Props & {
	inset?: boolean;
}) {
	return (
		<MenuPrimitive.SubmenuTrigger
			data-slot="menu-sub-trigger"
			data-inset={inset}
			className={cn(
				"tg:flex tg:items-center tg:gap-2 tg:rounded-sm tg:px-2 tg:py-1 tg:text-base tg:outline-none tg:data-disabled:pointer-events-none tg:data-highlighted:bg-accent tg:data-inset:ps-8 tg:data-highlighted:text-accent-foreground tg:data-disabled:opacity-64 tg:sm:text-sm tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRightIcon className="tg:ms-auto" />
		</MenuPrimitive.SubmenuTrigger>
	);
}

function MenuSubPopup({
	className,
	sideOffset = 0,
	alignOffset = -4,
	align = "start",
	...props
}: MenuPrimitive.Popup.Props & {
	align?: MenuPrimitive.Positioner.Props["align"];
	sideOffset?: MenuPrimitive.Positioner.Props["sideOffset"];
	alignOffset?: MenuPrimitive.Positioner.Props["alignOffset"];
}) {
	return (
		<MenuPopup
			className={className}
			sideOffset={sideOffset}
			align={align}
			alignOffset={alignOffset}
			data-slot="menu-sub-content"
			{...props}
		/>
	);
}

export {
	Menu as DropdownMenu,
	MenuCheckboxItem as DropdownMenuCheckboxItem,
	MenuPopup as DropdownMenuContent,
	MenuGroup as DropdownMenuGroup,
	MenuItem as DropdownMenuItem,
	MenuGroupLabel as DropdownMenuLabel,
	MenuPortal as DropdownMenuPortal,
	MenuRadioGroup as DropdownMenuRadioGroup,
	MenuRadioItem as DropdownMenuRadioItem,
	MenuSeparator as DropdownMenuSeparator,
	MenuShortcut as DropdownMenuShortcut,
	MenuSub as DropdownMenuSub,
	MenuSubPopup as DropdownMenuSubContent,
	MenuSubTrigger as DropdownMenuSubTrigger,
	MenuTrigger as DropdownMenuTrigger,
	Menu,
	MenuCheckboxItem,
	MenuGroup,
	MenuGroupLabel,
	MenuItem,
	MenuPopup,
	MenuPortal,
	MenuRadioGroup,
	MenuRadioItem,
	MenuSeparator,
	MenuShortcut,
	MenuSub,
	MenuSubPopup,
	MenuSubTrigger,
	MenuTrigger,
};
