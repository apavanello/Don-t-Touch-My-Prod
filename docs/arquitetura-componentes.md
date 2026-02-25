# AWS Environment Border Guard 🛡️ - Arquitetura e Componentes

A arquitetura da solução baseia-se no modelo padrão do **Chrome Extension Manifest V3**, desenhada para ser estrita, segura (Air-gapped) e de altíssima performance visual no navegador do cliente (Client-side puro).

---

## 1. Diagrama de Contexto (C4 Model - Nível 1)
Visão alto nível de como a extensão se posiciona entre o usuário, o navegador e a nuvem da AWS.

```mermaid
C4Context
    title Diagrama de Contexto - AWS Border Guard

    Person(user, "Engenheiro Cloud / DevOps", "Usuário que opera múltiplos ambientes AWS.")
    
    System_Boundary(browser, "Google Chrome / Edge") {
        System(ext, "Border Guard Extension", "Monitora Account IDs na tela e injeta alertas visuais (Bordas e Badges).")
        System_Ext(storage, "Chrome Storage Sync", "Motor do navegador para sincronização de dados.")
    }

    System_Ext(aws_console, "AWS Management Console", "Interface Web da AWS sendo acessada (DOM).")

    Rel(user, ext, "Configura regras (Conta x Cor x Alias)")
    Rel(user, aws_console, "Navega e opera recursos")
    Rel(ext, aws_console, "Lê Account ID e Região (DOM) / Injeta CSS de Alerta", "Read/Write DOM")
    Rel(ext, storage, "Salva e recupera regras de mapeamento", "API")
```

---

## 2. Diagrama de Containers (C4 Model - Nível 2)
Detalhamento dos contêineres lógicos que compõem a extensão. Como é uma aplicação puramente front-end embarcada, os "Containers" são os *scripts* vitais do Manifest V3.

```mermaid
C4Container
    title Diagrama de Containers - Arquitetura Manifest V3

    Person(user, "Usuário", "Gestor Cloud")
    System_Ext(aws_console, "Aba do AWS Console", "DOM do site da AWS")

    System_Boundary(extension, "Extensão Border Guard") {
        Container(options_ui, "Options Page (UI)", "HTML/JS/CSS", "Interface de gestão (CRUD) das contas e importação/exportação de regras.")
        Container(background, "Service Worker (Background)", "JS Vanilla", "Controlador central do ciclo de vida da extensão e listener de rotas do Chrome.")
        Container(content_script, "Content Script", "JS Vanilla", "Injetado nas abas da AWS. Responsável pelo MutationObserver, leitura de cabeçalhos e injeção do CSS da borda.")
        
        ContainerDb(storage, "Storage API", "chrome.storage", "Banco de dados chave-valor embarcado no navegador.")
    }

    Rel(user, options_ui, "Cadastra/Edita Regras")
    Rel(options_ui, storage, "Lê/Grava JSON de Regras")
    
    Rel(background, storage, "Acompanha mudanças no State")
    Rel(background, content_script, "Sinaliza refresh de configurações", "Message Passing")
    
    Rel(content_script, aws_console, "Observa Mutações (Account/Region)")
    Rel(content_script, aws_console, "Injeta Divs (Borda/Badge)")
    Rel(content_script, storage, "Puxa regras em cache (Read-only)")
```

## Resumo dos Componentes
- **Options UI:** Tela de configuração separada, aberta pelo usuário quando ele quer alterar algo.
- **Service Worker:** Vive em *background*, inativo na maior parte do tempo. Acorda apenas quando há atualizações de abas (ex: abriu uma nova aba da AWS) ou quando as regras foram alteradas para avisar os Content Scripts ativos.
- **Content Script:** O "motor de execução". Fica acoplado a qualquer URL da AWS (*.console.aws.amazon.com/*). É ele que atua lendo o HTML do site da AWS através do DOM e pinta a tela.
