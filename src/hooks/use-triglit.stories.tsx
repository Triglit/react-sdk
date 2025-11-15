import type { Meta, StoryObj } from "@storybook/react-vite";

import { TriglitProvider } from "../provider/triglit-provider.js";
import { useTriglit } from "./use-triglit.js";

const meta = {
	title: "Hooks/useTriglit",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleComponent = () => {
	const { client, config } = useTriglit();

	return (
		<div className="tg:space-y-4 tg:p-4">
			<div className="tg:text-foreground">
				<strong>API Key:</strong>{" "}
				{config.apiKey
					? `${config.apiKey.substring(0, 10)}...`
					: "Not set"}
			</div>
			<div className="tg:text-foreground">
				<strong>Base URL:</strong>{" "}
				{config?.baseURL || "Default (https://api.triglit.com)"}
			</div>
			<div className="tg:text-foreground">
				<strong>Client:</strong>{" "}
				{client ? "Initialized ✓" : "Not initialized ✗"}
			</div>
		</div>
	);
};

export const WithAPIKey: Story = {
	render: () => (
		<TriglitProvider
			config={{
				apiKey: "pk_test_example_key_12345",
			}}
		>
			<ExampleComponent />
		</TriglitProvider>
	),
};

export const WithCustomBaseURL: Story = {
	render: () => (
		<TriglitProvider
			config={{
				apiKey: "pk_test_example_key_12345",
				baseURL: "https://api.staging.triglit.com",
			}}
		>
			<ExampleComponent />
		</TriglitProvider>
	),
};
