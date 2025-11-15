"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";
import { Input } from "@/ui/components/input.js";

import type { ConfigInputProps } from "../input-registry.js";

export function NumberInput({ field, definition, error }: ConfigInputProps) {
	const value = field.value as number | undefined;

	return (
		<Field>
			<FieldLabel>{definition.label}</FieldLabel>
			<Input
				type="number"
				value={value !== undefined ? String(value) : ""}
				onChange={(e) => {
					const numValue =
						e.target.value === ""
							? undefined
							: Number(e.target.value);
					field.onChange(numValue);
				}}
				min={definition.validation?.min}
				max={definition.validation?.max}
				placeholder={(definition.default as string) || ""}
				aria-invalid={error ? "true" : undefined}
			/>
			{definition.description && (
				<FieldDescription>{definition.description}</FieldDescription>
			)}
			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
