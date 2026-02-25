# AWS Environment Border Guard 🛡️ - Documento de Intenção

## Visão Geral do Projeto
Extensão para navegadores baseados em Chromium focada em aumentar a segurança operacional de engenheiros e desenvolvedores na AWS. Através de identificação visual inconfundível (borda global colorida e etiqueta), o usuário saberá instantaneamente em qual conta, ambiente e região está operando, prevenindo ações acidentais em ambientes críticos (ex: Produção).

## Problema a ser resolvido
O AWS Management Console possui interface idêntica para todas as contas e ambientes. Alternar constantemente entre clientes e ambientes aumenta o risco de erros operacionais graves por conta de confusão de contexto.

## Solução e Benefício Esperado
Monitoramento passivo da navegação no console AWS. Ao identificar o Account ID e Região (Region) na página, a extensão cruza com uma base de regras locais configuradas pelo usuário e injeta uma borda colorida invasiva (mas que não bloqueia cliques - `pointer-events: none`) e uma etiqueta flutuante com o Alias da conta e a Região correspondente. O benefício é evitar erros humanos pela cognição visual imediata e contínua do ambiente atual.

## Maturidade da Ideia
- **Fase Inicial:** Desenvolvimento 100% do zero, visando primeiramente um MVP focado nas mecânicas principais de injeção visual e leitura estática.

## Público e Distribuição
- **Público:** Engenheiros Cloud, DevOps e Desenvolvedores.
- **Distribuição:** O foco principal será a publicação na Chrome Web Store para facilitar o acesso. Um instalador local (modo desenvolvedor/unpacked) também será disponibilizado.
- **Experiência do Usuário (UX):** Necessidade de uma tela de opções (Options) com visual caprichado e *onboarding* intuitivo para garantir boas avaliações na Store.

## Principais Funcionalidades / Requisitos Intencionais
- **Mapeamento:** Cadastro de Account ID associado a um Alias e uma Cor específica.
- **Injeção Visual:** Borda global colorida contornando a página toda e Etiqueta (Badge) flutuante exibindo `[Alias - Região]`.
- **Sincronização:** Sincronização de regras via `chrome.storage.sync` através da conta Google do usuário.
- **Portabilidade de Regras:** Funcionalidade de importar e exportar as configurações (JSON), facilitando o compartilhamento de configurações entre membros da equipe.
- **Stack Tecnológica:** Chrome Extension API (Manifest V3), Vanilla JavaScript, HTML5, CSS3.

## Concorrentes e Diferencial
Existem soluções ativas como *AWS Extend Switch Roles* e *AWS Console Colors*, mas o foco do **Border Guard** será a simplicidade passiva e o forte apelo visual estrito (borda + etiqueta local e regionalizada), sem manipulação ativa de roles/sessões, diminuindo o atrito e não quebrando com as atualizações da AWS.
