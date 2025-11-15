/**
 * Translation packages by locale
 */
import { en } from "./en.js";
import { ptBR } from "./pt-BR.js";

export const translations = {
	en,
	"pt-BR": ptBR,
} as const;

export type SupportedLocale = keyof typeof translations;

// Re-export individual translation packages
export { en, ptBR };

/**
 * Get translations for a specific locale
 * @param locale - Locale code (e.g., 'en', 'pt-BR', 'pt')
 * @returns Translation package for the locale, or English as fallback
 */
export function getTranslationsForLocale(
	locale: string | undefined,
): typeof en {
	if (!locale) {
		return en;
	}

	const normalizedLocale = locale.toLowerCase().trim();

	// Try exact match first (case-insensitive)
	if (normalizedLocale === "en") {
		return en;
	}
	if (normalizedLocale === "pt-br" || normalizedLocale === "pt_br") {
		return ptBR;
	}

	// Try language code match (e.g., 'pt' -> 'pt-BR')
	const languageCode = normalizedLocale.split("-")[0].split("_")[0];
	if (languageCode === "pt") {
		return ptBR;
	}

	// Default to English
	return en;
}
