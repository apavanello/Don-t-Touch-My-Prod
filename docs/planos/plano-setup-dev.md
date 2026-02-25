# Plano de Trabalho - Setup de Desenvolvimento
**Artefato**: AWS Environment Border Guard

## 1. Configuração do Repositório e Ambiente Local
- [x] Inicializar repositório Git.
- [x] Criar arquivo `.gitignore`.
- [x] Criar estrutura base de pastas: `/src/background`, `/src/content`, `/src/options`, `/assets`.
- [x] Criar `manifest.json` com permissões mínimas (`storage`, `host_permissions: *://*.console.aws.amazon.com/*`).

## 2. Configuração de Ferramentas de Linters/Formatters
*Nota: Embora não usemos frameworks baseados em Node.js (conforme docs/organizacao-projetos.md), lints ajudam no Vanilla JS.*
- [x] Escolher um validador de JS para VSCode (ex: ESLint Básico ou padrão do editor).
- [x] Configurar formatação `.editorconfig` no repositório.

## 3. Ambiente de Teste Local do Chrome
- [ ] Obter pacote base e importar no Chrome via `chrome://extensions` -> *Load Unpacked*.
- [ ] Validar se o manifest nativo compila sem erros no modo desenvolvedor do Chrome.
