import { Loader2Icon } from "lucide-react";

import { cn } from "@/ui/lib/utils.js";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<Loader2Icon
			role="status"
			aria-label="Loading"
			className={cn("tg:size-4 tg:animate-spin", className)}
			{...props}
		/>
	);
}

export { Spinner };
