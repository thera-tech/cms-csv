import { createFileRoute } from "@tanstack/react-router";

import { DeliverableExplorer } from "@/components/deliverable-explorer";
import { categoryLabel, getByCategory } from "@/content/deliverables";

export const Route = createFileRoute("/relatorios")({
  head: () => ({
    meta: [
      { title: "Relatórios — CMS CSV" },
      {
        name: "description",
        content: "Relatórios consolidados, análises e auditorias do Grupo CSV.",
      },
    ],
  }),
  component: RelatoriosPage,
});

function RelatoriosPage() {
  const items = getByCategory("relatorios");
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          /relatorios
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {categoryLabel("relatorios")}
        </h1>
        <p className="text-sm text-muted-foreground">
          Documentos analíticos publicados pelas áreas do grupo.
        </p>
      </header>
      <DeliverableExplorer items={items} />
    </div>
  );
}
