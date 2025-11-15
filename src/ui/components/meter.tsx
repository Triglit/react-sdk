"use client";

import { Meter as MeterPrimitive } from "@base-ui-components/react/meter";

import { cn } from "@/ui/lib/utils.js";

function Meter({ className, children, ...props }: MeterPrimitive.Root.Props) {
	return (
		<MeterPrimitive.Root
			className={cn("tg:flex tg:w-full tg:flex-col tg:gap-2", className)}
			{...props}
		>
			{children ? (
				children
			) : (
				<MeterTrack>
					<MeterIndicator />
				</MeterTrack>
			)}
		</MeterPrimitive.Root>
	);
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
	return (
		<MeterPrimitive.Label
			data-slot="meter-label"
			className={cn("tg:font-medium tg:text-sm", className)}
			{...props}
		/>
	);
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
	return (
		<MeterPrimitive.Track
			data-slot="meter-track"
			className={cn(
				"tg:block tg:h-2 tg:w-full tg:overflow-hidden tg:bg-input",
				className,
			)}
			{...props}
		/>
	);
}

function MeterIndicator({
	className,
	...props
}: MeterPrimitive.Indicator.Props) {
	return (
		<MeterPrimitive.Indicator
			data-slot="meter-indicator"
			className={cn(
				"tg:bg-primary tg:transition-all tg:duration-500",
				className,
			)}
			{...props}
		/>
	);
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
	return (
		<MeterPrimitive.Value
			data-slot="meter-value"
			className={cn("tg:text-sm tg:tabular-nums", className)}
			{...props}
		/>
	);
}

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue };
