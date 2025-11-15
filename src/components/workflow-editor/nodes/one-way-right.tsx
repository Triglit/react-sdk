"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { SettingsIcon } from "lucide-react";

import { useI18n } from "../../../hooks/use-i18n.js";
import type { NodeData } from "../../../types/index.js";
import { Button } from "../../../ui/components/button.js";
import { Card } from "../../../ui/components/card.js";
import { cn } from "../../../ui/lib/utils.js";

/**
 * Props for OneWayRightNode (trigger nodes)
 */
export interface OneWayRightNodeProps extends NodeProps<Node<NodeData>> {
	/**
	 * Callback when config button is clicked
	 */
	onConfigClick?: (nodeId: string, data: NodeData) => void;
}

/**
 * One-way right node component (for triggers)
 * These nodes only have output handles (on the right)
 *
 * @example
 * ```tsx
 * <OneWayRightNode
 *   id="node-1"
 *   data={nodeData}
 *   onConfigClick={(id, data) => openConfig(id, data)}
 * />
 * ```
 */
export function OneWayRightNode({
	id,
	data,
	onConfigClick,
}: OneWayRightNodeProps) {
	const t = useI18n();
	const hasConfigSchema =
		data.configSchema && Object.keys(data.configSchema).length > 0;

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
			<Handle
				type="source"
				position={Position.Right}
				className="tg:size-3! tg:rounded-full! tg:bg-border!"
			/>
		</Card>
	);
}
