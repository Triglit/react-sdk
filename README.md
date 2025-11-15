# @triglit/react-sdk

> Componentes React prontos para uso e hooks para gerenciamento de estado

O React SDK (`@triglit/react-sdk`) fornece componentes React prontos para uso e hooks otimizados para construir interfaces de gerenciamento de workflows. Ele inclui um editor visual completo de workflows, componentes de UI estilizados e suporte completo a TypeScript e i18n.

## 📦 Instalação

```bash
# pnpm
pnpm add @triglit/react-sdk

# npm
npm install @triglit/react-sdk

# yarn
yarn add @triglit/react-sdk
```

### Dependências Peer

O React SDK requer React 18 ou superior:

```json
{
  "peerDependencies": {
    "react": "^18 || ^19",
    "react-dom": "^18 || ^19"
  }
}
```

## 🚀 Início Rápido

### 1. Importar os Estilos

O SDK requer estilos CSS para funcionar corretamente. Importe o arquivo de estilos no seu projeto:

```tsx
import '@triglit/react-sdk/styles.css';
```

**Onde importar:**
- **Next.js (App Router)**: `app/layout.tsx` ou `app/_app.tsx`
- **Next.js (Pages Router)**: `pages/_app.tsx`
- **Create React App / Vite**: `src/index.tsx` ou `src/main.tsx`

### 2. Configurar o Provider

Envolva sua aplicação (ou a parte que usa o SDK) com o `TriglitProvider`:

```tsx
import { TriglitProvider } from '@triglit/react-sdk';
import '@triglit/react-sdk/styles.css';

function App() {
  return (
    <TriglitProvider config={{ apiKey: 'pk_sua_chave_aqui' }}>
      {/* Sua aplicação */}
    </TriglitProvider>
  );
}
```

### 3. Usar o Editor de Workflows

```tsx
import { TriglitProvider, WorkflowEditor } from '@triglit/react-sdk';
import '@triglit/react-sdk/styles.css';

function App() {
  return (
    <TriglitProvider config={{ apiKey: 'pk_...' }}>
      <div className="h-screen">
        <WorkflowEditor 
          workflowId="wf_123"
          onSave={(versionId) => {
            console.log(`Versão ${versionId} salva com sucesso!`);
          }}
        />
      </div>
    </TriglitProvider>
  );
}
```

## ⚙️ Configuração

### Configuração Completa

```tsx
import { TriglitProvider } from '@triglit/react-sdk';
import '@triglit/react-sdk/styles.css';

function App() {
  return (
    <TriglitProvider
      config={{
        // Chave de API (obrigatória)
        // Se não fornecida, tenta ler de variáveis de ambiente:
        // - NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY
        // - TRIGLIT_PUBLISHABLE_KEY
        apiKey: 'pk_sua_chave_aqui',
        
        // URL base da API (opcional, padrão: https://api.triglit.com)
        baseURL: 'https://api.triglit.com',
        
        // Configuração de i18n (opcional)
        i18n: {
          locale: 'pt-BR', // 'en' (padrão) ou 'pt-BR'
          // ou traduções customizadas
          translations: {
            'workflow.editor.save': 'Salvar',
            // ...
          },
        },
        
        // Callbacks para eventos (opcional)
        callbacks: {
          onWorkflowVersionCreated: (version) => {
            console.log('Versão criada:', version);
          },
          onWorkflowVersionPublished: (response) => {
            console.log('Versão publicada:', response);
          },
          onWorkflowVersionCreateError: (error) => {
            console.error('Erro:', error);
          },
          // ... outros callbacks
        },
      }}
    >
      {/* Sua aplicação */}
    </TriglitProvider>
  );
}
```

### Variáveis de Ambiente

Você pode configurar a chave de API via variável de ambiente:

```bash
# Next.js
NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY=pk_...

# Outros frameworks
TRIGLIT_PUBLISHABLE_KEY=pk_...
```

Se a chave for configurada via variável de ambiente, você pode omitir `apiKey` no config:

```tsx
<TriglitProvider config={{}}>
  {/* SDK usará a variável de ambiente automaticamente */}
</TriglitProvider>
```

## 🎨 Componentes

