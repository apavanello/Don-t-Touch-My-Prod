# AWS Environment Border Guard 🛡️

Extensão para navegadores (baseados em Chromium) projetada para aumentar a segurança operacional de engenheiros e desenvolvedores na AWS. Através de identificação visual inconfundível (uma borda colorida e etiqueta in-page), o profissional saberá instantaneamente em qual contexto (Dev, QA, Prod) está operando.

## 🚀 Instalação (Modo Desenvolvedor / Unpacked)

Se você precisa rodar a versão de desenvolvimento local sem baixar da Chrome Web Store, o processo é simples (não requer npm, node, web-pack, etc):

1. Clone ou baixe o `.zip` deste repositório na sua máquina.
2. Abra seu Google Chrome / Microsoft Edge e digite na barra de endereços: `chrome://extensions/` (ou `edge://extensions/`).
3. Ative o "Developer mode" (Modo do desenvolvedor) no canto superior direito.
4. Clique no botão "Load unpacked" (Carregar sem compactação) no canto superior esquerdo.
5. Selecione a pasta raiz da extensão (a pasta que contém o arquivo `manifest.json`).

Pronto! A extensão já está rodando.

## 🛠️ Como Contribuir
Fizemos a extensão 100% Vanilla JS + CSS para maximizar a transparência, segurança corporativa (air-gapped) e não haver dores de cabeça com dependências de módulos. Apenas altere o código nos diretórios `src/` e interaja via Painel de Extensões do navegador.

## 🔐 Privacidade
Este aplicativo opera de forma passiva, sob as diretrizes do Manifest V3. Nenhum rastreio, telemetria ou log HTTP é enviado com seus Account IDs e configurações para nenhum servidor. O isolamento de rede foi feito no nível do `manifest.json`.
