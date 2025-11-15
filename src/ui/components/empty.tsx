import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/ui/lib/utils.js";

function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty"
			className={cn(
				"tg:flex tg:min-w-0 tg:flex-1 tg:flex-col tg:items-center tg:justify-center tg:gap-6 tg:text-balance tg:rounded-xl tg:border-dashed tg:p-6 tg:text-center tg:md:p-12",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-header"
			className={cn(
				"tg:flex tg:max-w-sm tg:flex-col tg:items-center tg:text-center",
				className,
			)}
			{...props}
		/>
	);
}

const emptyMediaVariants = cva(
	"tg:flex tg:shrink-0 tg:items-center tg:justify-center tg:[&_svg]:pointer-events-none tg:[&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "tg:bg-transparent",
				icon: "tg:relative tg:flex tg:size-9 tg:shrink-0 tg:items-center tg:justify-center tg:rounded-md tg:border tg:bg-card tg:text-foreground tg:shadow-sm tg:shadow-black/5 tg:before:pointer-events-none tg:before:absolute tg:before:inset-0 tg:before:rounded-[calc(var(--radius-md)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&_svg:not([class*=size-])]:size-4.5",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

function EmptyMedia({
	className,
	variant = "default",
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
	return (
		<div
			data-slot="empty-media"
			data-variant={variant}
			className={cn("tg:relative tg:mb-6", className)}
			{...props}
		>
			{variant === "icon" && (
				<>
					<div
						className={cn(
							emptyMediaVariants({ variant, className }),
							"tg:-translate-x-0.5 tg:-rotate-10 tg:pointer-events-none tg:absolute tg:bottom-px tg:origin-bottom-left tg:scale-84 tg:shadow-none",
						)}
						aria-hidden="true"
					/>
					<div
						className={cn(
							emptyMediaVariants({ variant, className }),
							"tg:pointer-events-none tg:absolute tg:bottom-px tg:origin-bottom-right tg:translate-x-0.5 tg:rotate-10 tg:scale-84 tg:shadow-none",
						)}
						aria-hidden="true"
					/>
				</>
			)}
			<div
				className={cn(emptyMediaVariants({ variant, className }))}
				{...props}
			/>
		</div>
	);
}

function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-title"
			className={cn(
				"tg:font-heading tg:text-xl tg:leading-none",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<div
			data-slot="empty-description"
			className={cn(
				"tg:text-muted-foreground tg:text-sm/relaxed tg:[&>a:hover]:text-primary tg:[&>a]:underline tg:[&>a]:underline-offset-4 tg:[[data-slot=empty-title]+&]:mt-1",
				className,
			)}
			{...props}
		/>
	);
}

function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="empty-content"
			className={cn(
				"tg:flex tg:w-full tg:min-w-0 tg:max-w-sm tg:flex-col tg:items-center tg:gap-4 tg:text-balance tg:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
};
