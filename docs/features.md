# AWS Environment Border Guard 🛡️ - Funcionalidades (Features)

Este documento descreve detalhadamente o escopo funcional da extensão, dividindo o projeto em épicos e funcionalidades específicas para guiar o desenvolvimento.

## Épico 1: Monitoramento e Injeção Visual no Console AWS
Este é o core da aplicação. Consiste em ler a página da AWS passivamente e aplicar os alertas visuais definidos pelo usuário caso haja uma correspondência de conta (Account ID).

- **FT1.1: Captura Passiva de Account ID e Região (`Content Script`)**
  - **Descrição:** Script injetado que vasculha continuamente (via MutationObserver ou em intervalos) o DOM do navbar do console da AWS para extrair o Account ID atual (ex: `1234-5678-9012`) e a Região selecionada (ex: `us-east-1`).
  - **Perfil/Skill:** Desenvolvedor Javascript (DOM Manipulation, Chrome Extension APIs).
  
- **FT1.2: Motor de Correspondência de Regras**
  - **Descrição:** Lógica que pega o Account ID e Região extraídos e compara com a base de dados em memória (`chrome.storage`) buscando por regras correspondentes.
  - **Perfil/Skill:** Desenvolvedor Javascript (Lógica de negócios, performance).

- **FT1.3: Injeção de Borda Global Invasiva (Não-Bloqueante)**
  - **Descrição:** Ao detectar uma correspondência de conta, cria e injeta dinamicamente um elemento `<div>` no topo do body (com `position: fixed`, `pointer-events: none` e `box-shadow` interno da cor correspondente) contornando toda a tela.
  - **Perfil/Skill:** Desenvolvedor Front-end (CSS avançado, manipulação DOM limpa).

- **FT1.4: Injeção de Etiqueta (Badge) Flutuante**
  - **Descrição:** Injeção de uma pequena "tag" ou "badge" posicionada em um canto superior (ex: acima do logo da AWS ou no canto direito), contendo o texto `[Alias - Região]` em negrito e com cor de fundo correspondente à regra, garantindo fácil legibilidade.
  - **Perfil/Skill:** Desenvolvedor Front-end (CSS/UI).

## Épico 2: Gestão de Regras (Options Page)
Interface para o usuário da extensão (o engenheiro Cloud/DevOps) cadastrar, editar e excluir suas regras.

- **FT2.1: Interface (UI) do Painel de Opções (Options Page)**
  - **Descrição:** Construção da página HTML de opções da extensão. Um design responsivo, moderno, intuitivo e com visual caprichado visando um bom *onboarding* e facilidade de inserção de dados.
  - **Perfil/Skill:** Desenvolvedor Front-end / UX Designer (HTML5, CSS3, UX).

- **FT2.2: Formulário de Cadastro de Regra (CRUD de Contas)**
  - **Descrição:** Botões, inputs e formulários para criar ou editar uma regra. Deve solicitar: `Account ID` (somente números), `Alias` (texto livre com limite) e `Cor` (color picker ou lista predefinida). Deve permitir deletar e listar todas as regras ativas.
  - **Perfil/Skill:** Desenvolvedor Javascript (Manipulação DOM de formulários, validação de inputs).

- **FT2.3: Importação/Exportação de Regras (.json)**
  - **Descrição:** Botões para salvar a lista de regras atual em um arquivo `regras.json` (download) e botão para importar e concatenar (ou sobrescrever) as regras lendo de um `.json` subido ("upload") pelo usuário. Essencial para distribuição em times.
  - **Perfil/Skill:** Desenvolvedor Javascript (File API do navegador, manipulação de JSON e Blobs).

## Épico 3: Persistência e Sistema
Envolve a base de como a extensão armazena dados e se comunica dentro da arquitetura do *Manifest V3*.

- **FT3.1: Gerenciamento de Armazenamento (`chrome.storage.sync`)**
  - **Descrição:** Uso da API `chrome.storage.sync` para ler e salvar o array de regras estruturadas (JSON). Garantir que, se o usuário tiver o Chrome logado em múltiplos PCs, a regra sincronize automaticamente. Fallback para `chrome.storage.local` se limite de bytes for excedido ou estiver deslogado.
  - **Perfil/Skill:** Desenvolvedor de Chrome Extensions (Data Persistence).

- **FT3.2: *Service Worker* (Background Script)**
  - **Descrição:** Arquivo de background central (Worker) focado no ciclo de vida da extensão (Manifest V3), controle de *listeners*, e recarregamento/gestão de *state* caso as configurações mudem com a página da AWS já aberta.
  - **Perfil/Skill:** Desenvolvedor de Chrome Extensions (Service Workers, Eventos).

## Épico 4: Distribuição e Lançamento
Passos voltados para empacotar e disponibilizar o código aos usuários.

- **FT4.1: Assets Visuais (Ícones, Promocionais)**
  - **Descrição:** Criação dos arquivos gráficos. Ícones da extensão (16x16, 48x48, 128x128) e imagens promocionais (banners) para a página da Chrome Web Store.
  - **Perfil/Skill:** Designer UI/UX.

- **FT4.2: Documentação e Instalador Local (Unpacked)**
  - **Descrição:** Um arquivo `README.md` claro no repositório ensinando o time como levantar em modo desenvolvedor (instalação manual *"load unpacked"*) na própria máquina ou distribuir internamente sem Store.
  - **Perfil/Skill:** Technical Writer / Desenvolvedor.
