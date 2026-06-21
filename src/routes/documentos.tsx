import { createFileRoute } from "@tanstack/react-router";

import { DeliverableExplorer } from "@/components/deliverable-explorer";
import { categoryLabel, getByCategory } from "@/content/deliverables";

export const Route = createFileRoute("/documentos")({
  head: () => ({
    meta: [
      { title: "Documentos — CMS CSV" },
      {
        name: "description",
        content: "Manuais, políticas e guias oficiais do Grupo CSV.",
      },
    ],
  }),
  component: DocumentosPage,
});

function DocumentosPage() {
  const items = getByCategory("documentos");
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          /documentos
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {categoryLabel("documentos")}
        </h1>
        <p className="text-sm text-muted-foreground">
          Documentação oficial, políticas e materiais de referência.
        </p>
      </header>
      <DeliverableExplorer items={items} />
    </div>
  );
}
