# Cheat sheet: React, Strato e DQL em uma página

## React em quatro ideias
| Ideia | Em uma frase |
|---|---|
| Componente | Função que devolve interface. O app é uma árvore de componentes. |
| Props | Entradas do componente, como `columns` e `data` do `DataTable`. |
| Estado | Dado que muda e redesenha a tela (por exemplo, o filtro escolhido). |
| Hooks | Funções `use...` que ligam o componente a estado e dados, como `useState` e `useDql`. |

## Anatomia do projeto
| Caminho | Para quê |
|---|---|
| `ui/` | Telas e componentes React, por exemplo `ui/app/pages/Home.tsx` |
| `api/` | Funções serverless opcionais |
| `app.config.json` | Identidade, versão e escopos do app |
| `CLAUDE.md` | Instruções do projeto para a IA |
| `design-standards.md` | Padrões de design do time (kit do workshop) |

> VALIDAR com um `npx dt-app create` real antes do evento.

## Comandos
```bash
npx dt-app create nome-do-app     # novo projeto
npx dt-app dev                    # preview local
npm run build && npm run lint     # portão de qualidade
npx dt-app deploy                 # opcional hoje; use app ID único por time
```

## Um componente completo
```tsx
const QUERY = 'fetch logs, from: now() - 24h | fields timestamp, content';

export const Home = () => {
  const { data, isLoading } = useDql<Registro>({ query: QUERY });
  return (
    <Flex flexDirection="column" padding={32} gap={16}>
      <Heading>Título da página</Heading>
      <DataTable columns={columns} data={data?.records ?? []} loading={isLoading} fullWidth />
    </Flex>
  );
};
```

## DQL em cinco comandos
| Comando | Exemplo |
|---|---|
| `fetch` | `fetch logs, from: now() - 24h` |
| `filter` | `\| filter loglevel == "ERROR"` |
| `fields` | `\| fields timestamp, content` |
| `summarize` | `\| summarize count(), by: {loglevel}` |
| `sort` e `limit` | `\| sort timestamp desc \| limit 100` |

## Mapa
```tsx
import { MapView, DotLayer } from '@dynatrace/strato-geo';

<MapView height={420} initialViewState={{ latitude: -15, longitude: -50, zoom: 3 }}>
  <DotLayer data={pontos} />   {/* cada ponto: latitude e longitude no mínimo */}
</MapView>
```
- `height` é obrigatória; a largura segue o container.
- `DotLayer` aceita forma, ícone, emoji, `bearing` (rotação), tooltip e cores.

## Quando travar
1. Leia o erro e cole a mensagem completa no prompt.
2. Consulte developer.dynatrace.com ou chame um especialista.
3. Volte ao último commit que funcionava e tente um passo menor.
