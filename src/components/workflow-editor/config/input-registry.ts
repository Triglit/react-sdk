/**
 * Input registry for configuration fields
 * Maps field types to their React components
 */

import type { ComponentType } from "react";

import type { ConfigFieldDefinition } from "./schema-parser.js";

/**
 * Props for input components
 */
export interface ConfigInputProps {
	field: {
		value: unknown;
		onChange: (value: unknown) => void;
		name: string;
	};
	definition: ConfigFieldDefinition;
	error?: string;
	disabled?: boolean;
}

/**
 * Type for input components
 */
export type ConfigInputComponent = ComponentType<ConfigInputProps>;

/**
 * Input registry class
 */
class ConfigInputRegistry {
	private components = new Map<string, ConfigInputComponent>();

	/**
	 * Register an input component for a type
	 */
	register(type: string, component: ConfigInputComponent): void {
		this.components.set(type, component);
	}

	/**
	 * Get component for a field type
	 */
	get(type: string): ConfigInputComponent | undefined {
		return this.components.get(type);
	}

	/**
	 * Check if type is registered
	 */
	has(type: string): boolean {
		return this.components.has(type);
	}

	/**
	 * Get all registered types
	 */
	getRegisteredTypes(): string[] {
		return Array.from(this.components.keys());
	}
}

/**
 * Singleton instance
 */
export const configInputRegistry = new ConfigInputRegistry();

/**
 * Helper to register multiple inputs at once
 */
export function registerConfigInputs(
	inputs: Record<string, ConfigInputComponent>,
): void {
	for (const [type, component] of Object.entries(inputs)) {
		configInputRegistry.register(type, component);
	}
}
