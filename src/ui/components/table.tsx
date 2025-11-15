import type * as React from "react";

import { cn } from "@/ui/lib/utils.js";

function Table({ className, ...props }: React.ComponentProps<"table">) {
	return (
		<div
			data-slot="table-container"
			className="tg:relative tg:w-full tg:overflow-x-auto"
		>
			<table
				data-slot="table"
				className={cn(
					"tg:w-full tg:caption-bottom tg:in-data-[slot=frame]:border-separate tg:in-data-[slot=frame]:border-spacing-0 tg:text-sm",
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
	return (
		<thead
			data-slot="table-header"
			className={cn(
				"tg:[&_tr]:border-b tg:in-data-[slot=frame]:**:[th]:h-9 tg:in-data-[slot=frame]:*:[tr]:border-none tg:in-data-[slot=frame]:*:[tr]:hover:bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
	return (
		<tbody
			data-slot="table-body"
			className={cn(
				"tg:relative tg:in-data-[slot=frame]:rounded-xl tg:in-data-[slot=frame]:shadow-xs tg:before:pointer-events-none tg:before:absolute tg:before:inset-px tg:not-in-data-[slot=frame]:before:hidden tg:before:rounded-[calc(var(--radius-xl)-1px)] tg:before:shadow-[0_1px_--theme(--color-black/4%)] tg:dark:bg-clip-border tg:dark:before:shadow-[0_-1px_--theme(--color-white/8%)] tg:[&_tr:last-child]:border-0 tg:in-data-[slot=frame]:*:[tr]:border-0 tg:in-data-[slot=frame]:*:[tr]:*:[td]:border-b tg:in-data-[slot=frame]:*:[tr]:*:[td]:bg-card tg:in-data-[slot=frame]:*:[tr]:*:[td]:bg-clip-padding tg:in-data-[slot=frame]:*:[tr]:first:*:[td]:first:rounded-ss-xl tg:in-data-[slot=frame]:*:[tr]:*:[td]:first:border-s tg:in-data-[slot=frame]:*:[tr]:first:*:[td]:border-t tg:in-data-[slot=frame]:*:[tr]:last:*:[td]:last:rounded-ee-xl tg:in-data-[slot=frame]:*:[tr]:*:[td]:last:border-e tg:in-data-[slot=frame]:*:[tr]:first:*:[td]:last:rounded-se-xl tg:in-data-[slot=frame]:*:[tr]:last:*:[td]:first:rounded-es-xl tg:in-data-[slot=frame]:*:[tr]:hover:*:[td]:bg-muted/32",
				className,
			)}
			{...props}
		/>
	);
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(
				"tg:border-t tg:in-data-[slot=frame]:border-none tg:bg-muted/72 tg:in-data-[slot=frame]:bg-transparent tg:font-medium tg:[&>tr]:last:border-b-0 tg:in-data-[slot=frame]:*:[tr]:hover:bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
	return (
		<tr
			data-slot="table-row"
			className={cn(
				"tg:border-b tg:transition-colors tg:hover:bg-muted tg:in-data-[slot=frame]:hover:bg-transparent tg:data-[state=selected]:bg-muted tg:in-data-[slot=frame]:data-[state=selected]:bg-transparent",
				className,
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
	return (
		<th
			data-slot="table-head"
			className={cn(
				"tg:h-10 tg:whitespace-nowrap tg:px-2 tg:text-left tg:align-middle tg:font-medium tg:text-foreground tg:has-[[role=checkbox]]:pe-0 tg:[&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
	return (
		<td
			data-slot="table-cell"
			className={cn(
				"tg:whitespace-nowrap tg:p-2 tg:align-middle tg:has-[[role=checkbox]]:pe-0 tg:[&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
}

function TableCaption({
	className,
	...props
}: React.ComponentProps<"caption">) {
	return (
		<caption
			data-slot="table-caption"
			className={cn(
				"tg:in-data-[slot=frame]:my-4 tg:mt-4 tg:text-muted-foreground tg:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
