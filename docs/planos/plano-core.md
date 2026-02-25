# Plano de Trabalho - Funcionalidades Core (Base)
**Artefato**: AWS Environment Border Guard

## 1. Estrutura Base do Background (Service Worker)
- [x] Criar arquivo `src/background/service_worker.js`.
- [x] Implementar listener de inicialização (`chrome.runtime.onInstalled`).
- [x] Implementar listener de mudança no Storage (`chrome.storage.onChanged`).
- [x] Codificar o despachante de mensagens (`sendMessage`) para as abas ativas.

## 2. Estrutura Base do Content Script (Injetor)
- [x] Criar arquivo `src/content/injector.js`.
- [x] Criar arquivo `src/content/styles.css` com as classes raiz (`pointer-events: none`).
- [x] Implementar a função que busca dados do Storage assim que a página carrega.
- [x] Implementar um logger *verboso local* (usando `console.group` focado apenas no F12 do desenvolvedor para debugar o core em caso de erro na SPA da AWS).

## 3. Gestão de Estado Local e Fallback
- [x] Definir JSON default inicial ("Empty State").
- [x] Criar função JS global/compartilhada responsável por abstrair `chrome.storage.sync.get/set` com fallback de tempo limite.
