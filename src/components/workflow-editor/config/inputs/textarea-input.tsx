"use client";

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";
import { Textarea } from "@/ui/components/textarea.js";

import type { ConfigInputProps } from "../input-registry.js";

export function TextareaInput({ field, definition, error }: ConfigInputProps) {
	return (
		<Field>
			<FieldLabel>{definition.label}</FieldLabel>
			<Textarea
				value={(field.value as string) || ""}
				onChange={(e) => field.onChange(e.target.value)}
				placeholder={(definition.default as string) || ""}
				rows={4}
				aria-invalid={error ? "true" : undefined}
			/>
			{definition.description && (
				<FieldDescription>{definition.description}</FieldDescription>
			)}
			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
