/**
 * English translations for the Triglit SDK
 */
export const en = {
	// Workflow Editor
	"workflow.editor.title": "Workflow Editor",
	"workflow.editor.save": "Save",
	"workflow.editor.saveChanges": "Save Changes",
	"workflow.editor.saveVersion": "Save Version",
	"workflow.editor.createVersion": "Create Version",
	"workflow.editor.createNewVersion": "Create New Version",
	"workflow.editor.saving": "Saving...",
	"workflow.editor.unsavedChanges": "You have unsaved changes",
	"workflow.editor.loading": "Loading workflow...",
	"workflow.editor.components": "Components",
	"workflow.editor.nodes": "Nodes",
	"workflow.editor.triggers": "Triggers",
	"workflow.editor.addNode": "Add Node",
	"workflow.editor.addTrigger": "Add Trigger",
	"workflow.editor.configNode": "Configure Node",
	"workflow.editor.noSavedVersion": "No saved version",
	"workflow.editor.version": "Version {{version}}",
	"workflow.editor.noNodes": "No nodes",
	"workflow.editor.noNodesDescription": "Register a node to get started",
	"workflow.editor.noNodesAvailable": "No nodes available",
	"workflow.editor.addNodeAria": "Add {{name}} node",
	"workflow.editor.addTriggerAria": "Add {{type}} trigger",
	"workflow.editor.triggerOfType": "Trigger of type {{type}}",
	"workflow.editor.publishVersion": "Publish this version to make it active",
	"workflow.editor.publishVersionAria": "Publish version",
	"workflow.editor.configureNode": "Configure node",
	// Node Config Dialog
	"node.config.title": "Configure Node",
	"node.config.customName": "Custom Name",
	"node.config.customNameDescription":
		"A friendly, human-readable name for this node. This will be displayed in the workflow editor instead of the default node name.",
	"node.config.customId": "Custom ID",
	"node.config.customIdDescription":
		"A unique identifier for this node. This ID is used to reference the node in your code and must be unique across all nodes in the workflow.",
	"node.config.customNameRequired": "Custom name is required",
	"node.config.customIdRequired": "Custom ID is required",
	"node.config.customIdInUse": "This ID is already in use",
	"node.config.configuration": "Configuration ({{nodeType}})",
	"node.config.advancedConfig":
		"Advanced configuration options will be available in a future update.",
	"node.config.cancel": "Cancel",
	"node.config.save": "Save",
	"node.config.fieldRequired": "{{field}} is required",
	"node.config.fieldMin": "{{field}} must be at least {{min}}",
	"node.config.fieldMax": "{{field}} must be at most {{max}}",
	"node.config.fieldMinLength":
		"{{field}} must have at least {{minLength}} characters",
	"node.config.fieldMaxLength":
		"{{field}} must have at most {{maxLength}} characters",
	// Status
	"status.degraded.title": "API Degraded",
	"status.degraded.description":
		"The Triglit API is currently experiencing issues. Some features may not work correctly.",
	"status.error.title": "Error",
	"status.error.description":
		"An error occurred while connecting to the Triglit API.",
	"status.loading": "Loading...",
};
