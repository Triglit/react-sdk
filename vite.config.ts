import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import preserveUseClientDirective from "rollup-plugin-preserve-use-client";
import { defineConfig } from "vite";
import banner from "vite-plugin-banner";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [
		react({
			jsxRuntime: "automatic",
		}),
		dts({
			exclude: [
				".storybook/**/*",
				"**/*.stories.{js,jsx,ts,tsx}",
				"**/*.test.{js,jsx,ts,tsx}",
			],
		}),
		tailwindcss(),
		banner({
			content: "'use client';\n",
			verify: false,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		lib: {
			entry: "./index.ts",
			name: "triglit-react-sdk",
			fileName: (format) => `triglit-react-sdk.${format}.js`,
			formats: ["es", "cjs", "umd"],
		},
		rollupOptions: {
			plugins: [preserveUseClientDirective],
			external: (id) => {
				return /^(react|react-dom|react\/jsx-runtime|react\/jsx-dev-runtime)$/.test(
					id,
				);
			},
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "React",
				},
				preserveModules: false,
				manualChunks: undefined,
				banner: "'use client';\n",
			},
		},
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: ["log", "info", "debug"],
				drop_debugger: true,
			},
			mangle: {
				safari10: true,
			},
		},
		chunkSizeWarningLimit: 1000,
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	optimizeDeps: {
		include: ["clsx"],
	},
});
