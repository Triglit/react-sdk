import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TriglitProvider } from "../../provider/triglit-provider.js";
import { WorkflowEditor } from "./workflow-editor.js";

const meta = {
	component: WorkflowEditor,
	title: "Components/WorkflowEditor",
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
} satisfies Meta<typeof WorkflowEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
		},
	},
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<TriglitProvider
				config={{
					apiKey: "pk_test_example_key_12345",
				}}
			>
				<div className="tg:h-screen tg:w-screen">{children}</div>
			</TriglitProvider>
		</QueryClientProvider>
	);
};

export const Default: Story = {
	args: {
		workflowId: "wf_test_123",
	},
	decorators: [
		(Story) => (
			<Wrapper>
				<Story />
			</Wrapper>
		),
	],
};

export const WithInitialVersion: Story = {
	args: {
		workflowId: "wf_test_123",
		initialVersionId: "wfv_test_456",
	},
	decorators: [
		(Story) => (
			<Wrapper>
				<Story />
			</Wrapper>
		),
	],
};

export const WithOnSave: Story = {
	args: {
		workflowId: "wf_test_123",
		onSave: (versionId) => {
			console.log("Version saved:", versionId);
		},
	},
	decorators: [
		(Story) => (
			<Wrapper>
				<Story />
			</Wrapper>
		),
	],
};
