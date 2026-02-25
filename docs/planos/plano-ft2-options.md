# Plano de Trabalho - Gestão de Regras / Options (Épico 2)
**Artefato**: AWS Environment Border Guard

## FT2.1: Interface (UI) do Painel de Opções
- [x] Criar `src/options/options.html` listando a estrutura (Header, Lista de Regras, Botões).
- [x] Criar `src/options/options.css` adotando um design limpo (simulando Material ou algo Cloud-Native).
- [x] Mapear SVGs/Ícones locais para lixeiras ou avisos.

## FT2.2: Formulário de Cadastro de Regra (CRUD)
- [x] Criar JS para capturar inputs (Validar se Account ID contém exatamente 12 números).
- [x] Logica de Adicionar Nova Regra (Append no array via Storage).
- [x] Logica de Excluir Regra.
- [x] Logica de Listagem (Iterar no DOM para mostrar tabela/cards de regras atuais).
- [x] Salvar as mudanças no Storage e notificar sucesso pro usuário (Toast).

## FT2.3: Importação/Exportação de Regras (.json)
- [x] Botão de "Baixar Regras": JS gera um Blob JSON com a configuração local e trigga o download.
- [x] Botão de "Subir Regras": Elemento `<input type="file">` oculto. JS faz *File Reader* do JSON.
- [x] Validar esquema estrutural do JSON importado antes de fundir com a base e evitar corrompimento do Storage.
