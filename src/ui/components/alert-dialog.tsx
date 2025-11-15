"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui-components/react/alert-dialog";

import { cn } from "@/ui/lib/utils.js";

function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
	return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger(props: AlertDialogPrimitive.Trigger.Props) {
	return (
		<AlertDialogPrimitive.Trigger
			data-slot="alert-dialog-trigger"
			{...props}
		/>
	);
}

function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
	return <AlertDialogPrimitive.Portal {...props} />;
}

function AlertDialogBackdrop({
	className,
	...props
}: AlertDialogPrimitive.Backdrop.Props) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-slot="alert-dialog-backdrop"
			className={cn(
				"tg:fixed tg:inset-0 tg:z-50 tg:bg-black/32 tg:backdrop-blur-sm tg:transition-all tg:duration-200 tg:ease-out tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogPopup({
	className,
	...props
}: AlertDialogPrimitive.Popup.Props) {
	return (
		<AlertDialogPortal>
			<AlertDialogBackdrop />
			<div className="tg:fixed tg:inset-0 tg:z-50">
				<div className="tg:flex tg:h-dvh tg:flex-col tg:items-center tg:overflow-hidden tg:pt-6 tg:max-sm:before:flex-1 tg:sm:overflow-y-auto tg:sm:p-4 tg:sm:after:flex-1 tg:sm:before:basis-[20vh]">
					<AlertDialogPrimitive.Popup
						data-slot="alert-dialog-popup"
						className={cn(
							"tg:sm:-translate-y-[calc(1.25rem*var(--nested-dialogs))] tg:row-start-2 tg:grid tg:w-full tg:min-w-0 tg:origin-top tg:gap-4 tg:border tg:bg-popover tg:bg-clip-padding tg:p-6 tg:text-popover-foreground tg:shadow-lg tg:transition-[scale,opacity,translate] tg:duration-200 tg:ease-in-out tg:will-change-transform tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0 tg:max-sm:overflow-y-auto tg:max-sm:border-none tg:max-sm:opacity-[calc(1-min(var(--nested-dialogs),1))] tg:max-sm:data-ending-style:translate-y-4 tg:max-sm:data-starting-style:translate-y-4 tg:sm:max-w-lg tg:sm:scale-[calc(1-0.1*var(--nested-dialogs))] tg:sm:rounded-2xl tg:sm:data-ending-style:scale-98 tg:sm:data-starting-style:scale-98 tg:dark:bg-clip-border",
							"tg:relative tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:max-sm:before:hidden tg:sm:data-nested:data-ending-style:translate-y-8 tg:sm:data-nested:data-starting-style:translate-y-8 tg:sm:before:rounded-[calc(var(--radius-2xl)-1px)] tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
							className,
						)}
						{...props}
					/>
				</div>
			</div>
		</AlertDialogPortal>
	);
}

function AlertDialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn(
				"tg:flex tg:flex-col tg:gap-2 tg:text-center tg:sm:text-left",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-footer"
			className={cn(
				"tg:flex tg:flex-col-reverse tg:gap-2 tg:sm:flex-row tg:sm:justify-end",
				className,
			)}
			{...props}
		/>
	);
}

function AlertDialogTitle({
	className,
	...props
}: AlertDialogPrimitive.Title.Props) {
	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={cn("tg:font-semibold tg:text-lg", className)}
			{...props}
		/>
	);
}

function AlertDialogDescription({
	className,
	...props
}: AlertDialogPrimitive.Description.Props) {
	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={cn("tg:text-muted-foreground tg:text-sm", className)}
			{...props}
		/>
	);
}

function AlertDialogClose(props: AlertDialogPrimitive.Close.Props) {
	return (
		<AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
	);
}

export {
	AlertDialog,
	AlertDialogBackdrop,
	AlertDialogClose,
	AlertDialogPopup as AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogBackdrop as AlertDialogOverlay,
	AlertDialogPopup,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
