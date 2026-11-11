# Padrões de design dos apps

> Arquivo de contexto para o agente de IA. Leia este arquivo inteiro antes de criar ou alterar qualquer tela.
> Em caso de conflito entre este arquivo e um prompt pontual, siga este arquivo e avise o piloto.

## 0. Ambiente

- Todo app deste workshop aponta para o ambiente de playground: `https://wkf10640.apps.dynatrace.com/` (campo `environmentUrl` do app.config). Nunca altere para outro ambiente.
- Este arquivo vale para qualquer assistente de IA. Se a sua ferramenta não carrega arquivos de instruções sozinha, o primeiro prompt manda lê-lo (Passo 0 dos cartões de prompt).

## 1. Princípios

1. **Strato primeiro.** Use componentes do Strato Design System sempre que existir um equivalente. Nunca escreva CSS próprio nem HTML cru para algo que o Strato já oferece.
2. **Consulte o MCP antes de implementar.** Use as ferramentas do `dt-app-mcp` para confirmar componente, props, tipos e imports (`list_strato_components`, `get_strato_component`, `get_strato_usecases`) e os padrões de experiência (`get_experience_standard`). Não adivinhe a API de um componente.
3. **Sem bibliotecas externas de UI, mapas ou gráficos.** Para mapas, use `@dynatrace/strato-geo`. Para qualquer outra dependência nova, pare e peça confirmação ao piloto.
4. **Pequeno e verificável.** Entregue um passo por vez e deixe `npm run build` e `npm run lint` passarem sem erros antes de seguir.

## 2. Estrutura de página

- Raiz da página: `Flex` em coluna, com `padding={32}` e `gap={16}`.
- Título da página com `Heading`.
- Ordem do conteúdo: título, indicadores (KPIs), visualização principal (mapa ou gráfico), detalhes (tabela).
- Uma página por responsabilidade. Páginas ficam em `ui/app/pages/`, componentes reutilizáveis em `ui/app/components/`, dados de exemplo em `ui/app/data/`.

## 3. Componentes

- **Tabelas:** `DataTable` do Strato, com `loading` ligado ao estado da consulta e `fullWidth`. Use `DataTable.Pagination` quando houver mais de 10 linhas.
- **Mapas:** `MapView` e camadas (por exemplo `DotLayer`) de `@dynatrace/strato-geo`.
  - A prop `height` do `MapView` é obrigatória. A largura segue o container.
  - Cada ponto precisa de `latitude` e `longitude`.
  - Sempre inclua legenda e tooltip com o nome e o valor principal do ponto.
- **Dados do Grail:** hook `useDql` de `@dynatrace-sdk/react-hooks`. Mantenha cada query DQL em uma constante fora do componente.
- **Imports:** os componentes ficam em subpacotes de `@dynatrace/strato-components` (por exemplo `/layouts`, `/typography`, `/tables`) e os ícones em `@dynatrace/strato-icons`. Confirme o caminho exato com `get_strato_component`.

## 4. Estados obrigatórios

Todo bloco que mostra dados trata **os três estados**:

| Estado | Comportamento |
|---|---|
| Carregando | Indicador de loading do próprio componente (por exemplo `loading` no `DataTable`) |
| Erro | Mensagem curta em português com o que aconteceu e o que tentar |
| Vazio | Mensagem que explica por que não há dados e sugere uma ação (ampliar o período, remover filtros) |

## 5. Cor e status

- Não use cores hexadecimais nem estilos inline. Use os design tokens e as opções de cor dos componentes do Strato (consulte o MCP para o nome correto).
- Status padrão: `ok`, `atenção` e `crítico`.
- **Nunca comunique status só por cor.** Combine cor com texto, ícone ou forma.

## 6. Texto e formatação

- Todo texto de interface em **português do Brasil**, em *sentence case* (só a primeira palavra e nomes próprios em maiúscula), sem ponto final em títulos.
- Botões e ações com verbo no infinitivo: "Filtrar", "Exportar", "Limpar filtros".
- Números e datas no formato pt-BR (`Intl.NumberFormat('pt-BR')` e `Intl.DateTimeFormat('pt-BR')`).
- Unidades sempre visíveis (ms, %, req/min).

## 7. Código

- TypeScript sem `any`. Tipos explícitos para os registros que vêm de DQL ou do mock.
- Um componente por arquivo, com nome em PascalCase.
- Extraia constantes (queries, colunas, textos) em vez de repeti-las.
- Não deixe `console.log`, código comentado nem componentes sem uso.
- Mock e dado real devem passar pelo mesmo caminho de código (mesma interface de dados), alternados por uma flag como `USE_MOCK`.

## 8. Acessibilidade

- Contraste e foco vêm dos componentes do Strato. Não sobrescreva.
- Toda informação do tooltip também deve estar disponível em outro lugar (por exemplo na tabela).
- Elementos interativos precisam de rótulo textual.

## 9. Checklist antes de dizer que terminou

- [ ] `npm run build` passa sem erros
- [ ] `npm run lint` passa sem erros
- [ ] Nenhum componente ou biblioteca fora do Strato foi adicionado
- [ ] Loading, erro e vazio tratados em cada bloco de dados
- [ ] Status comunicado por mais do que cor
- [ ] Textos em português do Brasil, em sentence case
- [ ] O app abre com `npx dt-app dev` e mostra dados (mock ou reais)