### WorkflowEditor

Componente principal para editar workflows visualmente:

```tsx
import { WorkflowEditor } from '@triglit/react-sdk';

<WorkflowEditor
  workflowId="wf_123"
  initialVersionId="v_456" // opcional
  onSave={(versionId) => {
    console.log('Salvo:', versionId);
  }}
  className="custom-class" // opcional
/>
```

**Props:**
- `workflowId` (string, obrigatório): ID do workflow a ser editado
- `initialVersionId` (string, opcional): ID da versão inicial a carregar
- `onSave` (function, opcional): Callback chamado quando o workflow é salvo
- `className` (string, opcional): Classe CSS customizada

### Componentes de Status

Componentes para exibir o status da API:

```tsx
import { 
  TriglitLoading, 
  TriglitError, 
  TriglitDegraded 
} from '@triglit/react-sdk';

// Loading
<TriglitLoading />

// Erro
<TriglitError />

// API degradada
<TriglitDegraded />
```

### Componentes de Editor

Componentes individuais do editor (para uso avançado):

```tsx
import {
  WorkflowCanvas,
  WorkflowEditorHeader,
  WorkflowNodesList,
  WorkflowTriggersList,
  NodeConfigDialog,
} from '@triglit/react-sdk';
```

## 🪝 Hooks

### useTriglit

Hook principal para acessar o cliente e configuração do SDK:

```tsx
import { useTriglit } from '@triglit/react-sdk';

function MyComponent() {
  const { client, config, i18n, callbacks, apiStatus } = useTriglit();
  
  // client: instância do cliente Triglit
  // config: configuração do provider
  // i18n: configuração de i18n
  // callbacks: callbacks configurados
  // apiStatus: status da API ('healthy' | 'degraded' | 'error' | 'loading')
}
```

### useWorkflow

Hook para gerenciar um workflow:

```tsx
import { useWorkflow } from '@triglit/react-sdk';

function WorkflowView({ workflowId }: { workflowId: string }) {
  const { workflow, isLoading, error } = useWorkflow(workflowId);
  
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return <div>{workflow?.name}</div>;
}
```

### useWorkflowVersion

Hook para gerenciar uma versão específica de workflow:

```tsx
import { useWorkflowVersion } from '@triglit/react-sdk';

function VersionEditor({ versionId }: { versionId: string }) {
  const {
    version,
    isLoading,
    updateVersion,
    publishVersion,
    isUpdating,
    isPublishing,
  } = useWorkflowVersion(versionId);
  
  const handleSave = () => {
    updateVersion({
      versionId,
      nodes: [...],
      edges: [...],
    });
  };
  
  const handlePublish = () => {
    publishVersion(versionId);
  };
  
  return (
    <div>
      <button onClick={handleSave} disabled={isUpdating}>
        {isUpdating ? 'Salvando...' : 'Salvar'}
      </button>
      <button onClick={handlePublish} disabled={isPublishing}>
        {isPublishing ? 'Publicando...' : 'Publicar'}
      </button>
    </div>
  );
}
```

### useWorkflowVersions

Hook para listar versões de um workflow:

```tsx
import { useWorkflowVersions } from '@triglit/react-sdk';

function VersionsList({ workflowId }: { workflowId: string }) {
  const { data, isLoading } = useWorkflowVersions({
    workflowId,
    pageSize: 10,
  });
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <ul>
      {data?.data.map((version) => (
        <li key={version.id}>Versão {version.version}</li>
      ))}
    </ul>
  );
}
```

### useTriggers

Hook para listar triggers de uma versão:

```tsx
import { useTriggers } from '@triglit/react-sdk';

function TriggersList({ versionId }: { versionId: string }) {
  const { data, isLoading } = useTriggers({
    workflowVersionId: versionId,
  });
  
  if (isLoading) return <div>Carregando...</div>;
  
  return (
    <ul>
      {data?.triggers.map((trigger) => (
        <li key={trigger.id}>{trigger.type}</li>
      ))}
    </ul>
  );
}
```

### useTrigger

Hook para gerenciar um trigger específico:

