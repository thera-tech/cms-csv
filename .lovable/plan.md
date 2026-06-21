## CMS-CSV — Portal de Entregáveis Interno

Interface estática estilo "pasta corporativa" (Finder/Explorer escuro), 100% no código (sem backend), com sidebar de categorias e área principal de cards. Cada entregável futuro vira uma nova rota.

### Stack e arquitetura

- TanStack Router (file-based em `src/routes/`) — mantém o padrão do template, rotas type-safe equivalentes à proposta com React Router.
- Tailwind v4 + shadcn/ui já presentes.
- Zero backend: nada de Lovable Cloud/Supabase. Dados dos entregáveis vivem em `src/content/deliverables.ts` (array tipado), facilmente editável via GitHub.
- Sem placeholders genéricos: index é a Home do CMS.

### Direção visual — "Explorer escuro corporativo"

- Paleta (tokens em `src/styles.css`): bg `#0B0F17`, surface `#131B2B`, foreground `#E6EDF3`, primary `#3B82F6`, borders sutis `#1E2A40`.
- Tipografia: Inter via `@fontsource/inter` para UI densa e neutra; JetBrains Mono para metadados (datas, ids, paths).
- Microinterações discretas (hover lift nos cards, focus rings azuis), nada exuberante — sensação de ferramenta interna.

### Layout

```text
┌──────────────┬───────────────────────────────────────────┐
│  CSV ▸ CMS   │  Breadcrumb: Home / Relatórios            │
│              │  ───────────────────────────────────────  │
│  ▸ Relatórios│  [Buscar entregáveis...]   [grid|lista]   │
│  ▸ Dashboards│                                            │
│  ▸ Documentos│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐         │
│  ▸ Assets    │   │ 📊  │ │ 📈  │ │ 📄  │ │ 🗂  │         │
│              │   │Rel Q3│ │KPIs │ │Manual││Brand│         │
│  ─────       │   └─────┘ └─────┘ └─────┘ └─────┘         │
│  Recentes    │                                            │
│  Favoritos   │                                            │
└──────────────┴───────────────────────────────────────────┘
```

- Sidebar colapsável (`shadcn/ui sidebar`, `collapsible="icon"`) com as 4 categorias + seção "Recentes".
- Header com breadcrumb dinâmico baseado na rota + toggle grid/lista + busca local (filter no array).
- Cards: ícone (lucide), título, categoria, data, tags, owner.

### Estrutura de rotas

```text
src/routes/
  __root.tsx                 → shell (SidebarProvider + Sidebar + Outlet)
  index.tsx                  → Home: todos os entregáveis (grid)
  relatorios.tsx             → lista filtrada por categoria
  dashboards.tsx
  documentos.tsx
  assets.tsx
  entregaveis.$slug.tsx      → página de detalhe genérica (renderiza um deliverable)
```

Entregáveis futuros que exijam layout customizado (ex.: `/entregaveis/relatorio-q3` com gráficos próprios) ganham seu próprio arquivo de rota substituindo o handler genérico — exatamente o fluxo "CMS por código + GitHub" pedido.

### Modelo de dados (estático)

```ts
// src/content/deliverables.ts
export type Category = 'relatorios' | 'dashboards' | 'documentos' | 'assets';
export type Deliverable = {
  slug: string; title: string; category: Category;
  description: string; updatedAt: string; owner: string;
  tags: string[]; icon: 'chart' | 'doc' | 'image' | 'folder';
  customRoute?: string; // se definido, card linka para rota dedicada
};
```

4 categorias × ~3 itens de exemplo mockados para mostrar o padrão visual.

### SEO / head

- Título: "CMS CSV — Portal de Entregáveis".
- Cada rota de categoria com `head()` próprio (título + description).
- Sem og:image no root.

### Entregas desta primeira iteração

1. Tokens de design escuros em `src/styles.css` + fonte Inter/JetBrains Mono.
2. `AppSidebar` com 4 categorias + estado ativo via `useRouterState`.
3. `__root.tsx` envolvendo Outlet em `SidebarProvider`, header com breadcrumb + `SidebarTrigger`.
4. Componentes: `DeliverableCard`, `DeliverableGrid`, `SearchBar`, `ViewToggle` (grid/lista persistido em `localStorage`).
5. Rotas: home + 4 categorias + rota dinâmica `entregaveis.$slug.tsx` (página de detalhe padrão com metadados + bloco de conteúdo placeholder).
6. `src/content/deliverables.ts` com mocks por categoria.
7. README curto explicando como adicionar um novo entregável (editar `deliverables.ts` ou criar nova rota e apontar `customRoute`).

### Fora do escopo (combinado)

- Sem auth, sem banco, sem upload de arquivos.
- Sem React Router DOM (uso TanStack Router, mantendo URLs limpas equivalentes).
- Conexão com GitHub `thera-tech/cms-csv` é feita pelo usuário via integração do Lovable — não preciso configurar nada no código.