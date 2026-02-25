# AWS Environment Border Guard 🛡️ - Priorização de Features

Tabela de priorização e esforço para cada funcionalidade.

## Metodologia Aplicada
*   **MosCoW:**
    *   **Must:** Obrigatório para o produto existir (MVP Core).
    *   **Should:** Altamente recomendado, deve ser feito o quanto antes.
    *   **Could:** Desejável, mas pode ser postergado se o prazo ou orçamento apertar.
    *   **Won't:** Não será feito no momento (apesar de talvez existir no longo prazo - não aplicável à nossa lista atual, pois focamos apenas no aceito/escopo).
*   **Esforço:** Simples, Médio, Complexo.

---

## Tabela de Priorização e Esforço

| ID Feature | Descrição | Escopo | MosCoW | Esforço (Skill) | Justificativa / Comentários |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **FT1.1** | Captura Passiva de Account ID e Região do Console | Funcional | **Must** | **Médio** (JS/DOM) | Requisito fundamental. Ler a página que muda ativamente via SPA da AWS requer observadores de mutação do DOM e robustez no parser sem quebrar com updates futuros da AWS. |
| **FT1.2** | Motor de Correspondência de Regras | Funcional | **Must** | **Simples** (JS) | Necessário para cruzar os dados lidos com a base do Storage interno. Lógica básica. |
| **FT1.3** | Injeção de Borda Global (Não-Bloqueante) | Funcional | **Must** | **Simples** (CSS/DOM) | O coração visual do software (Problema central resolvido). O CSS de `pointer-events: none` é simples, mas crucial para não obstruir o clique. |
| **FT1.4** | Injeção de Etiqueta (Badge) Flutuante | Funcional | **Must** | **Simples** (CSS/DOM) | Complemento indispensável. Renderizar a Região e o Alias para o contexto ficar completo. |
| **FT2.1** | Interface (UI) do Painel de Opções | Funcional | **Must** | **Médio** (HTML/UX) | Necessita um visual "caprichado" com bom onboarding para não ser rejeitado via má avaliação na Web Store. Exige estilização agradável. |
| **FT2.2** | Formulário de Cadastro de Regra (CRUD de Contas) | Funcional | **Must** | **Médio** (JS/Front) | É imperativo pro usuário final gerir suas contas. Gerir estado local do form, validadores e cores são processos intermediários em JS Vanilla. |
| **FT3.1** | Gerenciamento de Armazenamento (`chrome.storage.sync`) | Não-funcional (Persistência) | **Must** | **Simples** (Ext API) | Base para a regra existir de forma permanente e sincronizar. É uma API nativa do Chrome pronta para uso. |
| **FT3.2** | Service Worker (Background Script) | Não-funcional (Lifecycle) | **Must** | **Médio** (Ext API/Worker) | Necessário para Manifest V3. Requer escutar as guias atualizando e enviar mensagens pro front quando as confs mudarem. |
| **FT2.3** | Importação/Exportação de Regras (.json) | Funcional | **Should** | **Médio** (JS/File API) | Solicitado expressamente. Apesar da extensão funcionar sem, é a ponte perfeita para escalabilidade dentro de esquadrões e redução de atrito. |
| **FT4.2** | Documentação e Instalador Local (Unpacked) | Não-funcional / Docs | **Should** | **Simples** (Docs) | Documentação de setup é imprescindível para adoção interna antes da publicação e atração de mantenedores/reviewers de segurança operando Offline. |
| **FT4.1** | Assets Visuais (Ícones, Promocionais) | Não-funcional / Assets | **Could** | **Simples** (Design) | Para aprovação na Chrome Web Store os ícones são obrigatórios (Must da Loja). O *poder visual e peças promocionais* são *Could* em um primeiro sprint MVP até o código estabilizar. |
| **RNF1.1** | Limites de Persistência em nuvem local | Não-funcional (Storage) | **Must** | **Simples** | Até 100 regras via `chrome.storage.sync` suportando o tráfego grátis da API. |
| **RNF2.1** | Privacidade Máxima (Zero Rastros) | Não-funcional (Ops) | **Must** | **Simples** | Nenhuma telemetria externa mitigando fricção com times de Infosec. |
| **RNF3.1** | Estratégia de Captura SPA com Debounce | Não-funcional (Perf) | **Must** | **Médio** | `MutationObserver` engatilhado de forma otimizada para evitar CPU Lock das abas. |
| **RNF4.1** | Segurança Air-gapped e Hardened CSP | Não-funcional (Sec) | **Must** | **Simples** | Todo componente roda localmente, sem permissões de rede de saída no Manifest V3. |

---

> **Nota:** Se os requisitos do documento `intencao.md` sofrerem atualizações/modificações, a prioridade ou estimativa de esforço das features listadas aqui podem sofrer alterações significativas de impacto.
