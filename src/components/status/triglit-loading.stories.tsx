import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import React from "react";

import { useTriglit } from "../../hooks/use-triglit.js";
import { TriglitProvider } from "../../provider/triglit-provider.js";
import { TriglitLoading } from "./triglit-loading.js";

const meta = {
	component: TriglitLoading,
	title: "Components/Status/TriglitLoading",
	tags: ["autodocs"],
} satisfies Meta<typeof TriglitLoading>;

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
	initialStatus = "loading",
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
			<div className="tg:flex tg:flex-col tg:items-center tg:justify-center tg:gap-4 tg:p-6">
				<Loader2Icon className="tg:h-6 tg:w-6 tg:animate-spin tg:text-muted-foreground" />
				<p className="tg:text-muted-foreground tg:text-sm">
					Loading...
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
					<Wrapper initialStatus="loading">
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
			<div className="tg:flex tg:items-center tg:gap-2 tg:p-4">
				<Loader2Icon className="tg:h-4 tg:w-4 tg:animate-spin" />
				<p>Carregando dados...</p>
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
					<Wrapper initialStatus="loading">
						<Story />
					</Wrapper>
				</TriglitProvider>
			</QueryClientProvider>
		),
	],
};

export const DifferentSizes: Story = {
	args: {
		children: (
			<div className="tg:space-y-4 tg:p-4">
				<TriglitLoading>
					<div className="tg:flex tg:items-center tg:gap-2">
						<Loader2Icon className="tg:h-4 tg:w-4 tg:animate-spin" />
						<p className="tg:text-sm">Small</p>
					</div>
				</TriglitLoading>
				<TriglitLoading>
					<div className="tg:flex tg:items-center tg:gap-2">
						<Loader2Icon className="tg:h-6 tg:w-6 tg:animate-spin" />
						<p>Medium</p>
					</div>
				</TriglitLoading>
				<TriglitLoading>
					<div className="tg:flex tg:items-center tg:gap-2">
						<Loader2Icon className="tg:h-8 tg:w-8 tg:animate-spin" />
						<p className="tg:text-lg">Large</p>
					</div>
				</TriglitLoading>
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
					<Wrapper initialStatus="loading">
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
			<div className="tg:flex tg:items-center tg:gap-2 tg:p-4">
				<Loader2Icon className="tg:animate-spin" />
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
