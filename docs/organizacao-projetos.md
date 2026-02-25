# AWS Environment Border Guard 🛡️ - Organização do Projeto

Visão da organização dos arquivos-fonte do repositório. Por ser um projeto focado, sem banco de dados externo ou backend próprio (a Cloud AWS é a única dependência e atuamos de forma "Air-Gapped" no cliente), **optamos por um monorepo denso e não modularizado além do necessário.** 

Não teremos bibliotecas separadas, linter monstrificos ou pipelines complexos de CI/CD para deploy. O build será puramente uma pasta empacotada `.zip` (zip-build) compatível com o Chrome Developer Mode.

## 1. Estrutura de Diretórios (Work Tree)

```text
aws-env-border-guard/
│
├── manifest.json                # Core: Arquivo raiz dizendo ao Google Chrome o que essa extensão faz, permissões (storage) e scripts.
│
├── assets/                      # Imagens estáticas
│   ├── icon-16.png
│   ├── icon-48.png
│   ├── icon-128.png
│   └── promo/                   # Imagens e banners para a Chrome Web Store
│
├── src/                         # Código Fonte
│   ├── background/
│   │   └── service_worker.js    # Escuta mudanças via `onChanged` e faz broadcast para os Content Scripts aba a aba.
│   │
│   ├── content/
│   │   ├── injector.js          # MutationObserver, varredura de Regex no Menu de Header da AWS.
│   │   └── styles.css           # Variáveis e classes `pointer-events: none` da borda global e do badge fixo.
│   │
│   └── options/
│       ├── options.html         # A UI bonita de cadastro!
│       ├── options.js           # Lógica do CRUD em tela e Export/Import JSON usando FileReader API.
│       └── options.css          # Estilos independentes do options page.
│
├── docs/                        # Toda documentação gerada nas fases de arquitetura e Requisitos Funcionais.
│   ├── intencao.md
│   ├── features.md
│   └── (demais docs do sistema)
│
├── README.md                    # Instruções de Setup "Developer Mode (Unpacked)" para times entrarem com a extensão desligada da lojan
└── LICENCE                      # MIT (exemplo) para comunidade open-source avaliar questões de Zero-Telemetry.
```

## 2. Paradigma de Pipeline e Build
Para a concepção do *Air-Gapped* e *Vanilla JS*:
1. **Não utilizaremos bundlers** como Webpack ou Vite.
2. O código fonte no Github *é exatamente* o código que roda no navegador. Isso aumenta radicalmente a confiança em uma inspeção (audit) de InfoSec, pois não há versões transpiladas ofuscadas.
3. Não teremos dependências em `node_modules` de *UI frameworks* (como React) - isso reduz a burocracia de atualização constante para fechar CVEs em módulos vulneráveis; o JS lidará apenas com Manipulação de DOM bruta.

## 3. Gestão e Deploy
- **Repositório Principal:** O versionamento do Github gerenciará as *Tags* de Release.
- **Deploy Corporativo Interno:** Distribuição do `.zip` contendo os fontes do `/src` + `/assets` + `manifest.json`. O engenheiro levanta ele no `chrome://extensions`.
- **Deploy Chrome Web Store:** Um perfil de Desenvolvedor no Google Developer Dashboard fará upload do `.zip`. O ciclo de Release dependerá da aprovação manual de até 48 horas feita pelos bots de segurança do Google (por lidarmos com permissão host global no `*.amazon.com/*`).
