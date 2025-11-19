/**
 * Input components registry and exports
 */

import { registerConfigInputs } from "../input-registry.js";
import { ArrayInput } from "./array-input.js";
import { BooleanInput } from "./boolean-input.js";
import { NumberInput } from "./number-input.js";
import { ObjectInput } from "./object-input.js";
import { SelectInput } from "./select-input.js";
import { TextInput } from "./text-input.js";
import { TextareaInput } from "./textarea-input.js";

// Register all input components
registerConfigInputs({
	// Primitive types
	string: TextInput,
	text: TextInput,
	number: NumberInput,
	integer: NumberInput,
	boolean: BooleanInput,
	enum: SelectInput,
	select: SelectInput,
	textarea: TextareaInput,
	// Complex types
	object: ObjectInput,
	array: ArrayInput,
	// Fallback
	any: TextInput,
});

export type {
	ConfigInputComponent,
	ConfigInputProps,
} from "../input-registry.js";
// Export registry and types
export { configInputRegistry } from "../input-registry.js";
// Export individual components
export { ArrayInput } from "./array-input.js";
export { BooleanInput } from "./boolean-input.js";
export { NumberInput } from "./number-input.js";
export { ObjectInput } from "./object-input.js";
export { SelectInput } from "./select-input.js";
export { TextInput } from "./text-input.js";
export { TextareaInput } from "./textarea-input.js";
