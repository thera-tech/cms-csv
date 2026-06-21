import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { DeliverableCard } from "@/components/deliverable-card";
import type { Deliverable } from "@/content/deliverables";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "cms-csv:view";

export function DeliverableExplorer({
  items,
  emptyMessage = "Nenhum entregável nesta pasta ainda.",
}: {
  items: Deliverable[];
  emptyMessage?: string;
}) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "grid" || saved === "list") setView(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, view);
  }, [view]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [items, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar entregáveis, tags, descrições..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border/60 bg-card/40 p-1">
          <ViewButton active={view === "grid"} onClick={() => setView("grid")}>
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </ViewButton>
          <ViewButton active={view === "list"} onClick={() => setView("list")}>
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Lista</span>
          </ViewButton>
        </div>
      </div>

      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "item" : "itens"}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/60 bg-card/20 px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((d) => (
            <DeliverableCard key={d.slug} deliverable={d} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((d) => (
            <DeliverableCard key={d.slug} deliverable={d} view="list" />
          ))}
        </div>
      )}
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-medium transition-colors",
        active
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