```tsx
import { useTrigger } from '@triglit/react-sdk';

function TriggerView({ triggerId }: { triggerId: string }) {
  const { trigger, isLoading } = useTrigger(triggerId);
  
  if (isLoading) return <div>Carregando...</div>;
  
  return <div>{trigger?.name}</div>;
}
```

### useApiStatus

Hook para verificar o status da API:

```tsx
import { useApiStatus } from '@triglit/react-sdk';

function ApiStatusIndicator() {
  const status = useApiStatus();
  
  if (status === 'loading') return <div>Conectando...</div>;
  if (status === 'error') return <div>Erro na conexão</div>;
  if (status === 'degraded') return <div>API com problemas</div>;
  
  return <div>API funcionando normalmente</div>;
}
```

### useI18n

Hook para acessar traduções:

```tsx
import { useI18n } from '@triglit/react-sdk';

function MyComponent() {
  const t = useI18n();
  
  return (
    <div>
      <button>{t('workflow.editor.save')}</button>
      <p>{t('workflow.editor.version', { version: 1 })}</p>
    </div>
  );
}
```

### Hooks de Mutação

Hooks para criar, atualizar e deletar recursos:

```tsx
import {
  useCreateWorkflow,
  useCreateWorkflowVersion,
  useUpdateWorkflowVersion,
  usePublishWorkflowVersion,
  useCreateTrigger,
  useUpdateTrigger,
  useDeleteTrigger,
} from '@triglit/react-sdk';

function MyComponent() {
  const createWorkflow = useCreateWorkflow();
  const createVersion = useCreateWorkflowVersion();
  const updateVersion = useUpdateWorkflowVersion();
  const publishVersion = usePublishWorkflowVersion();
  const createTrigger = useCreateTrigger();
  const updateTrigger = useUpdateTrigger();
  const deleteTrigger = useDeleteTrigger();
  
  // Usar as mutações...
}
```

## 🌍 Internacionalização (i18n)

### Locales Suportados

O SDK suporta os seguintes locales:
- `en` (Inglês) - padrão
- `pt-BR` (Português do Brasil)

### Configuração de Locale

```tsx
<TriglitProvider
  config={{
    apiKey: 'pk_...',
    i18n: {
      locale: 'pt-BR', // Usa traduções em português
    },
  }}
>
  {/* Componentes */}
</TriglitProvider>
```

### Traduções Customizadas

Você pode fornecer traduções customizadas:

```tsx
<TriglitProvider
  config={{
    apiKey: 'pk_...',
    i18n: {
      locale: 'pt-BR',
      translations: {
        'workflow.editor.save': 'Salvar',
        'workflow.editor.publish': 'Publicar',
        // ...
      },
    },
  }}
>
  {/* Componentes */}
</TriglitProvider>
```

Ou usar uma função de tradução:

```tsx
<TriglitProvider
  config={{
    apiKey: 'pk_...',
    i18n: {
      locale: 'pt-BR',
      translations: (key: string) => {
        // Sua lógica de tradução customizada
        const customTranslations: Record<string, string> = {
          'workflow.editor.save': 'Salvar',
          // ...
        };
        return customTranslations[key] || key;
      },
    },
  }}
>
  {/* Componentes */}
</TriglitProvider>
```

### Usando Traduções em Componentes Customizados

```tsx
import { useI18n } from '@triglit/react-sdk';

function MyCustomComponent() {
  const t = useI18n();
  
  return (
    <div>
      <button>{t('workflow.editor.save')}</button>
      <p>{t('workflow.editor.version', { version: 2 })}</p>
    </div>
  );
}
```

## 🔔 Callbacks

O SDK permite configurar callbacks para eventos importantes:

