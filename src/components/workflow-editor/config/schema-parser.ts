/**
 * Schema parser for node configuration
 * Converts JSON Schema to field definitions for dynamic form rendering
 */

/**
 * Field definition extracted from schema
 */
export interface ConfigFieldDefinition {
	name: string;
	label: string;
	type: string;
	required: boolean;
	description?: string;
	default?: unknown;
	options?: unknown[];
	dynamic?: boolean;
	validation?: {
		min?: number;
		max?: number;
		minLength?: number;
		maxLength?: number;
		pattern?: string;
		minItems?: number;
		maxItems?: number;
	};
	// For 'object' type: nested properties
	properties?: Record<string, ConfigFieldDefinition>;
	additionalProperties?: boolean;
	// For 'array' type: item schema
	items?: ConfigFieldDefinition;
}

/**
 * Schema property interface
 */
interface SchemaProperty {
	type?: string | string[];
	title?: string;
	description?: string;
	default?: unknown;
	enum?: string[];
	dynamic?: boolean;
	minimum?: number;
	maximum?: number;
	min?: number;
	max?: number;
	minLength?: number;
	maxLength?: number;
	minItems?: number;
	maxItems?: number;
	pattern?: string;
	properties?: Record<string, SchemaProperty>;
	required?: boolean | string[];
	items?: SchemaProperty;
	additionalProperties?: boolean;
}

interface ConfigSchema {
	type?: string;
	properties?: Record<string, SchemaProperty>;
	required?: string[];
}

/**
 * Convert field name to readable label
 */
function fieldNameToLabel(name: string): string {
	return name
		.replace(/([A-Z])/g, " $1")
		.replace(/_/g, " ")
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ")
		.trim();
}

/**
 * Determine input type from schema property
 */
function determineInputType(property: SchemaProperty): string {
	// If has enum, it's a select
	if (property.enum && property.enum.length > 0) {
		return "enum";
	}

	// If array of types, take first
	const type = Array.isArray(property.type)
		? property.type[0]
		: property.type || "string";

	switch (type.toLowerCase()) {
		case "string":
		case "text":
			// If has large maxLength, use textarea
			if (property.maxLength && property.maxLength > 200) {
				return "textarea";
			}
			return "text";
		case "number":
		case "integer":
			return "number";
		case "boolean":
			return "boolean";
		case "object":
			return "object";
		case "array":
			return "array";
		default:
			return "text";
	}
}

/**
 * Parse a schema property into a field definition
 */
function parseSchemaProperty(
	name: string,
	property: SchemaProperty,
	isRequired: boolean,
): ConfigFieldDefinition {
	const inputType = determineInputType(property);

	// Support both 'minimum' and 'min' from backend
	const minValue = property.minimum ?? property.min;
	const maxValue = property.maximum ?? property.max;

	const field: ConfigFieldDefinition = {
		name,
		label: property.title || fieldNameToLabel(name),
		type: inputType,
		required: isRequired,
		description: property.description,
		default: property.default,
		options: property.enum,
		dynamic: property.dynamic,
		validation: {
			min: minValue,
			max: maxValue,
			minLength: property.minLength,
			maxLength: property.maxLength,
			pattern: property.pattern,
		},
	};

	// If object, parse nested properties recursively
	if (inputType === "object" && property.properties) {
		field.properties = {};
		const requiredFields = Array.isArray(property.required)
			? property.required
			: [];

		for (const [propName, propSchema] of Object.entries(
			property.properties,
		)) {
			const isPropRequired = requiredFields.includes(propName);
			field.properties[propName] = parseSchemaProperty(
				propName,
				propSchema,
				isPropRequired,
			);
		}

		field.additionalProperties = property.additionalProperties !== false;
	}

	// If array, parse item schema recursively
	if (inputType === "array" && property.items) {
		field.items = parseSchemaProperty("item", property.items, false);

		// Add array-specific validations
		// Support both minItems/maxItems (JSON Schema standard) and minLength/maxLength (legacy)
		if (
			property.minItems !== undefined ||
			property.minLength !== undefined
		) {
			field.validation = field.validation || {};
			field.validation.minItems = property.minItems ?? property.minLength;
		}
		if (
			property.maxItems !== undefined ||
			property.maxLength !== undefined
		) {
			field.validation = field.validation || {};
			field.validation.maxItems = property.maxItems ?? property.maxLength;
		}
	}

	return field;
}

/**
 * Parse configSchema and return array of field definitions
 * Supports multiple formats:
 * 1. Simplified backend format: { field: { type, required, etc } }
 * 2. JSON Schema with properties: { properties: { field: { type } } }
 * 3. Nested JSON Schema: { properties: { config: { properties: { field } } } }
 */
