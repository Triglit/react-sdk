"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";

import { cn } from "@/ui/lib/utils.js";

function ScrollArea({
	className,
	children,
	orientation,
	...props
}: ScrollAreaPrimitive.Root.Props & {
	orientation?: "horizontal" | "vertical" | "both";
}) {
	return (
		<ScrollAreaPrimitive.Root className="tg:min-h-0" {...props}>
			<ScrollAreaPrimitive.Viewport
				data-slot="scroll-area-viewport"
				className={cn(
					"tg:size-full tg:overscroll-contain tg:rounded-[inherit] tg:outline-none tg:transition-[box-shadow] tg:focus-visible:ring-2 tg:focus-visible:ring-ring tg:focus-visible:ring-offset-1 tg:focus-visible:ring-offset-background",
					className,
				)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			{orientation === "both" ? (
				<>
					<ScrollBar orientation="vertical" />
					<ScrollBar orientation="horizontal" />
				</>
			) : (
				<ScrollBar orientation={orientation} />
			)}
			<ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
		</ScrollAreaPrimitive.Root>
	);
}

function ScrollBar({
	className,
	orientation = "vertical",
	...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
	return (
		<ScrollAreaPrimitive.Scrollbar
			data-slot="scroll-area-scrollbar"
			orientation={orientation}
			className={cn(
				"tg:m-0.5 tg:flex tg:opacity-0 tg:transition-opacity tg:delay-300 tg:data-[orientation=horizontal]:h-1.5 tg:data-[orientation=vertical]:w-1.5 tg:data-[orientation=horizontal]:flex-col tg:data-hovering:opacity-100 tg:data-scrolling:opacity-100 tg:data-hovering:delay-0 tg:data-scrolling:delay-0 tg:data-hovering:duration-100 tg:data-scrolling:duration-100",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className="tg:relative tg:flex-1 tg:rounded-full tg:bg-foreground/20"
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);
}

export { ScrollArea, ScrollBar };
