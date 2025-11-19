"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position, useUpdateNodeInternals } from "@xyflow/react";
import { SettingsIcon } from "lucide-react";
import { useEffect, useMemo } from "react";

import { useI18n } from "../../../hooks/use-i18n.js";
import type { NodeData } from "../../../types/index.js";
import { Button } from "../../../ui/components/button.js";
import { Card } from "../../../ui/components/card.js";
import { cn } from "../../../ui/lib/utils.js";
import { getNodeBranches } from "../utils/node-branches.js";

/**
 * Props for BranchNode (nodes with multiple output branches)
 */
export interface BranchNodeProps extends NodeProps<Node<NodeData>> {
	/**
	 * Callback when config button is clicked
	 */
	onConfigClick?: (nodeId: string, data: NodeData) => void;
}

/**
 * Branch node component (for nodes with multiple output branches like condition, switch)
 * These nodes have input handle (left) and multiple output handles (right) for different branches
 *
 * @example
 * ```tsx
 * <BranchNode
 *   id="node-1"
 *   data={nodeData}
 *   onConfigClick={(id, data) => openConfig(id, data)}
 * />
 * ```
 */
export function BranchNode({ id, data, onConfigClick }: BranchNodeProps) {
	const t = useI18n();
	const updateNodeInternals = useUpdateNodeInternals();
	const hasConfigSchema =
		data.configSchema && Object.keys(data.configSchema).length > 0;

	const branches = useMemo(() => {
		return getNodeBranches(data) || [];
	}, [data.type, data]);

	// Serialize branch IDs to detect changes
	const _branchIds = useMemo(
		() => branches.map((b) => b.id).join(","),
		[branches],
	);

	// Update node internals when branches change (for dynamic handles)
	// This is critical for React Flow to recognize new/removed handles
	useEffect(() => {
		updateNodeInternals(id);
	}, [id, updateNodeInternals]);

	return (
		<Card
			className={cn(
				"tg:group tg:relative tg:min-h-[70px] tg:min-w-[220px] tg:px-3 tg:py-2 tg:duration-150 tg:hover:shadow-lg",
			)}
		>
			<header className="tg:flex tg:w-full tg:items-center tg:justify-between tg:gap-2">
				<div className="tg:flex tg:flex-col tg:overflow-hidden">
					<div className="tg:flex tg:items-center tg:gap-2">
						<h2 className="tg:wrap-break-word tg:font-medium tg:text-foreground">
							{data.customName || data.name}
						</h2>
						<span className="tg:font-mono tg:text-[10px] tg:text-muted-foreground">
							({data.type})
						</span>
					</div>
					<h3 className="tg:text-muted-foreground tg:text-xs">
						{data.customId || id}
					</h3>
				</div>
				{hasConfigSchema && onConfigClick && (
					<Button
						variant="ghost"
						size="icon"
						className="tg:size-7 tg:shrink-0 tg:opacity-0 tg:transition-opacity tg:group-hover:opacity-100"
						onClick={(e) => {
							e.stopPropagation();
							onConfigClick(id, data);
						}}
						title={t("workflow.editor.configureNode")}
					>
						<SettingsIcon className="tg:size-4 tg:text-muted-foreground" />
					</Button>
				)}
			</header>
			{/* Input handle on the left */}
			<Handle
				type="target"
				position={Position.Left}
				className="tg:h-4! tg:w-2! tg:bg-border!"
				style={{
					borderRadius: "3px",
				}}
			/>
			{/* Multiple output handles on the right, vertically distributed */}
			{branches.map((branch, index) => {
				const totalBranches = branches.length;
				// Calculate vertical position: distribute evenly from top to bottom
				// Position is a percentage (0-100) from top
				const topPercent =
					totalBranches === 1
						? 50
						: (index / (totalBranches - 1)) * 80 + 10; // 10% to 90% of height

				return (
					<Handle
						key={branch.id}
						type="source"
						position={Position.Right}
						id={branch.id}
						className="tg:size-3! tg:bg-border!"
						style={{
							top: `${topPercent}%`,
						}}
					/>
				);
			})}
			{/* Labels for branches - positioned relative to the Card */}
			{branches.map((branch, index) => {
				const totalBranches = branches.length;
				const topPercent =
					totalBranches === 1
						? 50
						: (index / (totalBranches - 1)) * 80 + 10;

				return (
					<div
						key={`${branch.id}-label`}
						className="tg:absolute tg:right-4 tg:whitespace-nowrap tg:rounded-md tg:bg-background tg:px-1.5 tg:py-0.5 tg:font-medium tg:text-[10px] tg:text-muted-foreground tg:opacity-0 tg:transition-opacity tg:group-hover:opacity-100"
						style={{
							pointerEvents: "none",
							top: `${topPercent}%`,
							transform: "translateY(-50%)",
						}}
					>
						{branch.label}
					</div>
				);
			})}
		</Card>
	);
}
