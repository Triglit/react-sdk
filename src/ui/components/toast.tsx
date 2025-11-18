"use client";

import { Toast } from "@base-ui-components/react/toast";
import {
	CircleAlertIcon,
	CircleCheckIcon,
	InfoIcon,
	LoaderCircleIcon,
	TriangleAlertIcon,
} from "lucide-react";

import { buttonVariants } from "@/ui/components/button.js";
import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const toastManager = Toast.createToastManager();

const TOAST_ICONS = {
	loading: LoaderCircleIcon,
	success: CircleCheckIcon,
	error: CircleAlertIcon,
	info: InfoIcon,
	warning: TriangleAlertIcon,
} as const;

type ToastPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

interface ToastProviderProps extends Toast.Provider.Props {
	position?: ToastPosition;
}

function ToastProvider({
	children,
	position = "bottom-right",
	...props
}: ToastProviderProps) {
	return (
		<Toast.Provider toastManager={toastManager} {...props}>
			{children}
			<ToastList position={position} />
		</Toast.Provider>
	);
}

function ToastList({ position = "bottom-right" }: { position: ToastPosition }) {
	const { toasts } = Toast.useToastManager();
	const isTop = position.startsWith("top");
	const container = useTriglitRootContainer();

	return (
		<Toast.Portal
			data-slot="toast-portal"
			container={container || undefined}
		>
			<Toast.Viewport
				className={cn(
					"tg:fixed tg:z-50 tg:mx-auto tg:flex tg:w-[calc(100%-var(--toast-inset)*2)] tg:max-w-90 tg:[--toast-inset:--spacing(4)] tg:sm:[--toast-inset:--spacing(8)]",
					// Vertical positioning
					"tg:data-[position*=top]:top-(--toast-inset)",
					"tg:data-[position*=bottom]:bottom-(--toast-inset)",
					// Horizontal positioning
					"tg:data-[position*=left]:left-(--toast-inset)",
					"tg:data-[position*=right]:right-(--toast-inset)",
					"tg:data-[position*=center]:-translate-x-1/2 tg:data-[position*=center]:left-1/2",
				)}
				data-slot="toast-viewport"
				data-position={position}
			>
				{toasts.map((toast) => {
					const Icon = toast.type
						? TOAST_ICONS[toast.type as keyof typeof TOAST_ICONS]
						: null;

					return (
						<Toast.Root
							key={toast.id}
							toast={toast}
							data-position={position}
							swipeDirection={
								position.includes("center")
									? [isTop ? "up" : "down"]
									: position.includes("left")
										? ["left", isTop ? "up" : "down"]
										: ["right", isTop ? "up" : "down"]
							}
							className={cn(
								"tg:absolute tg:z-[calc(9999-var(--toast-index))] tg:h-(--toast-calc-height) tg:w-full tg:select-none tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:px-3.5 tg:py-3 tg:text-popover-foreground tg:shadow-lg tg:[transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
								// Base positioning using data-position
								"tg:data-[position*=right]:right-0 tg:data-[position*=right]:left-auto",
								"tg:data-[position*=left]:right-auto tg:data-[position*=left]:left-0",
								"tg:data-[position*=center]:right-0 tg:data-[position*=center]:left-0",
								"tg:data-[position*=top]:top-0 tg:data-[position*=top]:bottom-auto tg:data-[position*=top]:origin-top",
								"tg:data-[position*=bottom]:top-auto tg:data-[position*=bottom]:bottom-0 tg:data-[position*=bottom]:origin-bottom",
								// Gap fill for hover
								"tg:after:absolute tg:after:left-0 tg:after:h-[calc(var(--toast-gap)+1px)] tg:after:w-full",
								"tg:data-[position*=top]:after:top-full",
								"tg:data-[position*=bottom]:after:bottom-full",
								// Define some variables
								"tg:[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] tg:[--toast-gap:--spacing(3)] tg:[--toast-peek:--spacing(3)] tg:[--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] tg:[--toast-shrink:calc(1-var(--toast-scale))]",
								// Define offset-y variable
								"tg:data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]",
								"tg:data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]",
								// Default state transform
								"tg:data-[position*=top]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
								"tg:data-[position*=bottom]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]",
								// Limited state
								"tg:data-limited:opacity-0",
								// Expanded state
								"tg:data-expanded:h-(--toast-height)",
								"tg:data-[position]:data-expanded:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]",
								// Starting and ending animations
								"tg:data-[position*=top]:data-starting-style:[transform:translateY(calc(-100%-var(--toast-inset)))]",
								"tg:data-[position*=bottom]:data-starting-style:[transform:translateY(calc(100%+var(--toast-inset)))]",
								"tg:data-ending-style:opacity-0",
								// Ending animations (direction-aware)
								"tg:data-ending-style:not-data-limited:not-data-swipe-direction:[transform:translateY(calc(100%+var(--toast-inset)))]",
								"tg:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
								"tg:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
								"tg:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
								"tg:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
								// Ending animations (expanded)
								"tg:data-expanded:data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
								"tg:data-expanded:data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]",
								"tg:data-expanded:data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]",
								"tg:data-expanded:data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]",
							)}
						>
							<Toast.Content className="tg:flex tg:items-center tg:justify-between tg:gap-1.5 tg:overflow-hidden tg:text-sm tg:transition-opacity tg:duration-250 tg:data-behind:pointer-events-none tg:data-expanded:pointer-events-auto tg:data-behind:opacity-0 tg:data-expanded:opacity-100">
								<div className="tg:flex tg:gap-2">
									{Icon && (
										<div
											className="tg:mt-.5 tg:[&>svg]:h-[1lh] tg:[&>svg]:w-4 tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0"
											data-slot="toast-icon"
										>
											<Icon className="tg:in-data-[type=loading]:animate-spin tg:in-data-[type=error]:text-destructive tg:in-data-[type=info]:text-info tg:in-data-[type=success]:text-success tg:in-data-[type=warning]:text-warning tg:in-data-[type=loading]:opacity-72" />
										</div>
									)}

									<div className="tg:flex tg:flex-col tg:gap-0.5">
										<Toast.Title
											className="tg:font-medium"
											data-slot="toast-title"
										/>
										<Toast.Description
											className="tg:text-muted-foreground"
											data-slot="toast-description"
										/>
									</div>
								</div>
								{toast.actionProps && (
									<Toast.Action
										className={buttonVariants({
											size: "xs",
										})}
										data-slot="toast-action"
									>
										{toast.actionProps.children}
									</Toast.Action>
								)}
							</Toast.Content>
						</Toast.Root>
					);
				})}
			</Toast.Viewport>
		</Toast.Portal>
	);
}

export { ToastProvider, toastManager, type ToastPosition };
