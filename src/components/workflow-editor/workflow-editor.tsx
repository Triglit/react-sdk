"use client";

import {
	addEdge,
	type Edge,
	getOutgoers,
	type IsValidConnection,
	type Node,
	type OnConnect,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import { DatabaseIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { useWorkflowVersions } from "../../hooks/api/use-workflow-versions.js";
import { useI18n } from "../../hooks/use-i18n.js";
import type {
	NodeData,
	Trigger,
	TriggersListResponse,
	WorkflowEditorProps,
	WorkflowVersion,
} from "../../types/index.js";
import { Card, CardDescription, CardTitle } from "../../ui/components/card.js";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../../ui/components/empty.js";
import {
	Frame,
	FrameHeader,
	FramePanel,
	FrameTitle,
} from "../../ui/components/frame.js";
import { ScrollArea } from "../../ui/components/scroll-area.js";
import { cn } from "../../ui/lib/utils.js";
import {
	convertTriggerConfigToApi,
	getTriggerConfigSchemas,
} from "../../utils/trigger-config-converter.js";
import { useNodesRegistry } from "./hooks/use-nodes-registry.js";
import { useTriggersEditor } from "./hooks/use-triggers.js";
import { useWorkflowVersionEditor } from "./hooks/use-workflow-version.js";
import { NodeConfigDialog } from "./node-config-dialog.js";
import { WorkflowCanvas } from "./workflow-canvas.js";
import { WorkflowEditorHeader } from "./workflow-editor-header.js";
import {
	type NodeRegistryItem,
	WorkflowNodesList,
} from "./workflow-nodes-list.js";
import { WorkflowTriggersList } from "./workflow-triggers-list.js";

/**
 * WorkflowEditor - Main component for editing workflows
 *
 * @example
 * ```tsx
 * <TriglitProvider config={{ apiKey: 'pk_...' }}>
 *   <WorkflowEditor workflowId="workflow-123" />
 * </TriglitProvider>
 * ```
 */
export function WorkflowEditor({
	workflowId,
	initialVersionId,
	onSave,
	className,
}: WorkflowEditorProps) {
	const [nodes, setNodes, onNodesChange] = useNodesState<Node<NodeData>>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
	const { getNodes, getEdges } = useReactFlow();
	const [selectedVersionId, setSelectedVersionId] = useState<
		string | undefined
	>(initialVersionId);

	const [configState, setConfigState] = useState<{
		open: boolean;
		nodeId: string | null;
		nodeName: string;
		nodeType: string;
		configSchema: Record<string, unknown>;
		currentConfig: Record<string, unknown>;
	}>({
		open: false,
		nodeId: null,
		nodeName: "",
		nodeType: "",
		configSchema: {},
		currentConfig: {},
	});

	// Fetch nodes registry
	const { data: nodeRegistry } = useNodesRegistry();

	// Fetch workflow versions list
	const { data: versionsData } = useWorkflowVersions({
		workflowId,
		enabled: true,
		pageSize: 100,
	});

	// Fetch workflow version
	const {
		version,
		isLoading: isLoadingVersion,
		createVersionAsync,
		updateVersionAsync,
		publishVersionAsync,
		isCreating,
		isUpdating,
		isPublishing,
	} = useWorkflowVersionEditor(selectedVersionId, workflowId);

	// Fetch triggers
	const {
		triggers,
		createTriggerAsync,
		updateTriggerAsync,
		deleteTriggerAsync,
	} = useTriggersEditor(selectedVersionId);

	// Sync selectedVersionId with initialVersionId when it changes
	useEffect(() => {
		if (initialVersionId !== undefined) {
			setSelectedVersionId(initialVersionId);
		}
	}, [initialVersionId]);

	// Auto-select version: published first, then most recent
	useEffect(() => {
		// Only auto-select if no version is currently selected and versions are loaded
		if (versionsData?.data.length === 0 || selectedVersionId) {
			return;
		}

		// If initialVersionId is provided, don't auto-select
		if (initialVersionId !== undefined) {
			return;
		}

		// Find published version (isActive: true and publishedAt defined)
		const publishedVersion = versionsData?.data.find(
			(v) => v.isActive && v.publishedAt,
		);

		if (publishedVersion) {
			setSelectedVersionId(publishedVersion.id);
			return;
		}

		// If no published version, find the most recent one
		// Sort by version number (descending) or createdAt (descending)
		const mostRecentVersion = [...(versionsData?.data || [])].sort(
			(a, b) => {
				// First try to sort by version number (higher is more recent)
				if (b.version !== a.version) {
					return b.version - a.version;
				}
				// If version numbers are equal, sort by createdAt
				return (
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				);
			},
		)[0];

		if (mostRecentVersion) {
			setSelectedVersionId(mostRecentVersion.id);
		}
	}, [versionsData?.data, initialVersionId, selectedVersionId]);

	// Load version data into editor
	useEffect(() => {
		const versionData = version as WorkflowVersion | undefined;
		const triggersData = triggers as TriggersListResponse | undefined;

		if (versionData?.nodes && versionData.edges) {
			const triggerConfigSchemas = getTriggerConfigSchemas();
			const triggersList = triggersData?.triggers || [];

			const triggersMap = new Map<string, Trigger>(
				triggersList.map((trigger: Trigger) => [trigger.id, trigger]),
			);

			const flowNodes = versionData.nodes.map((node) => {
				const isTrigger = node.type.startsWith("trigger_");
				const nodeType = isTrigger ? "oneWayRight" : "twoWay";

				let configSchema: Record<string, unknown> = {};
				if (isTrigger) {
					configSchema = triggerConfigSchemas[node.type] || {};
				} else {
					configSchema =
						nodeRegistry?.nodes.find((n) => n.type === node.type)
							?.configSchema || {};
				}

				let triggerId: string | undefined;
				if (isTrigger) {
					const savedTriggerId = (
						node.config as Record<string, unknown>
					)?._triggerId as string | undefined;

					if (savedTriggerId && triggersMap.has(savedTriggerId)) {
						triggerId = savedTriggerId;
					} else {
						const matchingTrigger = triggersList.find(
							(t: Trigger) =>
								t.name === node.name &&
								t.type === node.type.replace("trigger_", ""),
						);
						if (matchingTrigger) {
							triggerId = matchingTrigger.id;
						}
					}
				}

				return {
					id: node.id,
					type: nodeType,
					position: node.position ?? { x: 0, y: 0 },
					data: {
						type: node.type,
						version: node.version,
						name: node.name,
						description: node.description,
						config: node.config,
						inputSchema: node.inputSchema,
						outputSchema: node.outputSchema,
						isBuiltIn:
							nodeRegistry?.nodes.find(
								(n) => n.type === node.type,
							)?.isBuiltIn || isTrigger,
						configSchema,
						canPause: node.canPause,
						customName: (node.config as Record<string, unknown>)
							?._customName as string | undefined,
						customId: (node.config as Record<string, unknown>)
							?._customId as string | undefined,
						_triggerId: triggerId,
					},
				};
			});

			const flowEdges = versionData.edges.map((edge) => ({
				id: edge.id,
				source: edge.sourceNodeId,
				target: edge.targetNodeId,
				sourceHandle: edge.sourceOutputKey,
				targetHandle: edge.targetInputKey,
				label: edge.label,
			}));

			setNodes(flowNodes);
			setEdges(flowEdges);
		}
	}, [version, triggers, setNodes, setEdges, nodeRegistry?.nodes]);

	const addNode = useCallback(
		(type: string) => {
			const node = nodeRegistry?.nodes.find((n) => n.type === type);
			if (!node) {
				return;
			}

			const maxPositionX = 50;
			const maxPositionY = 50;
			const flowNode: Node<NodeData> = {
				id: crypto.randomUUID(),
				type: "twoWay",
				position: {
					x: Math.floor(Math.random() * (maxPositionX + 1)),
					y: Math.floor(Math.random() * (maxPositionY + 1)),
				},
				data: {
					...node,
				},
			};
			setNodes((prev) => [...prev, flowNode]);
		},
		[nodeRegistry, setNodes],
	);

	const addTrigger = useCallback(
		(triggerType: string) => {
			const maxPositionX = 50;
			const maxPositionY = 50;

			const triggerConfigSchemas = getTriggerConfigSchemas();
			const triggerFullType = `trigger_${triggerType}`;

			const triggerData: NodeData = {
				type: triggerFullType,
				version: "1.0.0",
				name: `Trigger ${triggerType.charAt(0).toUpperCase() + triggerType.slice(1)}`,
				description: `Trigger of type ${triggerType}`,
				config: {},
				inputSchema: {},
				outputSchema: {},
				isBuiltIn: true,
				configSchema: triggerConfigSchemas[triggerFullType] || {},
				canPause: false,
			};

			const flowNode: Node<NodeData> = {
				id: crypto.randomUUID(),
				type: "oneWayRight",
				position: {
					x: Math.floor(Math.random() * (maxPositionX + 1)),
					y: Math.floor(Math.random() * (maxPositionY + 1)),
				},
				data: triggerData,
			};
			setNodes((prev) => [...prev, flowNode]);
		},
		[setNodes],
	);

	const onConnect: OnConnect = useCallback(
		(params) => {
			const targetNode = getNodes().find((n) => n.id === params.target);

			if (targetNode?.type === "oneWayRight") {
				return;
			}

			const incomingCount = edges.filter(
				(e) => e.target === params.target,
			).length;

			if (incomingCount >= 1) {
				return;
			}

			const outgoingCount = edges.filter(
				(e) => e.source === params.source,
			).length;

			if (outgoingCount >= 1) {
				return;
			}

			setEdges((snapshot) => addEdge(params, snapshot));
		},
		[edges, setEdges, getNodes],
	);

	const isValidConnection: IsValidConnection = useCallback(
		(connection) => {
			const nodes = getNodes();
			const edges = getEdges();
			const target = nodes.find((node) => node.id === connection.target);

			if (target?.type === "oneWayRight") {
				return false;
			}

			const hasCycle = (node: Node, visited = new Set<string>()) => {
				if (visited.has(node.id)) return false;

				visited.add(node.id);

				for (const outgoer of getOutgoers(node, nodes, edges)) {
					if (outgoer.id === connection.source) return true;
					if (hasCycle(outgoer, visited)) return true;
				}
			};

			if (target?.id === connection.source) return false;
			return !hasCycle(target as Node);
		},
		[getNodes, getEdges],
	);

	const handleSave = useCallback(async () => {
		const triggerNodes = nodes.filter((node) =>
			node.data.type.startsWith("trigger_"),
		);

		const versionNodes = nodes.map((node) => {
			const nodeConfig = (node.data.config || {}) as Record<
				string,
				unknown
			>;
			if (node.data._triggerId) {
				nodeConfig._triggerId = node.data._triggerId;
			}
			return {
				id: node.id,
				type: node.data.type,
				version: node.data.version || "1.0.0",
				name: node.data.name,
				description: node.data.description,
				config: nodeConfig,
				inputSchema: node.data.inputSchema || {},
				outputSchema: node.data.outputSchema || {},
				position: node.position,
			};
		});

		const versionEdges = edges.map((edge) => ({
			sourceNodeId: edge.source,
			targetNodeId: edge.target,
			sourceOutputKey: edge.sourceHandle || undefined,
			targetInputKey: edge.targetHandle || undefined,
			label: (edge.label || undefined) as string | undefined,
		}));

		let savedVersionId = selectedVersionId;
		if (!selectedVersionId) {
			try {
				const newVersion = (await createVersionAsync({
					workflowId,
					nodes: versionNodes,
					edges: versionEdges,
				})) as WorkflowVersion;
				savedVersionId = newVersion.id;
				// Automatically select the newly created version
				setSelectedVersionId(newVersion.id);
			} catch (error) {
				console.error("Error creating version:", error);
				return;
			}
		} else {
			try {
				await updateVersionAsync({
					versionId: selectedVersionId,
					nodes: versionNodes,
					edges: versionEdges,
				});
			} catch (error) {
				console.error("Error updating version:", error);
				return;
			}
		}

		if (!savedVersionId) return;

		const triggersData = triggers as TriggersListResponse | undefined;
		const existingTriggers = triggersData?.triggers || [];
		const existingTriggersMap = new Map<string, Trigger>(
			existingTriggers.map((t: Trigger) => [t.id, t]),
		);

		const triggerPromises = triggerNodes
			.filter((node) => {
				const triggerId = node.data._triggerId;
				if (!triggerId && !savedVersionId) {
					return false;
				}
				return true;
			})
			.map(async (node) => {
				const triggerType = node.data.type.replace("trigger_", "");
				const visualConfig = (node.data.config || {}) as Record<
					string,
					unknown
				>;
				const triggerId = node.data._triggerId;

				const apiConfig = convertTriggerConfigToApi(
					node.data.type,
					visualConfig,
				);
				const triggerName = (node.data.customName ||
					node.data.name) as string;

				if (triggerId && existingTriggersMap.has(triggerId)) {
					try {
						await updateTriggerAsync({
							triggerId,
							name: triggerName,
							config: apiConfig,
						});
					} catch (error) {
						console.error("Error updating trigger:", error);
						throw error;
					}
				} else if (savedVersionId) {
					try {
						const newTrigger = (await createTriggerAsync({
							workflowVersionId: savedVersionId,
							name: triggerName,
							type: triggerType as "schedule" | "webhook",
							config: apiConfig,
						})) as Trigger;

						setNodes((prevNodes) =>
							prevNodes.map((n) =>
								n.id === node.id
									? {
											...n,
											data: {
												...n.data,
												_triggerId: newTrigger.id,
												config: {
													...visualConfig,
													_triggerId: newTrigger.id,
												},
											},
										}
									: n,
							),
						);
					} catch (error) {
						console.error("Error creating trigger:", error);
						throw error;
					}
				}
			});

		const currentTriggerIds = new Set(
			triggerNodes
				.map((n) => n.data._triggerId)
				.filter((id): id is string => !!id),
		);

		const triggersToDelete = existingTriggers.filter(
			(t: Trigger) => !currentTriggerIds.has(t.id),
		);

		const deletePromises = triggersToDelete.map(
			async (trigger: Trigger) => {
				try {
					await deleteTriggerAsync(trigger.id);
				} catch (error) {
					console.error("Error deleting trigger:", error);
					throw error;
				}
			},
		);

		try {
			await Promise.all([...triggerPromises, ...deletePromises]);
			if (onSave && savedVersionId) {
				onSave(savedVersionId);
			}
		} catch (error) {
			console.error("Error syncing triggers:", error);
		}
	}, [
		nodes,
		edges,
		selectedVersionId,
		workflowId,
		triggers,
		createVersionAsync,
		updateVersionAsync,
		createTriggerAsync,
		updateTriggerAsync,
		deleteTriggerAsync,
		setNodes,
		onSave,
	]);

	const handleCreateVersion = useCallback(async () => {
		const versionNodes = nodes.map((node) => {
			const nodeConfig = (node.data.config || {}) as Record<
				string,
				unknown
			>;
			if (node.data._triggerId) {
				nodeConfig._triggerId = node.data._triggerId;
			}
			return {
				id: node.id,
				type: node.data.type,
				version: node.data.version || "1.0.0",
				name: node.data.name,
				description: node.data.description,
				config: nodeConfig,
				inputSchema: node.data.inputSchema || {},
				outputSchema: node.data.outputSchema || {},
				position: node.position,
			};
		});

		const versionEdges = edges.map((edge) => ({
			sourceNodeId: edge.source,
			targetNodeId: edge.target,
			sourceOutputKey: edge.sourceHandle || undefined,
			targetInputKey: edge.targetHandle || undefined,
			label: (edge.label || undefined) as string | undefined,
		}));

		try {
			const newVersion = (await createVersionAsync({
				workflowId,
				nodes: versionNodes,
				edges: versionEdges,
			})) as WorkflowVersion;
			// Automatically select the newly created version
			setSelectedVersionId(newVersion.id);
			if (onSave) {
				onSave(newVersion.id);
			}
		} catch (error) {
			console.error("Error creating version:", error);
		}
	}, [nodes, edges, workflowId, createVersionAsync, onSave]);

	const handleSelectVersion = useCallback((versionId: string) => {
		setSelectedVersionId(versionId);
	}, []);

	const handlePublishVersion = useCallback(async () => {
		if (!selectedVersionId) return;

		try {
			await publishVersionAsync(selectedVersionId);
		} catch (error) {
			console.error("Error publishing version:", error);
		}
	}, [selectedVersionId, publishVersionAsync]);

	const handleNodeConfigClick = useCallback(
		(nodeId: string, data: NodeData) => {
			setConfigState({
				open: true,
				nodeId,
				nodeName: data.customName || data.name,
				nodeType: data.type,
				configSchema: data.configSchema || {},
				currentConfig: (data.config || {}) as Record<string, unknown>,
			});
		},
		[],
	);

	const handleConfigSave = useCallback(
		(
			oldNodeId: string,
			config: Record<string, unknown>,
			customName: string,
			customId: string,
		) => {
			setNodes((nodes) =>
				nodes.map((node) =>
					node.id === oldNodeId
						? {
								...node,
								id: customId,
								data: {
									...node.data,
									customName,
									customId,
									config: {
										...config,
										_customName: customName,
										_customId: customId,
										_triggerId: node.data._triggerId,
									},
								},
							}
						: node,
				),
			);

			if (oldNodeId !== customId) {
				setEdges((edges) =>
					edges.map((edge) => ({
						...edge,
						source:
							edge.source === oldNodeId ? customId : edge.source,
						target:
							edge.target === oldNodeId ? customId : edge.target,
					})),
				);
			}

			setConfigState((prev) => ({ ...prev, open: false }));
		},
		[setNodes, setEdges],
	);

	const t = useI18n();

	if (isLoadingVersion) {
		return (
			<div
				className={cn(
					"tg:flex tg:h-full tg:items-center tg:justify-center",
					className,
				)}
			>
				<div className="tg:text-muted-foreground">
					{t("workflow.editor.loading")}
				</div>
			</div>
		);
	}

	return (
		<>
			<NodeConfigDialog
				open={configState.open}
				onOpenChange={(open) =>
					setConfigState((prev) => ({ ...prev, open }))
				}
				nodeId={configState.nodeId || ""}
				nodeName={configState.nodeName}
				nodeType={configState.nodeType}
				configSchema={configState.configSchema}
				currentConfig={configState.currentConfig}
				currentCustomName={
					nodes.find((n) => n.id === configState.nodeId)?.data
						.customName
				}
				currentCustomId={
					nodes.find((n) => n.id === configState.nodeId)?.data
						.customId ||
					configState.nodeId ||
					""
				}
				allNodeIds={nodes.map((n) => n.id)}
				onSave={handleConfigSave}
			/>

			<Frame className={cn("tg:flex tg:h-full tg:flex-col", className)}>
				<WorkflowEditorHeader
					versions={versionsData?.data}
					selectedVersionId={selectedVersionId}
					currentVersion={version as WorkflowVersion | undefined}
					onSelectVersion={handleSelectVersion}
					onCreateVersion={handleCreateVersion}
					onSave={handleSave}
					onPublishVersion={handlePublishVersion}
					isSaving={isCreating || isUpdating}
					isPublishing={isPublishing}
					disabled={isCreating || isUpdating || isPublishing}
					className="tg:flex tg:items-center tg:justify-between tg:border-border tg:border-b tg:px-4 tg:py-2"
				/>
				<div className="tg:flex tg:h-full tg:flex-row">
					<FrameHeader className="tg:flex tg:w-[270px] tg:flex-col tg:gap-3">
						<FrameTitle className="tg:whitespace-nowrap tg:font-medium">
							{t("workflow.editor.components")}
						</FrameTitle>
						<ScrollArea
							orientation="vertical"
							className="tg:flex tg:flex-col tg:gap-4 tg:overflow-y-auto"
						>
							{/* Triggers Section */}
							<div className="tg:flex tg:flex-col tg:gap-2">
								<span className="tg:font-medium tg:text-muted-foreground tg:text-xs tg:uppercase">
									{t("workflow.editor.triggers")}
								</span>
								<WorkflowTriggersList
									triggerTypes={["schedule", "webhook"]}
									onAddTrigger={addTrigger}
									listClassName="tg:flex tg:flex-col tg:gap-1.5"
									renderTrigger={(triggerType, onAdd) => (
										<Card
											className="tg:cursor-pointer tg:select-none tg:gap-1 tg:px-3 tg:py-2.5 tg:duration-200 tg:hover:bg-accent/40"
											role="button"
											onClick={onAdd}
										>
											<CardTitle className="tg:whitespace-nowrap tg:font-medium tg:text-base tg:text-foreground">
												{triggerType
													.charAt(0)
													.toUpperCase() +
													triggerType.slice(1)}
											</CardTitle>
											<CardDescription className="tg:truncate tg:text-muted-foreground tg:text-sm">
												{t(
													"workflow.editor.triggerOfType",
													{
														type: triggerType,
													},
												)}
											</CardDescription>
										</Card>
									)}
								/>
							</div>

							{/* Nodes Section */}
							<div className="tg:flex tg:flex-col tg:gap-2">
								<span className="tg:font-medium tg:text-muted-foreground tg:text-xs tg:uppercase">
									{t("workflow.editor.nodes")}
								</span>
								<WorkflowNodesList
									nodes={
										nodeRegistry?.nodes as
											| NodeRegistryItem[]
											| undefined
									}
									onAddNode={addNode}
									listClassName="tg:flex tg:flex-col tg:gap-1.5"
									renderEmpty={() => (
										<Empty>
											<EmptyHeader>
												<EmptyMedia variant="icon">
													<DatabaseIcon />
												</EmptyMedia>
												<EmptyTitle>
													{t(
														"workflow.editor.noNodes",
													)}
												</EmptyTitle>
												<EmptyDescription>
													{t(
														"workflow.editor.noNodesDescription",
													)}
												</EmptyDescription>
											</EmptyHeader>
										</Empty>
									)}
									renderNode={(node, onAdd) => (
										<Card
											className="tg:cursor-pointer tg:select-none tg:gap-1 tg:px-3 tg:py-2.5 tg:duration-200 tg:hover:bg-accent/40"
											role="button"
											onClick={onAdd}
										>
											<CardTitle className="tg:whitespace-nowrap tg:font-medium tg:text-base tg:text-foreground">
												{node.name}
											</CardTitle>
											<CardDescription className="tg:truncate tg:text-muted-foreground tg:text-sm">
												{node.description}
											</CardDescription>
										</Card>
									)}
								/>
							</div>
						</ScrollArea>
					</FrameHeader>
					<FramePanel className="tg:h-full tg:w-full tg:p-1!">
						<WorkflowCanvas
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onNodeConfigClick={handleNodeConfigClick}
							onConnect={onConnect}
							isValidConnection={isValidConnection}
							getNodes={() => getNodes() as Node<NodeData>[]}
							getEdges={getEdges}
						/>
					</FramePanel>
				</div>
			</Frame>
		</>
	);
}
