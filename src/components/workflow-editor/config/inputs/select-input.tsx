"use client";

import * as React from "react";

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
import { TextInput } from "./text-input.js";

export function SelectInput({
	field,
	definition,
	error,
	dynamicEnumOptions,
	nodeType,
}: ConfigInputProps) {
	const isDynamic = definition.dynamic === true;

	// If dynamic, try to get options from callback
	const dynamicOptions = React.useMemo(() => {
		if (isDynamic && dynamicEnumOptions && nodeType) {
			return dynamicEnumOptions(field.name, nodeType);
		}
		return undefined;
	}, [isDynamic, dynamicEnumOptions, nodeType, field.name]);

	// Use dynamic options if available, otherwise use static options
	const options =
		isDynamic && dynamicOptions
			? dynamicOptions.map((opt) => opt.value)
			: ((definition.options || []) as string[]);

	// For dynamic options, create a map for labels
	const optionLabels = React.useMemo(() => {
		if (isDynamic && dynamicOptions) {
			const map = new Map<string, string>();
			for (const opt of dynamicOptions) {
				map.set(opt.value, opt.label);
			}
			return map;
		}
		return null;
	}, [isDynamic, dynamicOptions]);

	const value = (field.value as string) || "";

	// If dynamic and no options provided, render as text input
	if (isDynamic && (!dynamicOptions || dynamicOptions.length === 0)) {
		return (
			<TextInput field={field} definition={definition} error={error} />
		);
	}

	return (
		<Field>
			<FieldLabel>{definition.label}</FieldLabel>
			<Select
				value={value}
				onValueChange={(newValue) => field.onChange(newValue)}
				items={
					dynamicOptions
						? dynamicOptions
						: options.map((o) => ({
								label: o,
								value: o,
							}))
				}
			>
				<SelectTrigger aria-invalid={error ? "true" : undefined}>
					<SelectValue />
				</SelectTrigger>
				<SelectPopup>
					{options.map((option) => (
						<SelectItem key={option} value={option}>
							{optionLabels?.get(option) || option}
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