```tsx
<TriglitProvider
  config={{
    apiKey: 'pk_...',
    callbacks: {
      // Callbacks de workflow version
      onWorkflowVersionCreated: (version) => {
        console.log('Versão criada:', version);
        // Exibir notificação, atualizar cache, etc.
      },
      onWorkflowVersionCreateError: (error) => {
        console.error('Erro ao criar versão:', error);
        // Exibir erro ao usuário
      },
      onWorkflowVersionUpdated: (version) => {
        console.log('Versão atualizada:', version);
      },
      onWorkflowVersionUpdateError: (error) => {
        console.error('Erro ao atualizar versão:', error);
      },
      onWorkflowVersionPublished: (response) => {
        console.log('Versão publicada:', response);
      },
      onWorkflowVersionPublishError: (error) => {
        console.error('Erro ao publicar versão:', error);
      },
      
      // Callbacks de triggers
      onTriggerCreated: (trigger) => {
        console.log('Trigger criado:', trigger);
      },
      onTriggerCreateError: (error) => {
        console.error('Erro ao criar trigger:', error);
      },
      onTriggerUpdated: (trigger) => {
        console.log('Trigger atualizado:', trigger);
      },
      onTriggerUpdateError: (error) => {
        console.error('Erro ao atualizar trigger:', error);
      },
      onTriggerDeleted: () => {
        console.log('Trigger deletado');
      },
      onTriggerDeleteError: (error) => {
        console.error('Erro ao deletar trigger:', error);
      },
      
      // Callbacks de workflows
      onWorkflowCreated: (workflow) => {
        console.log('Workflow criado:', workflow);
      },
      onWorkflowCreateError: (error) => {
        console.error('Erro ao criar workflow:', error);
      },
    },
  }}
>
  {/* Componentes */}
</TriglitProvider>
```

Use callbacks para integrar com sistemas de notificação, logging, analytics ou atualizar estado global da aplicação.

## 🎨 Estilização

### Modo Escuro

O SDK suporta modo escuro automaticamente. O provider adiciona a classe `dark` ao elemento raiz:

```tsx
// O modo escuro é aplicado automaticamente
<TriglitProvider config={{ apiKey: 'pk_...' }}>
  {/* Componentes em modo escuro */}
</TriglitProvider>
```

Para usar modo claro, você pode sobrescrever as classes:

```tsx
<TriglitProvider config={{ apiKey: 'pk_...' }}>
  <div className="triglit-root"> {/* Remove a classe dark */}
    <WorkflowEditor workflowId="wf_123" />
  </div>
</TriglitProvider>
```

### Customização de Estilos

Os componentes usam classes CSS com prefixo `tg:` para evitar conflitos. Você pode customizar os estilos usando CSS:

```css
/* Customizar cores do editor */
.triglit-root {
  --tg-primary: #your-color;
  --tg-secondary: #your-color;
}
```

## 🔧 Uso Avançado

### Integração com React Query

O SDK usa React Query internamente. Você pode acessar o QueryClient para configurações avançadas:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TriglitProvider } from '@triglit/react-sdk';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TriglitProvider config={{ apiKey: 'pk_...' }}>
        {/* Sua aplicação */}
      </TriglitProvider>
    </QueryClientProvider>
  );
}
```

### Server-Side Rendering (Next.js)

Para usar o SDK com Next.js App Router:

```tsx
// app/workflows/[id]/page.tsx
'use client';

import { TriglitProvider, WorkflowEditor } from '@triglit/react-sdk';
import '@triglit/react-sdk/styles.css';

export default function WorkflowPage({ params }: { params: { id: string } }) {
  return (
    <TriglitProvider
      config={{
        apiKey: process.env.NEXT_PUBLIC_TRIGLIT_PUBLISHABLE_KEY!,
      }}
    >
      <WorkflowEditor workflowId={params.id} />
    </TriglitProvider>
  );
}
```

### Implementação Manual com Hooks

Você pode construir sua própria UI usando apenas os hooks:

```tsx
import {
  TriglitProvider,
  useWorkflow,
  useWorkflowVersions,
  useWorkflowVersion,
  useTriggers,
} from '@triglit/react-sdk';

