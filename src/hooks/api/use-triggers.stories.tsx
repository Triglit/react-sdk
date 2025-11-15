import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TriglitProvider } from "../../provider/triglit-provider.js";
import { useTrigger, useTriggers } from "./use-triggers.js";

const meta = {
	title: "Hooks/API/useTriggers",
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

const TriggersListExample = () => {
	const { data, isLoading, error } = useTriggers({
		workflowVersionId: "wfv_test_456",
		pageSize: 10,
	});

	return (
		<div className="tg:space-y-4 tg:p-4">
			<h3 className="tg:font-semibold tg:text-foreground tg:text-lg">
				Triggers List
			</h3>
			{isLoading && (
				<div className="tg:text-muted-foreground">
					Loading triggers...
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

const TriggerExample = () => {
	const { data, isLoading, error } = useTrigger("trg_test_789");

	return (
		<div className="tg:space-y-4 tg:p-4">
			<h3 className="tg:font-semibold tg:text-foreground tg:text-lg">
				Trigger Details
			</h3>
			{isLoading && (
				<div className="tg:text-muted-foreground">
					Loading trigger...
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

export const ListTriggers: Story = {
	render: () => (
		<QueryClientProvider client={queryClient}>
			<TriglitProvider
				config={{
					apiKey: "pk_test_example_key_12345",
				}}
			>
				<TriggersListExample />
			</TriglitProvider>
		</QueryClientProvider>
	),
};

export const GetTrigger: Story = {
	render: () => (
		<QueryClientProvider client={queryClient}>
			<TriglitProvider
				config={{
					apiKey: "pk_test_example_key_12345",
				}}
			>
				<TriggerExample />
			</TriglitProvider>
		</QueryClientProvider>
	),
};
