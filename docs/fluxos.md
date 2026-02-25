# AWS Environment Border Guard 🛡️ - Fluxos Principais

Visão simplificada dos dois fluxos principais que sustentam a extensão de navegador: o fluxo do usuário gerenciando contas e o fluxo de injeção contínua da página.

## 1. Fluxo de Vida Útil da Extensão e Gerenciamento (Options)
Descreve como o engenheiro usa a UI de configuração para abastecer a base de dados embutida no Chrome.

```mermaid
flowchart TD
    A[Usuário abre Interface de Opções] --> B{Possui base Exportada?}
    B -- Sim --> C[Faz Upload de regras.json]
    B -- Não --> D[Preenche Formulário Manual]
    
    C --> E[Extensão valida JSON e chaves AccountID]
    D --> E
    
    E --> F[Salva via chrome.storage.sync.set]
    F --> G[Chrome envia os dados pro Google Account / Disco Local]
    
    G --> H[Service Worker recebe Evento 'storage.onChanged']
    H --> I[Service Worker avisa abas da AWS já abertas: 'Reload Config']
    
    I --> J[Abas da AWS se pintam com novas cores]
```

## 2. Fluxo Principal de Avaliação e Injeção (Content Script vs DOM)
Acontece a cada vez que o Dev entra no Console da AWS ou troca de serviço (já que é SPA). 

```mermaid
flowchart TD
    A[Aba da AWS Carrega ou Muda a URL via SPA] --> B((Mutation Observer Dispara))
    B --> C{O Container do Header da AWS Existe?}
    
    C -- Sim --> D[Extrai Account ID e RegionText do HTML]
    C -- Não --> Wait[Aguarda próximos ciclos do DOM...] --> B
    
    D --> E{O Account ID lido está no Array em RAM?}
    
    E -- Sim --> F[Extensão cria DIV da Borda Global e Etiqueta]
    F --> G[Aplica a ColorHex e Textos definidos pelo Usuário]
    G --> H[Anexa a Div no BODY com pointer-events:none]
    
    E -- Não --> I[Extensão remove qualquer Borda que estivesse ativa de navegações passadas]
    H --> FimdeCiclo((Fim. Aguardando novo clique do user))
    I --> FimdeCiclo
```
