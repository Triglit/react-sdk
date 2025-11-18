"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui-components/react/preview-card";

import { useTriglitRootContainer } from "@/ui/lib/portal-container.js";
import { cn } from "@/ui/lib/utils.js";

const PreviewCard = PreviewCardPrimitive.Root;

function PreviewCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
	return (
		<PreviewCardPrimitive.Trigger
			data-slot="preview-card-trigger"
			{...props}
		/>
	);
}

function PreviewCardPopup({
	className,
	children,
	align = "center",
	sideOffset = 4,
	...props
}: PreviewCardPrimitive.Popup.Props & {
	align?: PreviewCardPrimitive.Positioner.Props["align"];
	sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
}) {
	const container = useTriglitRootContainer();
	return (
		<PreviewCardPrimitive.Portal container={container || undefined}>
			<PreviewCardPrimitive.Positioner
				data-slot="preview-card-positioner"
				className="tg:z-50"
				sideOffset={sideOffset}
				align={align}
			>
				<PreviewCardPrimitive.Popup
					data-slot="preview-card-content"
					className={cn(
						"tg:relative tg:flex tg:w-64 tg:origin-(--transform-origin) tg:text-balance tg:rounded-lg tg:border tg:bg-popover tg:bg-clip-padding tg:p-4 tg:text-popover-foreground tg:text-sm tg:shadow-lg tg:transition-[scale,opacity] tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-lg)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:data-ending-style:scale-98 tg:data-starting-style:scale-98 tg:data-ending-style:opacity-0 tg:data-starting-style:opacity-0 tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
						className,
					)}
					{...props}
				>
					{children}
				</PreviewCardPrimitive.Popup>
			</PreviewCardPrimitive.Positioner>
		</PreviewCardPrimitive.Portal>
	);
}

export {
	PreviewCard as HoverCard,
	PreviewCardPopup as HoverCardContent,
	PreviewCardTrigger as HoverCardTrigger,
	PreviewCard,
	PreviewCardPopup,
	PreviewCardTrigger,
};
