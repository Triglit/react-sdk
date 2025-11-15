"use client";

import type { TranslationPackage } from "../utils/i18n.js";
import { type TranslationVariables, t as tFunction } from "../utils/i18n.js";
import { useTriglit } from "./use-triglit.js";

/**
 * Hook to access i18n translation function
 * @returns Translation function configured with current i18n context
 *
 * @example
 * ```tsx
 * const t = useI18n();
 * const text = t('workflow.editor.save');
 * const versionText = t('workflow.editor.version', { version: 1 });
 * ```
 */
export function useI18n() {
	const { i18n } = useTriglit();

	return function t(
		key: keyof TranslationPackage,
		variables?: TranslationVariables,
	): string {
		return tFunction(i18n, key, variables);
	};
}
