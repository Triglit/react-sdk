/**
 * i18n utilities for the Triglit SDK
 */

import type { TriglitI18n } from "../types/index.js";
import { en } from "./i18n/translations/en.js";
import { getTranslationsForLocale } from "./i18n/translations/index.js";

/**
 * Template variables for translations
 */
export interface TranslationVariables {
	[key: string]: string | number | undefined;
}

/**
 * Default English translations (used for type inference)
 */
const defaultTranslations = en;

export type TranslationPackage = typeof en;

/**
 * Replace template variables in a string
 * Supports {{variable}} syntax
 * @param template - Template string with {{variable}} placeholders
 * @param variables - Variables to replace
 * @returns String with variables replaced
 */
function replaceTemplateVariables(
	template: string,
	variables: TranslationVariables,
): string {
	return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		const value = variables[key];
		return value !== undefined ? String(value) : match;
	});
}

/**
 * Get translation for a key with optional template variables
 * @param i18n - i18n configuration
 * @param key - Translation key
 * @param variables - Optional variables for template strings
 * @param fallback - Fallback text if translation not found
 * @returns Translated text with variables replaced
 */
export function t(
	i18n: TriglitI18n | undefined,
	key: keyof TranslationPackage,
	variables?: TranslationVariables,
	fallback?: string,
): string {
	let translation: string;

	// Get base translations for the locale
	const localeTranslations = getTranslationsForLocale(i18n?.locale);

	// If custom translations are provided, use them (they override locale translations)
	if (i18n?.translations) {
		if (typeof i18n.translations === "function") {
			const result = i18n.translations(key as string);
			translation =
				result ||
				fallback ||
				localeTranslations[key] ||
				defaultTranslations[key] ||
				String(key);
		} else {
			const keyStr = String(key);
			translation =
				i18n.translations[keyStr] ||
				fallback ||
				localeTranslations[key] ||
				defaultTranslations[key] ||
				keyStr;
		}
	} else {
		// Use locale translations or fallback to English
		translation =
			fallback ||
			localeTranslations[key] ||
			defaultTranslations[key] ||
			String(key);
	}

	// Replace template variables if provided
	if (variables) {
		translation = replaceTemplateVariables(translation, variables);
	}

	return translation;
}
