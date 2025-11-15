/**
 * Portuguese (Brazil) translations for the Triglit SDK
 */
import type { TranslationPackage } from "../../i18n.js";

export const ptBR: TranslationPackage = {
	// Workflow Editor
	"workflow.editor.title": "Editor de Workflow",
	"workflow.editor.save": "Salvar",
	"workflow.editor.saveChanges": "Salvar Alterações",
	"workflow.editor.saveVersion": "Salvar Versão",
	"workflow.editor.createVersion": "Criar Versão",
	"workflow.editor.createNewVersion": "Criar Nova Versão",
	"workflow.editor.saving": "Salvando...",
	"workflow.editor.unsavedChanges": "Você tem alterações não salvas",
	"workflow.editor.loading": "Carregando workflow...",
	"workflow.editor.components": "Componentes",
	"workflow.editor.nodes": "Nós",
	"workflow.editor.triggers": "Gatilhos",
	"workflow.editor.addNode": "Adicionar Nó",
	"workflow.editor.addTrigger": "Adicionar Gatilho",
	"workflow.editor.configNode": "Configurar Nó",
	"workflow.editor.noSavedVersion": "Nenhuma versão salva",
	"workflow.editor.version": "Versão {{version}}",
	"workflow.editor.noNodes": "Nenhum nó",
	"workflow.editor.noNodesDescription": "Registre um nó para começar",
	"workflow.editor.noNodesAvailable": "Nenhum nó disponível",
	"workflow.editor.addNodeAria": "Adicionar nó {{name}}",
	"workflow.editor.addTriggerAria": "Adicionar gatilho {{type}}",
	"workflow.editor.triggerOfType": "Gatilho do tipo {{type}}",
	"workflow.editor.publishVersion":
		"Publicar esta versão para torná-la ativa",
	"workflow.editor.publishVersionAria": "Publicar versão",
	"workflow.editor.configureNode": "Configurar nó",
	// Node Config Dialog
	"node.config.title": "Configurar Nó",
	"node.config.customName": "Nome Personalizado",
	"node.config.customId": "ID Personalizado",
	"node.config.customNameRequired": "Nome personalizado é obrigatório",
	"node.config.customIdRequired": "ID personalizado é obrigatório",
	"node.config.customIdInUse": "Este ID já está em uso",
	"node.config.configuration": "Configuração ({{nodeType}})",
	"node.config.advancedConfig":
		"Opções avançadas de configuração estarão disponíveis em uma atualização futura.",
	"node.config.cancel": "Cancelar",
	"node.config.save": "Salvar",
	"node.config.fieldRequired": "{{field}} é obrigatório",
	"node.config.fieldMin": "{{field}} deve ser no mínimo {{min}}",
	"node.config.fieldMax": "{{field}} deve ser no máximo {{max}}",
	"node.config.fieldMinLength":
		"{{field}} deve ter no mínimo {{minLength}} caracteres",
	"node.config.fieldMaxLength":
		"{{field}} deve ter no máximo {{maxLength}} caracteres",
	// Status
	"status.degraded.title": "API Degradada",
	"status.degraded.description":
		"A API do Triglit está enfrentando problemas no momento. Alguns recursos podem não funcionar corretamente.",
	"status.error.title": "Erro",
	"status.error.description": "Ocorreu um erro ao conectar à API do Triglit.",
	"status.loading": "Carregando...",
};