function CustomWorkflowUI({ workflowId }: { workflowId: string }) {
  const { workflow, isLoading: workflowLoading } = useWorkflow(workflowId);
  const { data: versions } = useWorkflowVersions({ workflowId });
  const currentVersionId = versions?.data?.[0]?.id;
  const { version } = useWorkflowVersion(currentVersionId || '', {
    enabled: !!currentVersionId,
  });
  const { data: triggersData } = useTriggers({
    workflowVersionId: currentVersionId,
  });
  
  if (workflowLoading) return <div>Carregando...</div>;
  
  return (
    <div>
      <h1>{workflow?.name}</h1>
      <div>
        <h2>Versões</h2>
        {versions?.data?.map((v) => (
          <div key={v.id}>Versão {v.version}</div>
        ))}
      </div>
      <div>
        <h2>Triggers</h2>
        {triggersData?.triggers?.map((trigger) => (
          <div key={trigger.id}>{trigger.type}</div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <TriglitProvider config={{ apiKey: 'pk_...' }}>
      <CustomWorkflowUI workflowId="wf_123" />
    </TriglitProvider>
  );
}
```

### Utilitários

O SDK também exporta utilitários úteis:

```tsx
import {
  convertTriggerConfigToApi,
  getTriggerConfigSchemas,
  hasCycle,
  validateEdges,
  validateNode,
} from '@triglit/react-sdk';

// Converter configuração de trigger para formato da API
const apiConfig = convertTriggerConfigToApi('trigger_webhook', visualConfig);

// Obter schemas de configuração de triggers
const schemas = getTriggerConfigSchemas();

// Validar workflow
const isValid = !hasCycle(nodes, edges);
const validEdges = validateEdges(edges, nodes);
const validNode = validateNode(node);
```

## 📚 Exemplos

### Exemplo Básico

```tsx
import { TriglitProvider, WorkflowEditor } from '@triglit/react-sdk';
import '@triglit/react-sdk/styles.css';

function App() {
  return (
    <TriglitProvider config={{ apiKey: 'pk_...' }}>
      <div className="h-screen">
        <WorkflowEditor 
          workflowId="wf_123"
          onSave={(versionId) => {
            alert(`Versão ${versionId} salva com sucesso!`);
          }}
        />
      </div>
    </TriglitProvider>
  );
}
```

### Exemplo com Customização

```tsx
import {
  TriglitProvider,
  WorkflowEditor,
} from '@triglit/react-sdk';
import '@triglit/react-sdk/styles.css';
import { toast } from 'sonner'; // ou sua biblioteca de toast

function App() {
  return (
    <TriglitProvider
      config={{
        apiKey: 'pk_...',
        i18n: {
          locale: 'pt-BR',
        },
        callbacks: {
          onWorkflowVersionCreated: (version) => {
            toast.success('Versão criada com sucesso!');
          },
          onWorkflowVersionPublished: () => {
            toast.success('Versão publicada!');
          },
          onWorkflowVersionCreateError: (error) => {
            toast.error(`Erro: ${error.message}`);
          },
        },
      }}
    >
      <WorkflowEditor workflowId="wf_123" />
    </TriglitProvider>
  );
}
```

## 🐛 Troubleshooting

### Estilos não aparecem

Certifique-se de importar o CSS:

```tsx
import '@triglit/react-sdk/styles.css';
```

### Erro de autenticação

Verifique se a chave de API está correta e se está usando o tipo correto (`pk_` para frontend, `sk_` para backend).

### Componentes não renderizam

Certifique-se de que o `TriglitProvider` envolve todos os componentes do SDK.

### Problemas com TypeScript

O SDK é totalmente tipado. Se você encontrar erros de tipo, verifique se está usando a versão mais recente:

```bash
npm update @triglit/react-sdk
```

### Hook usado fora do Provider

Se você receber o erro "useTriglit must be used within a TriglitProvider", certifique-se de que o componente está dentro do `TriglitProvider`.

## 📖 Documentação

Para mais informações, consulte a [documentação oficial do Triglit](https://docs.triglit.com/sdks/react-sdk).

### Links Úteis

- [Documentação do React SDK](https://docs.triglit.com/sdks/react-sdk)
- [Exemplos](https://docs.triglit.com/sdks/react-sdk/examples)
- [Referência da API](https://docs.triglit.com/api-reference)
- [TypeScript SDK](https://docs.triglit.com/sdks/typescript-sdk)

## 📄 Licença

MIT

## 👤 Autor

João Pedro <contato@triglit.com>

## 🔗 Links

- [Homepage](https://github.com/triglit/react-sdk)
- [Issues](https://github.com/triglit/react-sdk/issues)
- [Documentação](https://docs.triglit.com/sdks/react-sdk)

