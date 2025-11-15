"use client";

import { Slider as SliderPrimitive } from "@base-ui-components/react/slider";
import * as React from "react";

import { cn } from "@/ui/lib/utils.js";

function Slider({
	className,
	children,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props) {
	const _values = React.useMemo(() => {
		if (value !== undefined) {
			return Array.isArray(value) ? value : [value];
		}
		if (defaultValue !== undefined) {
			return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
		}
		return [min];
	}, [value, defaultValue, min]);

	return (
		<SliderPrimitive.Root
			thumbAlignment="edge"
			className="tg:data-[orientation=horizontal]:w-full"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			{...props}
		>
			{children}
			<SliderPrimitive.Control
				data-slot="slider-control"
				className={cn(
					"tg:flex tg:touch-none tg:select-none tg:data-[disabled]:pointer-events-none tg:data-[orientation=vertical]:h-full tg:data-[orientation=vertical]:min-h-44 tg:data-[orientation=horizontal]:w-full tg:data-[orientation=horizontal]:min-w-44 tg:data-[orientation=vertical]:flex-col tg:data-disabled:opacity-64",
					className,
				)}
			>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className="tg:relative tg:grow tg:select-none tg:before:absolute tg:before:rounded-full tg:before:bg-input tg:data-[orientation=horizontal]:h-1 tg:data-[orientation=vertical]:h-full tg:data-[orientation=horizontal]:w-full tg:data-[orientation=vertical]:w-1 tg:data-[orientation=horizontal]:before:inset-x-0.5 tg:data-[orientation=vertical]:before:inset-x-0 tg:data-[orientation=horizontal]:before:inset-y-0 tg:data-[orientation=vertical]:before:inset-y-0.5"
				>
					<SliderPrimitive.Indicator
						data-slot="slider-indicator"
						className="tg:select-none tg:rounded-full tg:bg-primary tg:data-[orientation=horizontal]:ms-0.5 tg:data-[orientation=vertical]:mb-0.5"
					/>
					{Array.from({ length: _values.length }, (_, index) => (
						<SliderPrimitive.Thumb
							data-slot="slider-thumb"
							key={`slider-thumb-${index.toString()}`}
							className="tg:block tg:size-4 tg:shrink-0 tg:select-none tg:rounded-full tg:border tg:border-input tg:bg-white tg:bg-clip-padding tg:shadow-xs tg:outline-none tg:transition-shadow tg:before:absolute tg:before:inset-0 tg:before:rounded-full tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:focus-visible:ring-[3px] tg:focus-visible:ring-ring/24 tg:has-focus-visible:ring-[3px] tg:has-focus-visible:ring-ring/24 tg:data-dragging:ring-[3px] tg:data-dragging:ring-ring/24 tg:dark:border-background tg:dark:bg-clip-border tg:dark:data-dragging:ring-ring/48 tg:dark:focus-visible:ring-ring/48 tg:[&:is(:focus-visible,[data-dragging])]:shadow-none"
						/>
					))}
				</SliderPrimitive.Track>
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
	return (
		<SliderPrimitive.Value
			data-slot="slider-value"
			className={cn("tg:flex tg:justify-end tg:text-sm", className)}
			{...props}
		/>
	);
}

export { Slider, SliderValue };
