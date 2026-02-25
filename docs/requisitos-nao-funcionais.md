# AWS Environment Border Guard 🛡️ - Requisitos Não-Funcionais

Este documento descreve os requisitos não-funcionais (arquitetura, segurança, performance e infraestrutura) que guiarão o desenvolvimento técnico da extensão, respeitando o isolamento do navegador.

## 1. Capacidade e Armazenamento (Storage)
- **RNF1.1 - Limites de Sincronização:** A extensão utilizará a API nativa `chrome.storage.sync` para persistência das regras. O limite de cota arquitetural é projetado para um volume de até 100 contas por usuário. Este volume garante que transitemos bem abaixo do limite de 100KB do Chrome Sync, mantendo o backup ativo em nuvem gratuitamente.

## 2. Observabilidade e Sustentação (SRE)
- **RNF2.1 - Privacidade Máxima (Zero Rastros):** Por atuar com perfis restritos de Cloud corporativa, a extensão aplica um modelo de zero-telemetria. Nenhum log de navegação, erro ou uso sairá da máquina do usuário. As falhas arquiteturais (ex: a AWS mudou o HTML e corrompeu nosso parser) quebrarão silenciosamente emitindo rastros apenas no *Developer Console (F12)* local do usuário. A sustentação dependerá de issues no repositório ou reviews da loja.

## 3. Performance e Eficiência
- **RNF3.1 - Injeção Otimizada no SPA:** A AWS atua como SPA sem dar recarregamento (F5) na página. A injeção técnica será baseada em um `MutationObserver` atrelado aos nós vitais do DOM (como o container do cabeçalho).
- **RNF3.2 - Algoritmo com Debounce:** Para evitar spikes de CPU (alto consumo do hardware do cliente) e travamentos de aba em mutações frenéticas, o ciclo de verificação e renderização aplicará lógicas de *Debounce* na thread Javascript, mantendo latência microscópica para o processamento.

## 4. Segurança e CSP (Hardening)
- **RNF4.1 - Isolamento de Rede (*Air-gapped*):** A extensão operará com o princípio do menor privilégio na aba de segurança (*Manifest*). Não existirão permissões de chamadas externas ou *hosts* além do console da AWS. O *Content Security Policy (CSP)* será restrito inviabilizando qualquer *Data Exfiltration* ou injeção remota, estabelecendo confiança total (trust) e blindando a extensão.
