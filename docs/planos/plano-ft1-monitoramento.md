# Plano de Trabalho - Monitoramento e Injeção (Épico 1)
**Artefato**: AWS Environment Border Guard

*Dependências: Requer o Plano Core executado (injector.js base).*

## FT1.1: Captura Passiva de Account ID e Região
- [x] Estudar o HTML atual padrão do header do AWS Console (`<div id="nav-usernameMenu">` ou similares).
- [x] Implementar a *Regex* ou seletor XPath direto para pegar o número de 12 dígitos da conta.
- [x] Implementar a captura do identificador da Região (`us-east-1` etc).
- [x] Instanciar o `MutationObserver` no nó raiz de navegação (SPA) com debounce de ~300ms.

## FT1.2: Motor de Correspondência de Regras
- [x] Função `matchRule(accountId, region)` que cruza a leitura da DOM com o array armazenado.

## FT1.3 e FT1.4: Injeção de Borda e Etiqueta (Badge)
- [x] Função `drawBorder(color)` que cria dinamicamente o `div` no topo do body.
- [x] Função `drawBadge(alias, region, color)` que injeta o badge flutuante.
- [x] Função `removeUI()` que limpa a tela se o dev mudou para uma conta não mapeada.
- [x] Implementar listener `chrome.runtime.onMessage` para escutar ordens de "Reload" emitidas pelo Options via Background.
