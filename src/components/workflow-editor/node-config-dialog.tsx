"use client";

import * as React from "react";

import { useI18n } from "../../hooks/use-i18n.js";
import { Button } from "../../ui/components/button.js";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../../ui/components/dialog.js";
import { Field, FieldError, FieldLabel } from "../../ui/components/field.js";
import { Input } from "../../ui/components/input.js";
import { ScrollArea } from "../../ui/components/scroll-area.js";
import { configInputRegistry } from "./config/inputs/index.js";
import {
	createDefaultValues,
	parseConfigSchema,
	validateRequiredFields,
} from "./config/schema-parser.js";

/**
 * Props for NodeConfigDialog
 */
export interface NodeConfigDialogProps {
	/**
	 * Whether the dialog is open
	 */
	open: boolean;
	/**
	 * Callback when dialog open state changes
	 */
	onOpenChange: (open: boolean) => void;
	/**
	 * Node ID
	 */
	nodeId: string;
	/**
	 * Node name
	 */
	nodeName: string;
	/**
	 * Node type
	 */
	nodeType: string;
	/**
	 * Configuration schema
	 */
	configSchema: Record<string, unknown>;
	/**
	 * Current configuration
	 */
	currentConfig: Record<string, unknown>;
	/**
	 * Current custom name
	 */
	currentCustomName?: string;
	/**
	 * Current custom ID
	 */
	currentCustomId?: string;
	/**
	 * All node IDs (for validation)
	 */
	allNodeIds: string[];
	/**
	 * Callback when config is saved
	 */
	onSave: (
		nodeId: string,
		config: Record<string, unknown>,
		customName: string,
		customId: string,
	) => void;
}

/**
 * Dialog for configuring nodes
 * Simplified version for the SDK
 *
 * @example
 * ```tsx
 * <NodeConfigDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   nodeId="node-1"
 *   nodeName="My Node"
 *   nodeType="transform"
 *   configSchema={schema}
 *   currentConfig={config}
 *   onSave={(id, config, name, customId) => handleSave(id, config, name, customId)}
 * />
 * ```
 */
export function NodeConfigDialog({
	open,
	onOpenChange,
	nodeId,
	nodeName,
	nodeType,
	configSchema,
	currentConfig,
	currentCustomName,
	currentCustomId,
	allNodeIds,
	onSave,
}: NodeConfigDialogProps) {
	const t = useI18n();

	// Parse schema to get field definitions
	const fields = React.useMemo(
		() => parseConfigSchema(configSchema),
		[configSchema],
	);

	// Create default values from schema and existing config
	const defaultConfigValues = React.useMemo(
		() => createDefaultValues(fields, currentConfig),
		[fields, currentConfig],
	);

	const [customName, setCustomName] = React.useState(
		currentCustomName || nodeName,
	);
	const [customId, setCustomId] = React.useState(currentCustomId || nodeId);
	const [config, setConfig] =
		React.useState<Record<string, unknown>>(defaultConfigValues);
	const [errors, setErrors] = React.useState<Record<string, string>>({});

	React.useEffect(() => {
		if (open) {
			setCustomName(currentCustomName || nodeName);
			setCustomId(currentCustomId || nodeId);
			setConfig(defaultConfigValues);
			setErrors({});
		}
	}, [
		open,
		currentCustomName,
		currentCustomId,
		nodeName,
		nodeId,
		defaultConfigValues,
	]);

	// Update config value for a field
	const updateConfigValue = React.useCallback(
		(fieldName: string, value: unknown) => {
			setConfig((prev) => ({
				...prev,
				[fieldName]: value,
			}));
			// Clear error for this field when user starts typing
			if (errors[fieldName]) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[fieldName];
					return newErrors;
				});
			}
		},
		[errors],
	);

	const handleSave = () => {
		const newErrors: Record<string, string> = {};

		// Validate custom name
		if (!customName || !customName.trim()) {
			newErrors.customName = t("node.config.customNameRequired");
		}

		// Validate custom ID
		if (!customId || !customId.trim()) {
			newErrors.customId = t("node.config.customIdRequired");
		} else if (customId !== nodeId && allNodeIds.includes(customId)) {
			newErrors.customId = t("node.config.customIdInUse");
		}

		// Validate config fields with i18n support
		const configErrors = validateRequiredFields(
			fields,
			config,
			(key: string, vars?: Record<string, string | number>) => {
				// Type assertion needed because validateRequiredFields uses string keys
				// but t expects TranslationPackage keys
				return t(key as Parameters<typeof t>[0], vars);
			},
		);
		Object.assign(newErrors, configErrors);

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		onSave(nodeId, config, customName.trim(), customId.trim());
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="tg:max-w-2xl">
				<DialogHeader>
					<DialogTitle>{t("node.config.title")}</DialogTitle>
				</DialogHeader>
				<ScrollArea className="tg:max-h-[60vh] tg:pr-4">
					<div className="tg:space-y-4">
						<Field>
							<FieldLabel>
								{t("node.config.customName")}
							</FieldLabel>
							<Input
								value={customName}
								onChange={(e) => setCustomName(e.target.value)}
							/>
							{errors.customName && (
								<FieldError>{errors.customName}</FieldError>
							)}
						</Field>

						<Field>
							<FieldLabel>{t("node.config.customId")}</FieldLabel>
							<Input
								value={customId}
								onChange={(e) => setCustomId(e.target.value)}
							/>
							{errors.customId && (
								<FieldError>{errors.customId}</FieldError>
							)}
						</Field>

						{/* Dynamic config fields from schema */}
						{fields.length > 0 && (
							<div className="tg:space-y-4">
								<p className="tg:font-medium tg:text-foreground tg:text-sm">
									{t("node.config.configuration", {
										nodeType,
									})}
								</p>
								{fields.map((field) => {
									const InputComponent =
										configInputRegistry.get(field.type);

									if (!InputComponent) {
										console.warn(
											`No input component registered for type: ${field.type}`,
										);
										return null;
									}

									return (
										<InputComponent
											key={field.name}
											field={{
												value: config[field.name],
												onChange: (value) =>
													updateConfigValue(
														field.name,
														value,
													),
												name: field.name,
											}}
											definition={field}
											error={errors[field.name]}
										/>
									);
								})}
							</div>
						)}
					</div>
				</ScrollArea>
				<div className="tg:flex tg:justify-end tg:gap-2">
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						{t("node.config.cancel")}
					</Button>
					<Button onClick={handleSave}>
						{t("node.config.save")}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
