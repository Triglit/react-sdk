/**
 * Utility to convert trigger visual configuration to API format
 */

import type { TriggerType } from "../types/index.js";

/**
 * Convert trigger visual configuration to API format
 * @param triggerType - Type of trigger
 * @param visualConfig - Visual configuration from the editor
 * @returns API-compatible configuration
 */
export function convertTriggerConfigToApi(
	triggerType: string,
	visualConfig: Record<string, unknown>,
): {
	rateLimit?: {
		maxRequests: number;
		windowMs: number;
	};
	timeoutMs?: number;
	retryPolicy?: {
		maxRetries: number;
		backoffMs: number;
		maxBackoffMs: number;
	};
	webhookConfig?: {
		event?: string;
	} | null;
	scheduleConfig?: {
		cron?: string;
		intervalMs?: number;
		timezone?: string;
	};
} {
	const type = triggerType.replace("trigger_", "") as TriggerType;
	const config: Record<string, unknown> = { ...visualConfig };

	// Remove campos internos (_customName, _customId, _triggerId)
	delete config._customName;
	delete config._customId;
	delete config._triggerId;

	const apiConfig: {
		rateLimit?: { maxRequests: number; windowMs: number };
		timeoutMs?: number;
		retryPolicy?: {
			maxRetries: number;
			backoffMs: number;
			maxBackoffMs: number;
		};
		webhookConfig?: {
			event?: string;
		} | null;
		scheduleConfig?: {
			cron?: string;
			intervalMs?: number;
			timezone?: string;
		};
	} = {};

	// Mapeamento específico por tipo de trigger
	if (type === "schedule") {
		apiConfig.scheduleConfig = {
			cron: (config.cronExpression as string) || undefined,
			timezone: "UTC", // Always use UTC, timezone field is hidden from UI
		};
	}

	if (type === "webhook") {
		// Para webhook, inclui o event se fornecido
		// Os campos path, method, requireAuth são apenas visuais e não são salvos no config da API
		apiConfig.webhookConfig = config.event
			? { event: config.event as string }
			: null;
	}
	if (config.rateLimit) {
		apiConfig.rateLimit = config.rateLimit as {
			maxRequests: number;
			windowMs: number;
		};
	}
	if (config.timeoutMs) {
		apiConfig.timeoutMs = config.timeoutMs as number;
	}
	if (config.retryPolicy) {
		apiConfig.retryPolicy = config.retryPolicy as {
			maxRetries: number;
			backoffMs: number;
			maxBackoffMs: number;
		};
	}

	return apiConfig;
}

/**
 * Get trigger configuration schemas for the editor
 * @param webhookEvents - Optional list of custom webhook events configured for the tenant
 */
export function getTriggerConfigSchemas(
	webhookEvents?: Array<{ name: string; label: string }>,
): Record<string, Record<string, unknown>> {
	const webhookEventField =
		webhookEvents && webhookEvents.length > 0
			? {
					event: {
						type: "string",
						title: "Event",
						description:
							"Event associated with this webhook trigger",
						enum: webhookEvents.map((e) => e.name),
						enumNames: webhookEvents.map((e) => e.label),
					},
				}
			: {
					event: {
						type: "string",
						title: "Event",
						description:
							"Event associated with this webhook trigger (e.g., lead.created)",
					},
				};

	return {
		trigger_schedule: {
			type: "object",
			properties: {
				cronExpression: {
					type: "string",
					title: "Cron Expression",
					description:
						"Cron expression to schedule execution (e.g., 0 0 * * *)",
					default: "0 0 * * *",
				},
				// timezone is hidden from UI and always set to UTC
			},
			required: ["cronExpression"],
		},
		trigger_webhook: {
			type: "object",
			properties: {
				...webhookEventField,
			},
			required: [],
		},
	};
}
