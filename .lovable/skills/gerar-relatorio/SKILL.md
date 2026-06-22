---
name: gerar-relatorio
description: >-
  Use when the user asks to create a custom route or page for a specific report or dashboard in the CMS-CSV. This skill ensures the report uses the correct layout, components, and design system.
---

# Skill: Gerar Relatorio Customizado

Sempre que precisar criar a pagina de detalhes de um entregavel especifico (relatorio, dashboard), siga estas regras.

## Roteamento (TanStack Router)

1. Criar o arquivo na pasta `src/routes/`.
2. O nome do arquivo deve corresponder ao `customRoute` definido no `deliverables.ts`.
3. A rota e renderizada dentro do `<Outlet />` do `__root.tsx`.

## Design System

1. Cores: APENAS as definidas no projeto (Background #0B0F17, Surface #131B2B, Primary #3B82F6, Borders #1E2A40, Foreground #E6EDF3).
2. Tipografia: `Inter` para texto, `JetBrains Mono` para numeros e dados.
3. Graficos: Recharts (via shadcn/ui charts). Minimalistas, sem gridlines excessivas. Cores do grafico devem usar variacoes do Primary (#3B82F6).
4. Cards: Envolver secoes de dados em `<Card>` do shadcn com bg surface e bordas sutis.

## Estrutura da Pagina

1. Header: Titulo, versao, data de atualizacao, breadcrumb ou botao Voltar.
2. KPIs (topo): Grid com 3-4 Cards mostrando numeros principais em fonte grande (JetBrains Mono).
3. Conteudo principal: Graficos ou tabelas de dados.
4. Changelog (rodape): Pequena secao listando mudancas da versao.

## Regras Estritas

- NAO criar requisicoes a APIs externas.
- Dados do relatorio devem ser mockados diretamente no arquivo da rota ou em arquivo auxiliar em `src/content/`.
- NAO usar cores fora da paleta definida.
- NAO usar sombras grandes (shadow-xl, shadow-2xl).
