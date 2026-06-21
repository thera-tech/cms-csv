# CMS-CSV — Como adicionar um entregável

Tudo vive no código. Sem backend, sem banco.

## 1) Entregável simples (página de detalhe padrão)

Adicione um item em `src/content/deliverables.ts`:

```ts
{
  slug: "meu-novo-relatorio",
  title: "Meu Novo Relatório",
  category: "relatorios",
  description: "...",
  updatedAt: "2026-06-21",
  owner: "Time X",
  tags: ["tag1"],
  icon: "chart",
}
```

Ele aparece automaticamente no diretório e na categoria escolhida, acessível
em `/entregaveis/meu-novo-relatorio`.

## 2) Entregável com layout customizado

1. Crie a rota: `src/routes/entregaveis.meu-novo-relatorio.tsx`
   (use `createFileRoute("/entregaveis/meu-novo-relatorio")`).
2. No item do `deliverables.ts`, defina `customRoute: "/entregaveis/meu-novo-relatorio"`.

O card passa a apontar para a rota dedicada.

## Categorias

Definidas em `src/content/deliverables.ts` na constante `CATEGORIES`. Para
adicionar uma nova categoria, atualize o tipo `Category`, o array `CATEGORIES`,
e crie a rota correspondente em `src/routes/<categoria>.tsx`.
