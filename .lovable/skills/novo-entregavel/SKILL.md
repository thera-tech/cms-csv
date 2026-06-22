---
name: novo-entregavel
description: >-
  Use when you need to add a new deliverable (report, dashboard, document, asset) to the CMS-CSV. This skill ensures the deliverable is correctly registered in the static data array with all required enterprise metadata.
---

# Skill: Adicionar Novo Entregavel

Sempre que o usuario pedir para adicionar um novo entregavel ao CMS-CSV, voce deve atualizar o arquivo `src/content/deliverables.ts`.

## Regras Obrigatorias

1. O objeto adicionado deve respeitar o tipo `Deliverable` definido no projeto.
2. Preencher obrigatoriamente: `id`, `slug`, `title`, `category`, `description`, `updatedAt`, `owner`, `createdBy`, `version`, `status`, `tags`, `icon`.
3. Campos opcionais: `source`, `customRoute`, `thumbnailUrl`, `changelog`.
4. Nao criar backends, APIs ou bancos de dados. O array estatico e a unica fonte da verdade.

## Template de Insercao

```typescript
{
  id: "exemplo-slug",
  slug: "exemplo-slug",
  title: "Titulo do Entregavel",
  category: "relatorios", // relatorios | dashboards | documentos | assets
  description: "Descricao curta e objetiva.",
  updatedAt: "2026-06-21",
  owner: "Guilherme Thome",
  createdBy: "lovable", // manus | lovable | claude | human
  version: "1.0.0",
  status: "published", // draft | published | archived
  tags: ["tag1", "tag2"],
  icon: "chart", // chart | doc | image | folder | kpi
  customRoute: "/entregaveis/exemplo-slug", // opcional
  thumbnailUrl: "/previews/exemplo-slug.png", // opcional
  changelog: [
    { date: "2026-06-21", changes: "Criacao inicial" }
  ]
}
```

## Apos Adicionar

Pergunte ao usuario se ele deseja que voce crie a rota customizada para este entregavel. Se sim, use a skill `/gerar-relatorio`.
