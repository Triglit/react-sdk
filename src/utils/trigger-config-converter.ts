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
	filters?: Record<string, unknown>;
	entityIdResolver?: string;
	eventKeyGenerator?: string;
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
	webhookConfig?: null;
	scheduleConfig?: {
		cron?: string;
		intervalMs?: number;
		timezone?: string;
	};
	queueConfig?: {
		queueName: string;
		consumerGroup?: string;
		batchSize?: number;
	};
} {
	const type = triggerType.replace("trigger_", "") as TriggerType;
	const config: Record<string, unknown> = { ...visualConfig };

	// Remove campos internos (_customName, _customId, _triggerId)
	delete config._customName;
	delete config._customId;
	delete config._triggerId;

	const apiConfig: {
		filters?: Record<string, unknown>;
		entityIdResolver?: string;
		eventKeyGenerator?: string;
		rateLimit?: { maxRequests: number; windowMs: number };
		timeoutMs?: number;
		retryPolicy?: {
			maxRetries: number;
			backoffMs: number;
			maxBackoffMs: number;
		};
		webhookConfig?: null;
		scheduleConfig?: {
			cron?: string;
			intervalMs?: number;
			timezone?: string;
		};
		queueConfig?: {
			queueName: string;
			consumerGroup?: string;
			batchSize?: number;
		};
	} = {};

	// Mapeamento específico por tipo de trigger
	if (type === "event") {
		if (config.eventType) {
			apiConfig.filters =
				(config.filters as Record<string, unknown>) || {};
		}
	}

	if (type === "schedule") {
		apiConfig.scheduleConfig = {
			cron: (config.cronExpression as string) || undefined,
			timezone: (config.timezone as string) || undefined,
		};
	}

	if (type === "webhook") {
		// Para webhook, apenas marca como null conforme o schema
		// Os campos path, method, requireAuth são apenas visuais e não são salvos no config da API
		apiConfig.webhookConfig = null;
	}

	if (type === "queue") {
		apiConfig.queueConfig = {
			queueName: (config.queueName as string) || "",
			consumerGroup: (config.consumerGroup as string) || undefined,
			batchSize: (config.batchSize as number) || undefined,
		};
	}

	// Campos comuns opcionais
	if (config.entityIdResolver) {
		apiConfig.entityIdResolver = config.entityIdResolver as string;
	}
	if (config.eventKeyGenerator) {
		apiConfig.eventKeyGenerator = config.eventKeyGenerator as string;
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
 */
export function getTriggerConfigSchemas(): Record<
	string,
	Record<string, unknown>
> {
	return {
		trigger_event: {
			type: "object",
			properties: {
				eventType: {
					type: "string",
					title: "Event Type",
					description:
						"Name of the event that will trigger this workflow",
					default: "",
				},
				filters: {
					type: "object",
					title: "Filters",
					description: "Conditions the event must meet (JSON)",
					default: {},
				},
			},
			required: ["eventType"],
		},
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
				timezone: {
					type: "string",
					title: "Timezone",
					description: "Timezone for execution",
					default: "UTC",
				},
			},
			required: ["cronExpression"],
		},
		trigger_webhook: {
			type: "object",
			properties: {
				path: {
					type: "string",
					title: "Webhook Path",
					description: "Webhook URL path (e.g., /my-webhook)",
					default: "",
				},
				method: {
					type: "string",
					title: "HTTP Method",
					description: "Accepted HTTP method",
					enum: ["POST", "GET", "PUT", "DELETE"],
					default: "POST",
				},
				requireAuth: {
					type: "boolean",
					title: "Require Authentication",
					description:
						"If true, the webhook requires authentication via API key",
					default: true,
				},
			},
			required: ["path", "method"],
		},
		trigger_queue: {
			type: "object",
			properties: {
				queueName: {
					type: "string",
					title: "Queue Name",
					description:
						"Name of the queue that will trigger this workflow",
					default: "",
				},
				maxRetries: {
					type: "integer",
					title: "Max Retries",
					description: "Maximum number of retries on failure",
					default: 3,
					minimum: 0,
					maximum: 10,
				},
				priority: {
					type: "string",
					title: "Priority",
					description: "Queue processing priority",
					enum: ["low", "normal", "high"],
					default: "normal",
				},
			},
			required: ["queueName"],
		},
	};
}
