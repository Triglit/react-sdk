import { cn } from "@/ui/lib/utils.js";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn(
				"tg:animate-skeleton tg:rounded-sm tg:[--skeleton-highlight:--alpha(var(--color-white)/64%)] tg:[background:linear-gradient(120deg,transparent_40%,var(--skeleton-highlight),transparent_60%)_var(--color-muted)_0_0_/_200%_100%_fixed] tg:dark:[--skeleton-highlight:--alpha(var(--color-white)/4%)]",
				className,
			)}
			{...props}
		/>
	);
}

export { Skeleton };
