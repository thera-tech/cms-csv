---
name: design-system-csv
description: >-
  Use when the user asks to adjust styles, fix layout issues, or when you are creating new UI components. This skill enforces the strict corporate design system of the CSV ecosystem.
---

# Skill: Design System CSV

O CMS-CSV e uma ferramenta corporativa interna. O design deve refletir seriedade, densidade de dados e minimalismo.

## Paleta de Cores (Tailwind)

NUNCA invente cores. Use estritamente:

| Token | Valor | Uso |
|---|---|---|
| Background | #0B0F17 | Fundo principal da aplicacao |
| Surface | #131B2B | Cards, sidebar, modais |
| Foreground | #E6EDF3 | Texto principal |
| Muted | slate-400 | Texto secundario, placeholders |
| Primary | #3B82F6 | Acoes principais, botoes, focus rings |
| Borders | #1E2A40 | Bordas de cards, divisorias |

## Tipografia

- UI geral: font-sans (Inter). Usar text-sm para alta densidade.
- Dados e metadados: font-mono (JetBrains Mono). Datas, IDs, versoes, numeros.

## Microinteracoes

- Hover cards: hover:bg-[#1E2A40] transition-colors duration-200
- Focus: focus-visible:ring-1 focus-visible:ring-[#3B82F6]
- NAO usar scale-105 ou transformacoes exageradas.

## Anti-Patterns (PROIBIDO)

- Sombras grandes (shadow-xl, shadow-2xl). Design flat com bordas sutis.
- Bordas muito arredondadas. Maximo: rounded-lg.
- Cores de sucesso/erro como fundo de areas grandes. Apenas em badges pequenos.
- Emojis na UI. Usar exclusivamente lucide-react.
- Gradientes chamativos. Manter superficies solidas.
- Lorem ipsum. Usar conteudo real ou mocks realistas.

## Componentes Base

Usar sempre os componentes do shadcn/ui como primitivos:
- Card, Button, Badge, Input, Separator, Sidebar, Breadcrumb, Table, Tabs.
- NAO reinventar componentes que ja existem no shadcn.
