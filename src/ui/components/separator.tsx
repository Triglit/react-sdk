import { Separator as SeparatorPrimitive } from "@base-ui-components/react/separator";

import { cn } from "@/ui/lib/utils.js";

function Separator({
	className,
	orientation = "horizontal",
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(
				"tg:shrink-0 tg:bg-border tg:data-[orientation=horizontal]:h-px tg:data-[orientation=horizontal]:w-full tg:data-[orientation=vertical]:w-px tg:data-[orientation=vertical]:not-[[class^=h-]]:not-[[class*=_h-]]:self-stretch",
				className,
			)}
			{...props}
		/>
	);
}

export { Separator };
