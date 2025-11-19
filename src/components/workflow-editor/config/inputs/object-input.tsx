"use client";

import {
	ChevronDownIcon,
	ChevronRightIcon,
	PlusIcon,
	TrashIcon,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/ui/components/button.js";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/ui/components/field.js";
import { Input } from "@/ui/components/input.js";

import type { ConfigInputProps } from "../input-registry.js";
import { configInputRegistry } from "./index.js";

/**
 * Object Input Component
 * Renders nested fields for complex object configuration
 * Supports full recursion for objects within objects
 * Supports arbitrary properties when additionalProperties = true
 */
export function ObjectInput({ field, definition, error }: ConfigInputProps) {
	const [isExpanded, setIsExpanded] = React.useState(true);
	const [newPropertyKey, setNewPropertyKey] = React.useState("");
	const [newPropertyValue, setNewPropertyValue] = React.useState("");

	const currentValue = React.useMemo(() => {
		if (typeof field.value === "object" && field.value !== null) {
			return field.value as Record<string, unknown>;
		}
		return {};
	}, [field.value]);

	// If no properties defined, render empty state
	if (
		(!definition.properties ||
			Object.keys(definition.properties).length === 0) &&
		!definition.additionalProperties
	) {
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
						Object without defined properties
					</p>
				</div>
				{error && <FieldError>{error}</FieldError>}
			</Field>
		);
	}

	const properties = Object.entries(definition.properties || {});
	const hasAdditionalProperties = definition.additionalProperties !== false;

	// Identify additional properties (not defined in schema)
	const definedPropertyNames = new Set(properties.map(([name]) => name));
	const additionalPropertyEntries = Object.entries(currentValue).filter(
		([key]) => !definedPropertyNames.has(key),
	);

	const handleAddProperty = () => {
		if (!newPropertyKey.trim()) return;

		// Update field value with new property
		field.onChange({
			...currentValue,
			[newPropertyKey.trim()]: newPropertyValue,
		});

		// Clear fields
		setNewPropertyKey("");
		setNewPropertyValue("");
	};

	const handleRemoveProperty = (key: string) => {
		const newValue = { ...currentValue };
		delete newValue[key];
		field.onChange(newValue);
	};

	const handleUpdatePropertyValue = (key: string, value: string) => {
		field.onChange({
			...currentValue,
			[key]: value,
		});
	};

	const handleNestedPropertyChange = (propName: string, value: unknown) => {
		field.onChange({
			...currentValue,
			[propName]: value,
		});
	};

	return (
		<Field>
			<button
				type="button"
				onClick={() => setIsExpanded(!isExpanded)}
				className="tg:flex tg:w-full tg:items-center tg:gap-2 tg:text-left"
			>
				{isExpanded ? (
					<ChevronDownIcon className="tg:size-4 tg:text-neutral-400" />
				) : (
					<ChevronRightIcon className="tg:size-4 tg:text-neutral-400" />
				)}
				<FieldLabel className="tg:cursor-pointer">
					{definition.label}
					{definition.required && (
						<span className="tg:ml-1 tg:text-red-500">*</span>
					)}
				</FieldLabel>
			</button>

			{definition.description && (
				<FieldDescription className="tg:ml-6">
					{definition.description}
				</FieldDescription>
			)}

			{isExpanded && (
				<div className="tg:ml-6 tg:space-y-4 tg:rounded-lg tg:border tg:border-neutral-700 tg:bg-neutral-800/30 tg:p-4">
					{/* Properties defined in schema */}
					{properties.length > 0 && (
						<div className="tg:space-y-4">
							{properties
								.filter(([propName]) => {
									// Hide nodeId field when inside switch cases (synced from visual connections)
									// Check if field name contains "cases" and property is "nodeId"
									if (
										propName === "nodeId" &&
										field.name.includes("cases")
									) {
										return false;
									}
									return true;
								})
								.map(([propName, propDefinition]) => {
									// Create nested field path (e.g., "validation.minLength")
									const nestedFieldName = `${field.name}.${propName}`;

									// Get component for this field type
									const InputComponent =
										configInputRegistry.get(
											propDefinition.type,
										);

									if (!InputComponent) {
										return (
											<div
												key={propName}
												className="tg:rounded-lg tg:border tg:border-yellow-700 tg:bg-yellow-900/20 tg:p-3"
											>
												<p className="tg:text-sm tg:text-yellow-500">
													Unsupported type:{" "}
													<span className="tg:font-mono">
														{propDefinition.type}
													</span>
												</p>
												<p className="tg:mt-1 tg:text-neutral-400 tg:text-xs">
													Field:{" "}
													{propDefinition.label}
												</p>
											</div>
										);
									}

									const nestedValue = currentValue[propName];

									return (
										<InputComponent
											key={propName}
											field={{
												value: nestedValue,
												onChange: (value) =>
													handleNestedPropertyChange(
														propName,
														value,
													),
												name: nestedFieldName,
											}}
											definition={{
												...propDefinition,
												name: nestedFieldName,
											}}
										/>
									);
								})}
						</div>
					)}

					{/* Additional properties (arbitrary) */}
					{hasAdditionalProperties && (
						<div className="tg:space-y-3">
							{properties.length > 0 && (
								<div className="tg:border-neutral-700 tg:border-t tg:pt-4">
									<p className="tg:mb-3 tg:font-medium tg:text-neutral-400 tg:text-xs">
										Additional Properties
									</p>
								</div>
							)}

							{/* List of existing additional properties */}
							{additionalPropertyEntries.length > 0 && (
								<div className="tg:space-y-2">
									{additionalPropertyEntries.map(
										([key, value]) => (
											<div
												key={key}
												className="tg:flex tg:items-center tg:gap-2 tg:rounded-lg tg:border tg:border-neutral-700 tg:bg-neutral-800/50 tg:p-3"
											>
												<div className="tg:flex tg:flex-1 tg:gap-2">
													<div className="tg:flex-1">
														<FieldLabel className="tg:mb-1 tg:text-neutral-400 tg:text-xs">
															Key
														</FieldLabel>
														<Input
															value={key}
															disabled
															className="tg:h-8 tg:bg-neutral-900/50 tg:text-sm"
														/>
													</div>
													<div className="tg:flex-1">
														<FieldLabel className="tg:mb-1 tg:text-neutral-400 tg:text-xs">
															Value
														</FieldLabel>
														<Input
															value={String(
																value || "",
															)}
															onChange={(e) =>
																handleUpdatePropertyValue(
																	key,
																	e.target
																		.value,
																)
															}
															className="tg:h-8 tg:text-sm"
															placeholder="Enter value"
														/>
													</div>
												</div>
												<Button
													type="button"
													size="sm"
													variant="ghost"
													onClick={() =>
														handleRemoveProperty(
															key,
														)
													}
													className="tg:mt-5 tg:size-8 tg:p-0 tg:opacity-50 hover:tg:opacity-100"
												>
													<TrashIcon className="tg:size-3 tg:text-red-500" />
												</Button>
											</div>
										),
									)}
								</div>
							)}

							{/* Form to add new property */}
							<div className="tg:rounded-lg tg:border tg:border-neutral-600 tg:border-dashed tg:bg-neutral-800/30 tg:p-3">
								<p className="tg:mb-2 tg:font-medium tg:text-neutral-300 tg:text-xs">
									Add Property
								</p>
								<div className="tg:flex tg:gap-2">
									<div className="tg:flex-1">
										<Input
											value={newPropertyKey}
											onChange={(e) =>
												setNewPropertyKey(
													e.target.value,
												)
											}
											placeholder="property-name"
											className="tg:h-8 tg:text-sm"
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleAddProperty();
												}
											}}
										/>
									</div>
									<div className="tg:flex-1">
										<Input
											value={newPropertyValue}
											onChange={(e) =>
												setNewPropertyValue(
													e.target.value,
												)
											}
											placeholder="value"
											className="tg:h-8 tg:text-sm"
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleAddProperty();
												}
											}}
										/>
									</div>
									<Button
										type="button"
										size="sm"
										onClick={handleAddProperty}
										disabled={!newPropertyKey.trim()}
										className="tg:h-8 tg:px-3"
									>
										<PlusIcon className="tg:mr-1 tg:size-3" />
										Add
									</Button>
								</div>
								<p className="tg:mt-2 tg:text-neutral-500 tg:text-xs">
									Press Enter or click Add to create the
									property
								</p>
							</div>
						</div>
					)}
				</div>
			)}
			{error && <FieldError>{error}</FieldError>}
		</Field>
	);
}
