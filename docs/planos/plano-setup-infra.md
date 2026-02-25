# Plano de Trabalho - Setup de Infraestrutura
**Artefato**: AWS Environment Border Guard

## 1. Pipeline de CI/CD (Github Actions / Zip Build)
- [x] Criar *workflow* do Github Actions (`.github/workflows/build.yml`).
- [x] Configurar step no pipeline que execute um comando Zip no diretório raiz excluindo a pasta `.git/` e outras desnecessárias.
- [x] Gerar Release Automática no Github com o arquivo `.zip` anexado após push na master.

## 2. Empacotamento para Lojas e Ambientes
- [x] Validar integridade do `.zip` gerado localmente testando sua instalação no navegador.
- [x] Garantir que o repositório possua um documento `README.md` limpo para Onboarding de Infraestrutura.
- [x] Preparar descritivo, termos de privacidade e telas necessárias para submissão manual do `.zip` no Google Chrome Web Store.
