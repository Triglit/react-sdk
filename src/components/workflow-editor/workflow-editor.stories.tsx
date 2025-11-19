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
					apiKey: import.meta.env.VITE_TRIGLIT_PUBLISHABLE_KEY,
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

export const WithDynamicEnumOptions: Story = {
	args: {
		workflowId: "wf_test_123",
		dynamicEnumOptions: (fieldName, nodeType) => {
			console.log(fieldName, nodeType);
			// Simula o caso de uso "Distribuir Agente"
			if (nodeType === "distribute-agent") {
				// Simula uma lista de agentes/usuários
				return [
					{ label: "João Silva", value: "agent_1" },
					{ label: "Maria Santos", value: "agent_2" },
					{ label: "Pedro Costa", value: "agent_3" },
					{ label: "Ana Oliveira", value: "agent_4" },
					{ label: "Carlos Souza", value: "agent_5" },
				];
			}

			// Exemplo para outro tipo de node
			if (nodeType === "assign-task" && fieldName === "assignee") {
				return [
					{ label: "Equipe de Desenvolvimento", value: "team_dev" },
					{ label: "Equipe de Suporte", value: "team_support" },
					{ label: "Equipe de Vendas", value: "team_sales" },
				];
			}

			// Retorna undefined para campos não dinâmicos ou sem opções
			return undefined;
		},
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
	parameters: {
		docs: {
			description: {
				story:
					"Demonstra o uso de `dynamicEnumOptions` para fornecer opções dinâmicas para campos enum marcados como dinâmicos. " +
					"Quando um custom node tem um campo enum com `dynamic: true`, o callback é chamado com o nome do campo e o tipo do node. " +
					"Se o callback retornar opções, elas serão exibidas em um select. Se retornar `undefined` ou array vazio, o campo será renderizado como texto livre.",
			},
		},
	},
};
