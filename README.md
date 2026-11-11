# Starter kit do workshop: apps Dynatrace com IA

Repositório: https://github.com/aborigene/ai-builders-starter-kit

## O que tem aqui
| Arquivo | Para quê | Onde colocar |
|---|---|---|
| `design-standards.md` | Padrões de design lidos pelo agente | Raiz do projeto |
| `ui/app/data/pontos.ts` | 6 pontos com lat/long e status (demo e follow-along) | `ui/app/data/` |
| `ui/app/data/telemetria-ficticia.ts` | Volta fictícia com velocidade e direção (tema telemetria) | `ui/app/data/` |
| `cartoes-de-prompt.md` | Caminho guiado, recuperação de erros, dados e mapas avançados | Distribuir aos times |
| `cheatsheet-react-strato.md` | React, Strato e DQL em uma página | Imprimir e distribuir |
| `ficha-do-time.md` | Canvas de escopo, combinados e roteiro do pitch | Imprimir, uma por time |

## Ambiente do workshop
Todos os apps apontam para o ambiente de playground: `https://wkf10640.apps.dynatrace.com/`.
- Projeto novo: `npx dt-app create meu-app --environment-url https://wkf10640.apps.dynatrace.com/`
- Projeto existente: ajuste `environmentUrl` no app.config do projeto.
- Alternativa: variável de ambiente `DT_APP_ENVIRONMENT_URL`.

## Como montar o projeto de cada participante
1. `node --version` deve começar com `v24` e o VS Code deve ser 1.102 ou superior.
2. `git clone https://github.com/aborigene/ai-builders-starter-kit`
3. `npx dt-app create meu-app --environment-url https://wkf10640.apps.dynatrace.com/`
4. Registrar o MCP `dt-app-mcp` no seu assistente de IA (veja abaixo).
5. Copiar `design-standards.md` para a raiz do projeto e a pasta `ui/app/data/` para dentro de `ui/app/`.
6. No primeiro prompt da sessão, usar o **Passo 0** de `cartoes-de-prompt.md`.
7. `npx dt-app dev` e abrir o app.

## Usando outro assistente de IA (não só Claude Code)
O App Toolkit 1.10 ou superior cria o `CLAUDE.md` na raiz. A documentação aceita também `AGENTS.md`; o conteúdo é o mesmo.
| Cenário | O que fazer |
|---|---|
| Claude Code | `claude mcp add dt-app-mcp -- npx -y dt-app-mcp` e conferir com `/mcp` |
| VS Code com a extensão Dynatrace Apps | A extensão registra o `dt-app-mcp` sozinha |
| Outro assistente (VS Code, Cursor e outros) | Na configuração JSON de MCP da ferramenta, adicione `command: "npx"` e `args: ["-y", "dt-app-mcp"]` e reinicie a ferramenta |
| Qualquer assistente | O **Passo 0** manda o assistente ler `CLAUDE.md` (ou `AGENTS.md`) e `design-standards.md`. Se ele não acessa os arquivos, cole o conteúdo no chat |

Para conferir o MCP em qualquer ferramenta, pergunte: "Qual componente Strato posso usar para exibir o valor numérico de uma query DQL?". O assistente deve chamar ferramentas do `dt-app-mcp` antes de responder. Use um modelo capaz (a documentação cita Claude Sonnet e Opus como exemplos).

## Dados simulados fazem parte do prompt
- **Arquivo local:** peça no prompt a criação de `ui/app/data/*.ts` (como `pontos.ts`).
- **Query inline:** comando `data` do DQL (veja `MOCK_QUERY` em `pontos.ts`).
- **Workflow no Dynatrace:** peça ao agente que crie um workflow gerador de dados, pelo MCP da plataforma ou com `dtctl apply -f workflow.yaml` (exige `dtctl` instalado e autenticado no playground com `dtctl auth login`).

## Para os facilitadores: validar antes do evento
- Acesso de todos os participantes ao playground.
- Estrutura de pastas e `app.config` de um projeto recém-criado (em versões novas pode ser `app.config.ts`).
- Sintaxe do comando `data` do DQL (`MOCK_QUERY` em `pontos.ts`) no playground.
- Permissões para criar workflows e ingerir dados no playground, se o caminho do workflow for usado.
- Nomes das ferramentas do `dt-app-mcp` (variam entre versões da documentação).
- O prompt da demo (mapa e tabela, com e sem MCP): ensaiar 2 a 3 vezes.
- Imports exatos de `MapView`, `DotLayer` e dos componentes Strato 3 (o próprio MCP mostra).

## Votação
Cédula de papel com o nome do participante e somente o app votado. Na apuração, descarte votos no próprio time.
