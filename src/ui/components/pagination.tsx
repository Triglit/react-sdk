import { mergeProps } from "@base-ui-components/react/merge-props";
import { useRender } from "@base-ui-components/react/use-render";
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import type * as React from "react";

import { type Button, buttonVariants } from "@/ui/components/button.js";
import { cn } from "@/ui/lib/utils.js";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
	return (
		<nav
			aria-label="pagination"
			data-slot="pagination"
			className={cn(
				"tg:mx-auto tg:flex tg:w-full tg:justify-center",
				className,
			)}
			{...props}
		/>
	);
}

function PaginationContent({
	className,
	...props
}: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="pagination-content"
			className={cn(
				"tg:flex tg:flex-row tg:items-center tg:gap-1",
				className,
			)}
			{...props}
		/>
	);
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
	return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
	isActive?: boolean;
	size?: React.ComponentProps<typeof Button>["size"];
} & useRender.ComponentProps<"a">;

function PaginationLink({
	className,
	isActive,
	size = "icon",
	render,
	...props
}: PaginationLinkProps) {
	const defaultProps = {
		"aria-current": isActive ? ("page" as const) : undefined,
		"data-slot": "pagination-link",
		"data-active": isActive,
		className: render
			? className
			: cn(
					buttonVariants({
						variant: isActive ? "outline" : "ghost",
						size,
					}),
					className,
				),
	};

	return useRender({
		defaultTagName: "a",
		render,
		props: mergeProps<"a">(defaultProps, props),
	});
}

function PaginationPrevious({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to previous page"
			size="default"
			className={cn("tg:max-sm:aspect-square tg:max-sm:p-0", className)}
			{...props}
		>
			<ChevronLeftIcon className="tg:sm:-ms-1" />
			<span className="tg:max-sm:hidden">Previous</span>
		</PaginationLink>
	);
}

function PaginationNext({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) {
	return (
		<PaginationLink
			aria-label="Go to next page"
			size="default"
			className={cn("tg:max-sm:aspect-square tg:max-sm:p-0", className)}
			{...props}
		>
			<span className="tg:max-sm:hidden">Next</span>
			<ChevronRightIcon className="tg:sm:-me-1" />
		</PaginationLink>
	);
}

function PaginationEllipsis({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden
			data-slot="pagination-ellipsis"
			className={cn("tg:flex tg:min-w-7 tg:justify-center", className)}
			{...props}
		>
			<MoreHorizontalIcon className="tg:size-4" />
			<span className="tg:sr-only">More pages</span>
		</span>
	);
}

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
