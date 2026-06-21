export type Category = "relatorios" | "dashboards" | "documentos" | "assets";

export type IconKind = "chart" | "doc" | "image" | "folder" | "kpi";

export type Deliverable = {
  slug: string;
  title: string;
  category: Category;
  description: string;
  updatedAt: string; // ISO date
  owner: string;
  tags: string[];
  icon: IconKind;
  /** If set, the card links here instead of the generic /entregaveis/$slug page. */
  customRoute?: string;
};

export const CATEGORIES: { id: Category; label: string; path: string }[] = [
  { id: "relatorios", label: "Relatórios", path: "/relatorios" },
  { id: "dashboards", label: "Dashboards", path: "/dashboards" },
  { id: "documentos", label: "Documentos", path: "/documentos" },
  { id: "assets", label: "Assets", path: "/assets" },
];

export const DELIVERABLES: Deliverable[] = [
  {
    slug: "relatorio-q3-2026",
    title: "Relatório Q3 2026",
    category: "relatorios",
    description: "Consolidação trimestral de performance comercial e operacional.",
    updatedAt: "2026-06-18",
    owner: "Thera Tech",
    tags: ["financeiro", "trimestral"],
    icon: "chart",
  },
  {
    slug: "analise-churn-junho",
    title: "Análise de Churn — Junho",
    category: "relatorios",
    description: "Estudo detalhado das causas de churn no mês corrente.",
    updatedAt: "2026-06-12",
    owner: "CX",
    tags: ["churn", "retenção"],
    icon: "chart",
  },
  {
    slug: "auditoria-processos",
    title: "Auditoria de Processos Internos",
    category: "relatorios",
    description: "Levantamento de gargalos e oportunidades de automação.",
    updatedAt: "2026-05-30",
    owner: "Operações",
    tags: ["processos"],
    icon: "doc",
  },
  {
    slug: "kpis-comercial",
    title: "Dashboard Comercial",
    category: "dashboards",
    description: "KPIs de pipeline, conversão e ticket médio em tempo real.",
    updatedAt: "2026-06-20",
    owner: "Comercial",
    tags: ["vendas", "kpi"],
    icon: "kpi",
  },
  {
    slug: "saude-operacional",
    title: "Saúde Operacional",
    category: "dashboards",
    description: "Indicadores de SLA, incidentes e capacidade.",
    updatedAt: "2026-06-19",
    owner: "Operações",
    tags: ["sla", "ops"],
    icon: "kpi",
  },
  {
    slug: "manual-marca-csv",
    title: "Manual de Marca CSV",
    category: "documentos",
    description: "Diretrizes de uso da marca, logo, cores e tipografia.",
    updatedAt: "2026-04-10",
    owner: "Marketing",
    tags: ["brand", "guideline"],
    icon: "doc",
  },
  {
    slug: "politica-seguranca",
    title: "Política de Segurança da Informação",
    category: "documentos",
    description: "Documento oficial de práticas, acessos e classificação de dados.",
    updatedAt: "2026-03-22",
    owner: "Compliance",
    tags: ["segurança", "policy"],
    icon: "doc",
  },
  {
    slug: "logos-csv",
    title: "Logos CSV",
    category: "assets",
    description: "Pacote de logos em SVG, PNG e variações monocromáticas.",
    updatedAt: "2026-02-14",
    owner: "Design",
    tags: ["logo", "download"],
    icon: "image",
  },
  {
    slug: "biblioteca-icones",
    title: "Biblioteca de Ícones",
    category: "assets",
    description: "Conjunto de ícones internos padronizados para apresentações.",
    updatedAt: "2026-05-02",
    owner: "Design",
    tags: ["icons"],
    icon: "folder",
  },
];

export function getByCategory(category: Category) {
  return DELIVERABLES.filter((d) => d.category === category);
}

export function getBySlug(slug: string) {
  return DELIVERABLES.find((d) => d.slug === slug);
}

export function getRecent(limit = 5) {
  return [...DELIVERABLES]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, limit);
}

export function categoryLabel(c: Category) {
  return CATEGORIES.find((x) => x.id === c)?.label ?? c;
}