export function parseConfigSchema(
	configSchema: Record<string, unknown>,
): ConfigFieldDefinition[] {
	if (!configSchema || Object.keys(configSchema).length === 0) {
		return [];
	}

	const schema = configSchema as ConfigSchema;
	const fields: ConfigFieldDefinition[] = [];

	// Determine format
	let targetProperties: Record<string, SchemaProperty>;
	let requiredFields: string[] = [];

	// Format 1: Direct fields at root
	const hasDirectFields = Object.keys(configSchema).some((key) => {
		const value = configSchema[key] as SchemaProperty;
		return (
			value &&
			typeof value === "object" &&
			"type" in value &&
			!key.startsWith("_")
		);
	});

	if (hasDirectFields && !schema.properties) {
		targetProperties = configSchema as Record<string, SchemaProperty>;

		// Extract required fields
		requiredFields = Object.entries(targetProperties)
			.filter(([_, prop]) => prop.required === true)
			.map(([name, _]) => name);
	}
	// Format 2 and 3: JSON Schema with properties
	else if (schema.properties) {
		// Check for nested "config" property
		const configProperty = schema.properties.config as
			| SchemaProperty
			| undefined;

		if (configProperty?.properties) {
			// Format 3: Nested
			targetProperties = configProperty.properties;
			requiredFields = Array.isArray(configProperty.required)
				? configProperty.required
				: [];
		} else {
			// Format 2: Direct in properties
			targetProperties = schema.properties;
			requiredFields = Array.isArray(schema.required)
				? schema.required
				: [];
		}
	} else {
		// Empty or invalid schema
		return fields;
	}

	// Parse each property
	for (const [name, property] of Object.entries(targetProperties)) {
		// Ignore metadata fields
		if (
			name === "type" ||
			name === "inputSchema" ||
			name === "outputSchema" ||
			name === "canPause"
		) {
			continue;
		}

		const isRequired = requiredFields.includes(name);
		const field = parseSchemaProperty(name, property, isRequired);
		fields.push(field);
	}

	return fields;
}

/**
 * Create default values for form based on field definitions
 */
export function createDefaultValues(
	fields: ConfigFieldDefinition[],
	existingConfig?: Record<string, unknown>,
): Record<string, unknown> {
	const defaults: Record<string, unknown> = {};

	for (const field of fields) {
		// If value exists, use it
		if (existingConfig && field.name in existingConfig) {
			defaults[field.name] = existingConfig[field.name];
			continue;
		}

		// If has default, use it
		if (field.default !== undefined) {
			defaults[field.name] = field.default;
			continue;
		}

		// Use appropriate default for type
		switch (field.type) {
			case "boolean":
				defaults[field.name] = false;
				break;
			case "number":
				defaults[field.name] = undefined;
				break;
			case "array":
				defaults[field.name] = [];
				break;
			case "object":
				defaults[field.name] = {};
				break;
			default:
				defaults[field.name] = "";
		}
	}

	return defaults;
}

/**
 * Validate required fields
 * @param fields - Field definitions
 * @param values - Current values
 * @param t - Translation function (optional, for i18n support)
 * @returns Validation errors
 */
export function validateRequiredFields(
	fields: ConfigFieldDefinition[],
	values: Record<string, unknown>,
	t?: (key: string, vars?: Record<string, string | number>) => string,
): Record<string, string> {
	const errors: Record<string, string> = {};

	for (const field of fields) {
		if (field.required) {
			const value = values[field.name];

			// Check if empty
			if (
				value === undefined ||
				value === null ||
				value === "" ||
				(Array.isArray(value) && value.length === 0)
			) {
				errors[field.name] = t
					? t("node.config.fieldRequired", { field: field.label })
					: `${field.label} is required`;
			}
		}

		// Additional validations
		if (field.validation) {
			const value = values[field.name];

			// Min/Max for numbers
			if (field.type === "number" && typeof value === "number") {
				if (
					field.validation.min !== undefined &&
					value < field.validation.min
				) {
					errors[field.name] = t
						? t("node.config.fieldMin", {
								field: field.label,
								min: field.validation.min,
							})
						: `${field.label} must be at least ${field.validation.min}`;
				}
				if (
					field.validation.max !== undefined &&
					value > field.validation.max
				) {
					errors[field.name] = t
						? t("node.config.fieldMax", {
								field: field.label,
								max: field.validation.max,
							})
						: `${field.label} must be at most ${field.validation.max}`;
				}
			}

			// MinLength/MaxLength for strings
			if (field.type === "text" && typeof value === "string") {
				if (
					field.validation.minLength !== undefined &&
					value.length < field.validation.minLength
				) {
					errors[field.name] = t
						? t("node.config.fieldMinLength", {
								field: field.label,
								minLength: field.validation.minLength,
							})
						: `${field.label} must have at least ${field.validation.minLength} characters`;
				}
				if (
					field.validation.maxLength !== undefined &&
					value.length > field.validation.maxLength
				) {
					errors[field.name] = t
						? t("node.config.fieldMaxLength", {
								field: field.label,
								maxLength: field.validation.maxLength,
							})
						: `${field.label} must have at most ${field.validation.maxLength} characters`;
				}
			}

			// MinItems/MaxItems for arrays
			if (field.type === "array" && Array.isArray(value)) {
				if (
					field.validation.minItems !== undefined &&
					value.length < field.validation.minItems
				) {
					errors[field.name] = t
						? t("node.config.fieldMinItems", {
								field: field.label,
								minItems: field.validation.minItems,
							})
						: `${field.label} must have at least ${field.validation.minItems} items`;
				}
				if (
					field.validation.maxItems !== undefined &&
					value.length > field.validation.maxItems
				) {
					errors[field.name] = t
						? t("node.config.fieldMaxItems", {
								field: field.label,
								maxItems: field.validation.maxItems,
							})
						: `${field.label} must have at most ${field.validation.maxItems} items`;
				}
			}
		}
	}

	return errors;
}
