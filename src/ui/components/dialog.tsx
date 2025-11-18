"use client";

import { Dialog as DialogPrimitive } from "@base-ui-components/react/dialog";
import { XIcon } from "lucide-react";

import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const Dialog = DialogPrimitive.Root;

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
	const container = useTriglitRootContainer();
	return (
		<DialogPrimitive.Portal
			{...props}
			container={container || props.container}
		/>
	);
}

function DialogClose(props: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogBackdrop({
	className,
	...props
}: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-backdrop"
			className={cn(
				"tg:fixed tg:inset-0 tg:z-50 tg:bg-black/32 tg:backdrop-blur-sm tg:transition-all tg:duration-200 tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function DialogPopup({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
}) {
	return (
		<DialogPortal>
			<DialogBackdrop />
			<div className="tg:fixed tg:inset-0 tg:z-50">
				<div className="tg:flex tg:h-dvh tg:flex-col tg:items-center tg:overflow-hidden tg:pt-6 tg:max-sm:before:flex-1 tg:sm:overflow-y-auto tg:sm:p-4 tg:sm:after:flex-1 tg:sm:before:basis-[20vh]">
					<DialogPrimitive.Popup
						data-slot="dialog-popup"
						className={cn(
							"tg:sm:-translate-y-[calc(1.25rem*var(--nested-dialogs))] tg:relative tg:row-start-2 tg:grid tg:w-full tg:min-w-0 tg:origin-top tg:gap-4 tg:border tg:bg-popover tg:bg-clip-padding tg:p-6 tg:text-popover-foreground tg:shadow-lg tg:transition-[scale,opacity,translate] tg:duration-200 tg:ease-in-out tg:will-change-transform tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0 tg:max-sm:overflow-y-auto tg:max-sm:border-none tg:max-sm:opacity-[calc(1-min(var(--nested-dialogs),1))] tg:max-sm:data-ending-style:translate-y-4 tg:max-sm:data-starting-style:translate-y-4 tg:max-sm:before:hidden tg:sm:max-w-lg tg:sm:data-nested:data-ending-style:translate-y-8 tg:sm:data-nested:data-starting-style:translate-y-8 tg:sm:scale-[calc(1-0.1*var(--nested-dialogs))] tg:sm:rounded-2xl tg:sm:data-ending-style:scale-98 tg:sm:data-starting-style:scale-98 tg:sm:before:rounded-[calc(var(--radius-2xl)-1px)] tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
							className,
						)}
						{...props}
					>
						{children}
						{showCloseButton && (
							<DialogPrimitive.Close className="tg:absolute tg:end-2 tg:top-2 tg:inline-flex tg:size-7 tg:shrink-0 tg:cursor-pointer tg:items-center tg:justify-center tg:rounded-md tg:border tg:border-transparent tg:opacity-72 tg:outline-none tg:transition-[color,background-color,box-shadow,opacity] tg:pointer-coarse:after:absolute tg:pointer-coarse:after:size-full tg:pointer-coarse:after:min-h-11 tg:pointer-coarse:after:min-w-11 tg:hover:opacity-100 tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background tg:[&_svg:not([class*=size-])]:size-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0">
								<XIcon />
								<span className="tg:sr-only">Close</span>
							</DialogPrimitive.Close>
						)}
					</DialogPrimitive.Popup>
				</div>
			</div>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn(
				"tg:flex tg:flex-col tg:gap-1 tg:text-center tg:sm:text-left",
				className,
			)}
			{...props}
		/>
	);
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"tg:sm:-mx-6 tg:sm:-mb-6 tg:flex tg:flex-col-reverse tg:gap-2 tg:sm:mt-2 tg:sm:flex-row tg:sm:justify-end tg:sm:rounded-b-xl tg:sm:border-t tg:sm:bg-muted/50 tg:sm:px-6 tg:sm:py-4",
				className,
			)}
			{...props}
		/>
	);
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn(
				"tg:font-heading tg:text-xl tg:leading-none",
				className,
			)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn("tg:text-muted-foreground tg:text-sm", className)}
			{...props}
		/>
	);
}

export {
	Dialog,
	DialogBackdrop,
	DialogClose,
	DialogPopup as DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogBackdrop as DialogOverlay,
	DialogPopup,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
