import { createFileRoute } from "@tanstack/react-router";

import { DeliverableExplorer } from "@/components/deliverable-explorer";
import { categoryLabel, getByCategory } from "@/content/deliverables";

export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "Assets — CMS CSV" },
      {
        name: "description",
        content: "Logos, ícones e materiais visuais de marca do Grupo CSV.",
      },
    ],
  }),
  component: AssetsPage,
});

function AssetsPage() {
  const items = getByCategory("assets");
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="space-y-1">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          /assets
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {categoryLabel("assets")}
        </h1>
        <p className="text-sm text-muted-foreground">
          Logos, ícones e materiais visuais para uso interno.
        </p>
      </header>
      <DeliverableExplorer items={items} />
    </div>
  );
}
