import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  FolderOpen,
  Gauge,
  Image as ImageIcon,
  Bot,
  User,
  Sparkles,
  Code2,
} from "lucide-react";
import type { Deliverable, IconKind } from "@/content/deliverables";
import { categoryLabel } from "@/content/deliverables";
import { cn } from "@/lib/utils";

const iconMap: Record<IconKind, typeof BarChart3> = {
  chart: BarChart3,
  doc: FileText,
  image: ImageIcon,
  folder: FolderOpen,
  kpi: Gauge,
};

const createdByConfig = {
  manus: { icon: Bot, label: "Manus", color: "text-blue-400" },
  lovable: { icon: Sparkles, label: "Lovable", color: "text-pink-400" },
  claude: { icon: Code2, label: "Claude", color: "text-amber-400" },
  human: { icon: User, label: "Humano", color: "text-emerald-400" },
} as const;

const statusConfig = {
  draft: { label: "Rascunho", className: "bg-amber-500/10 text-amber-400 ring-amber-500/20" },
  published: { label: "Publicado", className: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" },
  archived: { label: "Arquivado", className: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/20" },
} as const;

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function DeliverableCard({
  deliverable,
  view = "grid",
}: {
  deliverable: Deliverable;
  view?: "grid" | "list";
}) {
  const Icon = iconMap[deliverable.icon] ?? FileText;
  const target = deliverable.customRoute ?? `/entregaveis/${deliverable.slug}`;
  const created = createdByConfig[deliverable.createdBy] ?? createdByConfig.human;
  const CreatedIcon = created.icon;
  const status = statusConfig[deliverable.status] ?? statusConfig.published;

  if (view === "list") {
    return (
      <Link
        to={target}
        className={cn(
          "group flex items-center gap-4 rounded-lg border border-border/60 bg-card/40 px-4 py-3",
          "transition-all hover:border-primary/40 hover:bg-card",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-medium text-foreground">
              {deliverable.title}
            </h3>
            <span className={cn("inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ring-1 ring-inset", status.className)}>
              {status.label}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {deliverable.description}
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <div className="flex items-center gap-1" title={`Criado por ${created.label}`}>
            <CreatedIcon className={cn("h-3 w-3", created.color)} />
            <span className="font-mono text-[10px] text-muted-foreground">{created.label}</span>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            v{deliverable.version}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {formatDate(deliverable.updatedAt)}
          </span>
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
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider ring-1 ring-inset", status.className)}>
            {status.label}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <h3 className="text-sm font-semibold leading-tight text-foreground">
          {deliverable.title}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {deliverable.description}
        </p>
      </div>

      {/* Footer metadata */}
      <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {categoryLabel(deliverable.category)}
          </span>
          <span className="text-border">|</span>
          <div className="flex items-center gap-1" title={`Criado por ${created.label}`}>
            <CreatedIcon className={cn("h-3 w-3", created.color)} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground">
            v{deliverable.version}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            {formatDate(deliverable.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
