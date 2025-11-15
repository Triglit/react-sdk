import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertTriangle } from "lucide-react";
import React from "react";

import { useTriglit } from "../../hooks/use-triglit.js";
import { TriglitProvider } from "../../provider/triglit-provider.js";
import { TriglitDegraded } from "./triglit-degraded.js";

const meta = {
	component: TriglitDegraded,
	title: "Components/Status/TriglitDegraded",
	tags: ["autodocs"],
} satisfies Meta<typeof TriglitDegraded>;

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

const Wrapper = ({
	children,
	initialStatus = "degraded",
}: {
	children: React.ReactNode;
	initialStatus?: "healthy" | "degraded" | "error" | "loading";
}) => {
	const { setApiStatus } = useTriglit();

	React.useEffect(() => {
		setApiStatus(initialStatus);
	}, [setApiStatus, initialStatus]);

	return <>{children}</>;
};

export const Default: Story = {
	args: {
		children: (
			<div className="tg:flex tg:flex-col tg:items-center tg:justify-center tg:gap-4 tg:rounded-lg tg:border tg:border-warning tg:bg-warning/10 tg:p-6">
				<AlertTriangle className="tg:h-8 tg:w-8 tg:text-warning" />
				<div className="tg:text-center">
					<h3 className="tg:font-semibold tg:text-foreground tg:text-lg">
						API Degraded
					</h3>
					<p className="tg:mt-2 tg:text-muted-foreground tg:text-sm">
						The Triglit API is currently experiencing issues. Some
						features may not work correctly.
					</p>
				</div>
			</div>
		),
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<TriglitProvider
					config={{
						apiKey: "pk_test_example_key_12345",
					}}
				>
					<Wrapper initialStatus="degraded">
						<Story />
					</Wrapper>
				</TriglitProvider>
			</QueryClientProvider>
		),
	],
};

export const WithCustomContent: Story = {
	args: {
		children: (
			<div className="tg:rounded-lg tg:border tg:border-warning tg:bg-warning/10 tg:p-4">
				<p className="tg:text-warning">
					A API está com desempenho reduzido. Algumas funcionalidades
					podem estar indisponíveis.
				</p>
			</div>
		),
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<TriglitProvider
					config={{
						apiKey: "pk_test_example_key_12345",
					}}
				>
					<Wrapper initialStatus="degraded">
						<Story />
					</Wrapper>
				</TriglitProvider>
			</QueryClientProvider>
		),
	],
};

export const HiddenWhenHealthy: Story = {
	args: {
		children: (
			<div className="tg:rounded-lg tg:border tg:border-warning tg:bg-warning/10 tg:p-4">
				<p>Este conteúdo não deve aparecer</p>
			</div>
		),
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<TriglitProvider
					config={{
						apiKey: "pk_test_example_key_12345",
					}}
				>
					<Wrapper initialStatus="healthy">
						<div className="tg:space-y-4">
							<p className="tg:text-foreground">
								Status: healthy (componente não deve aparecer)
							</p>
							<Story />
						</div>
					</Wrapper>
				</TriglitProvider>
			</QueryClientProvider>
		),
	],
};
