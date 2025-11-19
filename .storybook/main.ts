import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import { loadEnv } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [getAbsolutePath("@storybook/addon-docs")],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
	async viteFinal(config, { configType }) {
		const env = loadEnv(
			configType === "PRODUCTION" ? "production" : "development",
			process.cwd(),
			"",
		);

		config.define = {
			...config.define,
			"import.meta.env": {
				...env,
				VITE_TRIGLIT_PUBLISHABLE_KEY:
					env.VITE_TRIGLIT_PUBLISHABLE_KEY || "",
			},
		};

		return config;
	},
};

export default config;
