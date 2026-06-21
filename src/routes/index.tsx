import { createFileRoute } from "@tanstack/react-router";

import { DeliverableExplorer } from "@/components/deliverable-explorer";
import { DELIVERABLES } from "@/content/deliverables";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CMS CSV — Portal de Entregáveis" },
      {
        name: "description",
        content:
          "Diretório central de relatórios, dashboards, documentos e assets do Grupo CSV.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          /home
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Todos os entregáveis
        </h1>
        <p className="text-sm text-muted-foreground">
          Navegue por todo o acervo do Grupo CSV ou selecione uma categoria na
          barra lateral.
        </p>
      </header>

      <DeliverableExplorer items={DELIVERABLES} />
    </div>
  );
}
