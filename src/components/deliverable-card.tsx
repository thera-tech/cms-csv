import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  FileText,
  Folder,
  Gauge,
  Image as ImageIcon,
  ArrowUpRight,
} from "lucide-react";

import {
  categoryLabel,
  type Deliverable,
  type IconKind,
} from "@/content/deliverables";
import { cn } from "@/lib/utils";

const ICONS: Record<IconKind, typeof Folder> = {
  chart: BarChart3,
  kpi: Gauge,
  doc: FileText,
  image: ImageIcon,
  folder: Folder,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function DeliverableCard({
  deliverable,
  view = "grid",
}: {
  deliverable: Deliverable;
  view?: "grid" | "list";
}) {
  const Icon = ICONS[deliverable.icon];
  const target = deliverable.customRoute ?? `/entregaveis/${deliverable.slug}`;

  if (view === "list") {
    return (
      <Link
        to={target}
        className="group flex items-center gap-4 rounded-md border border-border/60 bg-card/40 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-card"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium text-foreground">
              {deliverable.title}
            </p>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {categoryLabel(deliverable.category)}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {deliverable.description}
          </p>
        </div>
        <div className="hidden shrink-0 font-mono text-[11px] text-muted-foreground sm:block">
          {formatDate(deliverable.updatedAt)}
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    );
  }

  return (
    <Link
      to={target}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-lg border border-border/60 bg-card/40 p-4",
        "transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/5",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-tight text-foreground">
          {deliverable.title}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {deliverable.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>{categoryLabel(deliverable.category)}</span>
        <span>{formatDate(deliverable.updatedAt)}</span>
      </div>
    </Link>
  );
}
