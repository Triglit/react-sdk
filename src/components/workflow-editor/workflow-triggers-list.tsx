"use client";

import type { ReactNode } from "react";

import { useI18n } from "../../hooks/use-i18n.js";
import type { TriggerType } from "../../types/index.js";

/**
 * Props for WorkflowTriggersList component
 */
export interface WorkflowTriggersListProps {
	/**
	 * Available trigger types to display
	 */
	triggerTypes?: TriggerType[];
	/**
	 * Callback when a trigger is clicked to add
	 */
	onAddTrigger: (triggerType: TriggerType) => void;
	/**
	 * Render function for each trigger item
	 * @param triggerType - The trigger type
	 * @param onAdd - Callback to add the trigger
	 */
	renderTrigger?: (triggerType: TriggerType, onAdd: () => void) => ReactNode;
	/**
	 * Custom className for the container
	 */
	className?: string;
	/**
	 * Custom className for the list container
	 */
	listClassName?: string;
}

/**
 * Unstyled component for rendering a list of available triggers
 * This component provides the structure and logic but no styling,
 * allowing clients to build their own custom layouts
 *
 * @example
 * ```tsx
 * <WorkflowTriggersList
 *   triggerTypes={["event", "schedule", "webhook", "queue"]}
 *   onAddTrigger={(type) => handleAddTrigger(type)}
 *   renderTrigger={(type, onAdd) => (
 *     <button onClick={onAdd}>{type}</button>
 *   )}
 * />
 * ```
 */
export function WorkflowTriggersList({
	triggerTypes = ["event", "schedule", "webhook", "queue"],
	onAddTrigger,
	renderTrigger,
	className,
	listClassName,
}: WorkflowTriggersListProps) {
	const t = useI18n();

	const defaultRenderTrigger = (triggerType: TriggerType) => (
		<button
			type="button"
			onClick={() => onAddTrigger(triggerType)}
			aria-label={t("workflow.editor.addTriggerAria", {
				type: triggerType,
			})}
		>
			{triggerType.charAt(0).toUpperCase() + triggerType.slice(1)}
		</button>
	);

	return (
		<div className={className}>
			<div className={listClassName}>
				{triggerTypes.map((triggerType) => (
					<div key={triggerType}>
						{renderTrigger
							? renderTrigger(triggerType, () =>
									onAddTrigger(triggerType),
								)
							: defaultRenderTrigger(triggerType)}
					</div>
				))}
			</div>
		</div>
	);
}
