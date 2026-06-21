<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md — CMS-CSV (thera-tech/cms-csv)

## Visao Geral

Portal de Entregaveis Interno do Grupo CSV. Interface estatica estilo "explorador de arquivos corporativo" (dark mode), sem backend. O Lovable atua exclusivamente como gerador de UI; o estado e a logica ficam no codigo versionado.

## Regras Arquiteturais (Inviolaveis)

| Regra | Descricao |
|---|---|
| Zero Backend | PROIBIDO criar integracoes com Supabase, Firebase, Lovable Cloud ou qualquer banco de dados. O array estatico em `src/content/deliverables.ts` e a unica fonte da verdade. |
| Sem Auth | PROIBIDO implementar autenticacao. Este e um portal interno sem controle de acesso. |
| Design System Estrito | PROIBIDO alterar a paleta de cores ou introduzir fontes nao autorizadas. Ver secao "Design System" abaixo. |
| Sem Emojis na UI | PROIBIDO usar emojis. Usar exclusivamente icones da biblioteca `lucide-react`. |
| TanStack Router | Manter roteamento file-based em `src/routes/`. Nao migrar para React Router DOM. |

## Design System

| Token | Valor | Uso |
|---|---|---|
| Background | `#0B0F17` | Fundo principal da aplicacao |
| Surface | `#131B2B` | Cards, sidebar, modais |
| Foreground | `#E6EDF3` | Texto principal |
| Primary | `#3B82F6` | Botoes, focus rings, acoes |
| Borders | `#1E2A40` | Divisorias, bordas de cards |

Tipografia: `Inter` (UI geral), `JetBrains Mono` (metadados, datas, IDs).

## Como Adicionar um Entregavel

1. Editar `src/content/deliverables.ts` e adicionar um novo objeto ao array `DELIVERABLES`, respeitando o tipo `Deliverable`.
2. Se o entregavel precisar de uma pagina customizada, criar um arquivo em `src/routes/` com o nome correspondente ao `customRoute`.
3. Se houver thumbnail, colocar o PNG em `public/previews/` com o nome do slug.

## Tipo Deliverable (Expandido)

```typescript
export type Status = 'draft' | 'published' | 'archived';
export type Deliverable = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  description: string;
  updatedAt: string;
  owner: string;
  createdBy: 'manus' | 'lovable' | 'claude' | 'human';
  source?: string;
  version: string;
  status: Status;
  tags: string[];
  icon: IconKind;
  customRoute?: string;
  thumbnailUrl?: string;
  changelog?: { date: string; changes: string }[];
};
```

## Pipeline de Automacao (MCP)

O CMS e alimentado programaticamente por agentes via Lovable MCP Server (`https://mcp.lovable.dev`):
1. Manus edita `deliverables.ts` via GitHub push.
2. Manus usa `send_message` para instruir o Lovable a gerar a rota customizada.
3. Manus usa `deploy_project` para publicar.

## Convencoes de Commit

Mensagens em portugues, atomicas e descritivas. Exemplos:
- `feat: adiciona entregavel relatorio-q3-2026`
- `fix: corrige tipografia no card de dashboard`
- `refactor: expande tipo Deliverable com metadados enterprise`
