"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";
import {
	Select,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from "@/ui/components/select.js";

import type { ConfigInputProps } from "../input-registry.js";

export function SelectInput({ field, definition, error }: ConfigInputProps) {
	const options = (definition.options || []) as string[];
	const value = (field.value as string) || "";

	return (
		<Field>
			<FieldLabel>{definition.label}</FieldLabel>
			<Select
				value={value}
				onValueChange={(newValue) => field.onChange(newValue)}
			>
				<SelectTrigger aria-invalid={error ? "true" : undefined}>
					<SelectValue />
				</SelectTrigger>
				<SelectPopup>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectPopup>
			</Select>
			{definition.description && (
				<FieldDescription>{definition.description}</FieldDescription>
			)}
			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
