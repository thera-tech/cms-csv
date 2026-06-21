import { createFileRoute } from "@tanstack/react-router";

import { DeliverableExplorer } from "@/components/deliverable-explorer";
import { categoryLabel, getByCategory } from "@/content/deliverables";

export const Route = createFileRoute("/dashboards")({
  head: () => ({
    meta: [
      { title: "Dashboards — CMS CSV" },
      {
        name: "description",
        content: "Painéis visuais com KPIs e indicadores das operações CSV.",
      },
    ],
  }),
  component: DashboardsPage,
});

function DashboardsPage() {
  const items = getByCategory("dashboards");
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          /dashboards
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {categoryLabel("dashboards")}
        </h1>
        <p className="text-sm text-muted-foreground">
          Painéis visuais com KPIs e indicadores de acompanhamento.
        </p>
      </header>
      <DeliverableExplorer items={items} />
    </div>
  );
}
