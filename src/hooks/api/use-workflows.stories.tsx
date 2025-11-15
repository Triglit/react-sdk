import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TriglitProvider } from "../../provider/triglit-provider.js";
import { useWorkflow, useWorkflows } from "./use-workflows.js";

const meta = {
	title: "Hooks/API/useWorkflows",
	tags: ["autodocs"],
} satisfies Meta;

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

const WorkflowsListExample = () => {
	const { data, isLoading, error } = useWorkflows({ pageSize: 10 });

	return (
		<div className="tg:space-y-4 tg:p-4">
			<h3 className="tg:font-semibold tg:text-foreground tg:text-lg">
				Workflows List
			</h3>
			{isLoading && (
				<div className="tg:text-muted-foreground">
					Loading workflows...
				</div>
			)}
			{error && (
				<div className="tg:text-destructive">
					Error: {String(error)}
				</div>
			)}
			{data !== undefined && data !== null && (
				<div className="tg:text-foreground">
					<pre className="tg:overflow-auto tg:rounded-lg tg:bg-muted tg:p-4">
						{String(JSON.stringify(data, null, 2) ?? "")}
					</pre>
				</div>
			)}
		</div>
	);
};

const WorkflowExample = () => {
	const { data, isLoading, error } = useWorkflow("wf_test_123");

	return (
		<div className="tg:space-y-4 tg:p-4">
			<h3 className="tg:font-semibold tg:text-foreground tg:text-lg">
				Workflow Details
			</h3>
			{isLoading && (
				<div className="tg:text-muted-foreground">
					Loading workflow...
				</div>
			)}
			{error && (
				<div className="tg:text-destructive">
					Error: {String(error)}
				</div>
			)}
			{data !== undefined && data !== null && (
				<div className="tg:text-foreground">
					<pre className="tg:overflow-auto tg:rounded-lg tg:bg-muted tg:p-4">
						{String(JSON.stringify(data, null, 2) ?? "")}
					</pre>
				</div>
			)}
		</div>
	);
};

export const ListWorkflows: Story = {
	render: () => (
		<QueryClientProvider client={queryClient}>
			<TriglitProvider
				config={{
					apiKey: "pk_test_example_key_12345",
				}}
			>
				<WorkflowsListExample />
			</TriglitProvider>
		</QueryClientProvider>
	),
};

export const GetWorkflow: Story = {
	render: () => (
		<QueryClientProvider client={queryClient}>
			<TriglitProvider
				config={{
					apiKey: "pk_test_example_key_12345",
				}}
			>
				<WorkflowExample />
			</TriglitProvider>
		</QueryClientProvider>
	),
};
