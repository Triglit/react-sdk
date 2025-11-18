"use client";

import { Dialog as SheetPrimitive } from "@base-ui-components/react/dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const Sheet = SheetPrimitive.Root;

function SheetTrigger(props: SheetPrimitive.Trigger.Props) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetPortal(props: SheetPrimitive.Portal.Props) {
	const container = useTriglitRootContainer();
	return (
		<SheetPrimitive.Portal
			{...props}
			container={container || props.container}
		/>
	);
}

function SheetClose(props: SheetPrimitive.Close.Props) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

const sheetPopupVariants = cva(
	"tg:fixed tg:z-50 tg:flex tg:flex-col tg:gap-4 tg:overflow-y-auto tg:bg-popover tg:text-popover-foreground tg:shadow-lg tg:transition-[opacity,translate] tg:duration-300 tg:ease-in-out tg:will-change-transform tg:[--sheet-inset:0px] tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0",
	{
		variants: {
			inset: {
				true: "tg:sm:rounded-xl tg:sm:[--sheet-inset:1rem]",
			},
			side: {
				right: "tg:inset-y-[var(--sheet-inset)] tg:right-[var(--sheet-inset)] tg:h-dvh tg:w-[calc(100%-(--spacing(12)))] tg:max-w-sm tg:data-ending-style:translate-x-12 tg:data-starting-style:translate-x-12 tg:sm:h-[calc(100dvh-var(--sheet-inset)*2)]",
				left: "tg:inset-y-[var(--sheet-inset)] tg:left-[var(--sheet-inset)] tg:h-dvh tg:w-[calc(100%-(--spacing(12)))] tg:max-w-sm tg:data-ending-style:-translate-x-12 tg:data-starting-style:-translate-x-12 tg:sm:h-[calc(100dvh-var(--sheet-inset)*2)]",
				top: "tg:inset-x-[var(--sheet-inset)] tg:top-[var(--sheet-inset)] tg:h-auto tg:max-h-[calc(100dvh-var(--sheet-inset)*2)] tg:data-ending-style:-translate-y-12 tg:data-starting-style:-translate-y-12",
				bottom: "tg:inset-x-[var(--sheet-inset)] tg:bottom-[var(--sheet-inset)] tg:h-auto tg:max-h-[calc(100dvh-var(--sheet-inset)*2)] tg:data-ending-style:translate-y-12 tg:data-starting-style:translate-y-12",
			},
		},
		defaultVariants: {
			inset: false,
			side: "right",
		},
	},
);

function SheetBackdrop({ className, ...props }: SheetPrimitive.Backdrop.Props) {
	return (
		<SheetPrimitive.Backdrop
			data-slot="sheet-backdrop"
			className={cn(
				"tg:fixed tg:inset-0 tg:z-50 tg:bg-black/32 tg:backdrop-blur-sm tg:transition-all tg:duration-200 tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function SheetPopup({
	className,
	children,
	showCloseButton = true,
	side = "right",
	inset = false,
	...props
}: SheetPrimitive.Popup.Props & {
	showCloseButton?: boolean;
} & VariantProps<typeof sheetPopupVariants>) {
	return (
		<SheetPortal>
			<SheetBackdrop />
			<SheetPrimitive.Popup
				data-slot="sheet-popup"
				className={cn(sheetPopupVariants({ inset, side }), className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<SheetPrimitive.Close className="tg:absolute tg:end-2 tg:top-2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-[color,background-color,box-shadow,opacity] tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0">
						<XIcon />
						<span className="tg:sr-only">Close</span>
					</SheetPrimitive.Close>
				)}
			</SheetPrimitive.Popup>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("tg:flex tg:flex-col tg:gap-1.5 tg:p-4", className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn(
				"tg:mt-auto tg:flex tg:flex-col tg:gap-2 tg:p-4",
				className,
			)}
			{...props}
		/>
	);
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn("tg:font-semibold", className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: SheetPrimitive.Description.Props) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn("tg:text-muted-foreground tg:text-sm", className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetBackdrop,
	SheetClose,
	SheetPopup as SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetBackdrop as SheetOverlay,
	SheetPopup,
	sheetPopupVariants,
	SheetPortal,
	SheetTitle,
	SheetTrigger,
};
