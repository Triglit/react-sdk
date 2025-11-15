"use client";

import { CheckIcon, ChevronDownIcon, RocketIcon } from "lucide-react";

import { useI18n } from "../../hooks/use-i18n.js";
import type { WorkflowVersion } from "../../types/index.js";
import { Button } from "../../ui/components/button.js";
import {
	Menu,
	MenuItem,
	MenuPopup,
	MenuTrigger,
} from "../../ui/components/menu.js";
import {
	Tooltip,
	TooltipPopup,
	TooltipProvider,
	TooltipTrigger,
} from "../../ui/components/tooltip.js";

/**
 * Props for WorkflowEditorHeader component
 */
export interface WorkflowEditorHeaderProps {
	/**
	 * List of workflow versions
	 */
	versions?: WorkflowVersion[];
	/**
	 * Currently selected version ID
	 */
	selectedVersionId?: string;
	/**
	 * Current version data (full version object)
	 */
	currentVersion?: WorkflowVersion;
	/**
	 * Callback when a version is selected
	 */
	onSelectVersion: (versionId: string) => void;
	/**
	 * Callback when create version button is clicked
	 */
	onCreateVersion: () => void;
	/**
	 * Callback when save button is clicked
	 */
	onSave: () => void;
	/**
	 * Callback when publish button is clicked
	 */
	onPublishVersion?: () => void;
	/**
	 * Whether save is in progress
	 */
	isSaving?: boolean;
	/**
	 * Whether publish is in progress
	 */
	isPublishing?: boolean;
	/**
	 * Whether save button is disabled
	 */
	disabled?: boolean;
	/**
	 * Custom className for the header container
	 */
	className?: string;
}

/**
 * Workflow editor header component with version management
 *
 * @example
 * ```tsx
 * <WorkflowEditorHeader
 *   versions={versions}
 *   selectedVersionId={selectedVersionId}
 *   currentVersion={currentVersion}
 *   onSelectVersion={handleSelectVersion}
 *   onCreateVersion={handleCreateVersion}
 *   onSave={handleSave}
 *   isSaving={isSaving}
 * />
 * ```
 */
export function WorkflowEditorHeader({
	versions = [],
	selectedVersionId,
	currentVersion,
	onSelectVersion,
	onCreateVersion,
	onSave,
	onPublishVersion,
	isSaving = false,
	isPublishing = false,
	disabled = false,
	className,
}: WorkflowEditorHeaderProps) {
	const t = useI18n();
	const hasSelectedVersion = !!selectedVersionId;
	const versionDisplayText = currentVersion
		? t("workflow.editor.version", { version: currentVersion.version })
		: t("workflow.editor.noSavedVersion");
	const isCurrentVersionPublished =
		currentVersion?.isActive && currentVersion?.publishedAt;

	return (
		<div className={className}>
			{/* Menu on the left */}
			<Menu>
				<MenuTrigger
					render={
						<Button variant="outline" size="sm">
							{versionDisplayText}
							<ChevronDownIcon />
						</Button>
					}
				/>
				<MenuPopup>
					{versions.length > 0 && (
						<>
							{versions.map((version) => {
								const isPublished =
									version.isActive && version.publishedAt;
								return (
									<MenuItem
										key={version.id}
										onClick={() =>
											onSelectVersion(version.id)
										}
										className={
											selectedVersionId === version.id
												? "tg:bg-accent"
												: ""
										}
									>
										<span className="tg:flex tg:flex-1 tg:items-center tg:justify-between">
											<span>
												{t("workflow.editor.version", {
													version: version.version,
												})}
												{selectedVersionId ===
													version.id && " ✓"}
											</span>
											{isPublished && (
												<CheckIcon className="tg:size-4 tg:text-muted-foreground" />
											)}
										</span>
									</MenuItem>
								);
							})}
							{hasSelectedVersion && (
								<MenuItem onClick={onCreateVersion}>
									{t("workflow.editor.createNewVersion")}
								</MenuItem>
							)}
						</>
					)}
					{versions.length === 0 && !hasSelectedVersion && (
						<MenuItem onClick={onCreateVersion}>
							{t("workflow.editor.createVersion")}
						</MenuItem>
					)}
				</MenuPopup>
			</Menu>

			{/* Buttons on the right */}
			<div className="tg:flex tg:items-center tg:gap-2">
				{hasSelectedVersion &&
					!isCurrentVersionPublished &&
					onPublishVersion && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Button
										size="icon-sm"
										variant="outline"
										onClick={onPublishVersion}
										disabled={disabled || isPublishing}
										aria-label={t(
											"workflow.editor.publishVersionAria",
										)}
									>
										<RocketIcon className="tg:size-4" />
									</Button>
								</TooltipTrigger>
								<TooltipPopup>
									{t("workflow.editor.publishVersion")}
								</TooltipPopup>
							</Tooltip>
						</TooltipProvider>
					)}
				{hasSelectedVersion ? (
					<Button
						size="sm"
						onClick={onSave}
						disabled={disabled || isSaving}
					>
						{isSaving
							? t("workflow.editor.saving")
							: t("workflow.editor.saveVersion")}
					</Button>
				) : (
					<Button
						size="sm"
						onClick={onCreateVersion}
						disabled={disabled || isSaving}
					>
						{t("workflow.editor.createVersion")}
					</Button>
				)}
			</div>
		</div>
	);
}
