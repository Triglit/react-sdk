"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";
import { Input } from "@/ui/components/input.js";

import type { ConfigInputProps } from "../input-registry.js";

export function TextInput({ field, definition, error }: ConfigInputProps) {
	return (
		<Field>
			<FieldLabel>{definition.label}</FieldLabel>
			<Input
				type="text"
				value={(field.value as string) || ""}
				onChange={(e) => field.onChange(e.target.value)}
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
