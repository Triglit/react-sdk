"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";
import { Switch } from "@/ui/components/switch.js";

import type { ConfigInputProps } from "../input-registry.js";

export function BooleanInput({ field, definition, error }: ConfigInputProps) {
	return (
		<Field>
			<div className="tg:flex tg:w-full tg:items-center tg:justify-between">
				<div className="tg:flex tg:flex-col tg:gap-1">
					<FieldLabel>{definition.label}</FieldLabel>
					{definition.description && (
						<FieldDescription>
							{definition.description}
						</FieldDescription>
					)}
				</div>
				<Switch
					checked={(field.value as boolean) || false}
					onCheckedChange={(checked) => field.onChange(checked)}
					aria-invalid={error ? "true" : undefined}
				/>
			</div>
			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
