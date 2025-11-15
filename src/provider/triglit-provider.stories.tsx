import type { Meta, StoryObj } from "@storybook/react-vite";

import { TriglitLoading } from "../components/status/triglit-loading.js";
import { useTriglit } from "../hooks/use-triglit.js";
import { TriglitProvider } from "./triglit-provider.js";

const meta = {
	component: TriglitProvider,
	title: "Provider/TriglitProvider",
	tags: ["autodocs"],
} satisfies Meta<typeof TriglitProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleComponent = () => {
	const {
		client,
		config: { apiKey },
	} = useTriglit();
	return (
		<div className="tg:space-y-4 tg:p-4">
			<div className="tg:text-foreground">
				<strong>API Key:</strong>{" "}
				{apiKey ? `${apiKey.substring(0, 10)}...` : "Not set"}
			</div>
			<div className="tg:text-foreground">
				<strong>Client:</strong>{" "}
				{client ? "Initialized" : "Not initialized"}
			</div>
			<TriglitLoading>
				<div className="tg:p-4">
					<p>Testing provider...</p>
				</div>
			</TriglitLoading>
		</div>
	);
};

export const Default: Story = {
	args: {
		config: {
			apiKey: "pk_test_example_key_12345",
		},
		children: <ExampleComponent />,
	},
};

export const WithCustomBaseURL: Story = {
	args: {
		config: {
			apiKey: "pk_test_example_key_12345",
			baseURL: "https://api.staging.triglit.com",
		},
		children: <ExampleComponent />,
	},
};

export const WithoutAPIKey: Story = {
	args: {
		config: {},
		children: <ExampleComponent />,
	},
};
