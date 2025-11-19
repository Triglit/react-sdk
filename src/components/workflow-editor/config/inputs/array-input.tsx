"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/ui/components/button.js";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";

import type { ConfigInputProps } from "../input-registry.js";
import { configInputRegistry } from "./index.js";

/**
 * Array Input Component
 * Allows adding/removing items dynamically in arrays
 * Supports full recursion for arrays of complex objects
 */
export function ArrayInput({ field, definition, error }: ConfigInputProps) {
	const [items, setItems] = React.useState<unknown[]>(() => {
		// Initialize with existing value or empty array
		if (Array.isArray(field.value)) {
			return field.value;
		}
		return [];
	});

	// Sync with external changes
	React.useEffect(() => {
		if (Array.isArray(field.value)) {
			setItems(field.value);
		}
	}, [field.value]);

	// If no items definition, can't add items
	if (!definition.items) {
		return (
			<Field>
				<FieldLabel>
					{definition.label}
					{definition.required && (
						<span className="tg:ml-1 tg:text-red-500">*</span>
					)}
				</FieldLabel>
				{definition.description && (
					<FieldDescription>
						{definition.description}
					</FieldDescription>
				)}
				<div className="tg:rounded-lg tg:border tg:border-neutral-700 tg:bg-neutral-800/50 tg:p-4">
					<p className="tg:text-neutral-400 tg:text-sm">
						Array without item definition
					</p>
				</div>
				{error && <FieldError>{error}</FieldError>}
			</Field>
		);
	}

	const itemDefinition = definition.items;
	const InputComponent = configInputRegistry.get(itemDefinition.type);

	if (!InputComponent) {
		return (
			<Field>
				<FieldLabel>
					{definition.label}
					{definition.required && (
						<span className="tg:ml-1 tg:text-red-500">*</span>
					)}
				</FieldLabel>
				{definition.description && (
					<FieldDescription>
						{definition.description}
					</FieldDescription>
				)}
				<div className="tg:rounded-lg tg:border tg:border-yellow-700 tg:bg-yellow-900/20 tg:p-3">
					<p className="tg:text-sm tg:text-yellow-500">
						Unsupported item type:{" "}
						<span className="tg:font-mono">
							{itemDefinition.type}
						</span>
					</p>
				</div>
				{error && <FieldError>{error}</FieldError>}
			</Field>
		);
	}

	// Function to create default value based on type
	const createDefaultValue = (): unknown => {
		switch (itemDefinition.type) {
			case "string":
			case "text":
			case "textarea":
				return "";
			case "number":
			case "integer":
				return 0;
			case "boolean":
				return false;
			case "object":
				return {};
			case "array":
				return [];
			default:
				return itemDefinition.default ?? "";
		}
	};

	const handleAddItem = () => {
		// Check max limit
		if (
			definition.validation?.maxItems !== undefined &&
			items.length >= definition.validation.maxItems
		) {
			return;
		}

		const newItems = [...items, createDefaultValue()];
		setItems(newItems);
		field.onChange(newItems);
	};

	const handleRemoveItem = (index: number) => {
		// Check min limit
		if (
			definition.validation?.minItems !== undefined &&
			items.length <= definition.validation.minItems
		) {
			return;
		}

		const newItems = items.filter((_, i) => i !== index);
		setItems(newItems);
		field.onChange(newItems);
	};

	const handleItemChange = (index: number, value: unknown) => {
		const newItems = [...items];
		newItems[index] = value;
		setItems(newItems);
		field.onChange(newItems);
	};

	const canAddMore =
		definition.validation?.maxItems === undefined ||
		items.length < definition.validation.maxItems;

	const canRemove =
		definition.validation?.minItems === undefined ||
		items.length > definition.validation.minItems;

	return (
		<Field>
			<div className="tg:flex tg:items-center tg:justify-between">
				<div className="tg:flex tg:flex-col tg:gap-1">
					<FieldLabel>
						{definition.label}
						{definition.required && (
							<span className="tg:ml-1 tg:text-red-500">*</span>
						)}
						<span className="tg:ml-2 tg:font-normal tg:text-neutral-400 tg:text-xs">
							({items.length}{" "}
							{items.length === 1 ? "item" : "items"})
						</span>
					</FieldLabel>
					{definition.description && (
						<FieldDescription>
							{definition.description}
						</FieldDescription>
					)}
				</div>

				<Button
					type="button"
					size="sm"
					variant="outline"
					onClick={handleAddItem}
					disabled={!canAddMore}
					className="tg:shrink-0"
				>
					<PlusIcon className="tg:mr-1 tg:size-3" />
					Add
				</Button>
			</div>

			{definition.validation && (
				<div className="tg:flex tg:gap-4 tg:text-neutral-400 tg:text-xs">
					{definition.validation.minItems !== undefined && (
						<span>Min: {definition.validation.minItems}</span>
					)}
					{definition.validation.maxItems !== undefined && (
						<span>Max: {definition.validation.maxItems}</span>
					)}
				</div>
			)}

			<div className="tg:space-y-3">
				{items.length === 0 ? (
					<div className="tg:rounded-lg tg:border tg:border-neutral-700 tg:border-dashed tg:bg-neutral-800/30 tg:p-6 tg:text-center">
						<p className="tg:text-neutral-400 tg:text-sm">
							No items added.
						</p>
						<p className="tg:mt-1 tg:text-neutral-500 tg:text-xs">
							Click "Add" to create an item.
						</p>
					</div>
				) : (
					items.map((item, index) => {
						const itemFieldName = `${field.name}.${index}`;

						return (
							<div
								key={itemFieldName}
								className="tg:group tg:relative tg:rounded-lg tg:border tg:border-neutral-700 tg:bg-neutral-800/30 tg:p-4 tg:transition-colors hover:tg:border-neutral-600"
							>
								<div className="tg:mb-2 tg:flex tg:items-center tg:justify-between">
									<span className="tg:font-medium tg:text-neutral-400 tg:text-xs">
										Item {index + 1}
									</span>
									<Button
										type="button"
										size="sm"
										variant="ghost"
										onClick={() => handleRemoveItem(index)}
										disabled={!canRemove}
										className="tg:size-6 tg:p-0 tg:opacity-50 hover:tg:opacity-100"
									>
										<TrashIcon className="tg:size-3 tg:text-red-500" />
									</Button>
								</div>

								<InputComponent
									field={{
										value: item,
										onChange: (value) =>
											handleItemChange(index, value),
										name: itemFieldName,
									}}
									definition={{
										...itemDefinition,
										name: itemFieldName,
										label:
											itemDefinition.label ||
											`Item ${index + 1}`,
										required:
											itemDefinition.required || false,
									}}
								/>
							</div>
						);
					})
				)}
			</div>
			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
