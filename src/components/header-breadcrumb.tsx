import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { CATEGORIES, getBySlug } from "@/content/deliverables";

export function HeaderBreadcrumb() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const crumbs: { label: string; to?: string }[] = [{ label: "Home", to: "/" }];

  if (pathname === "/") {
    return <Crumbs items={crumbs} />;
  }

  const segments = pathname.split("/").filter(Boolean);
  const [first, second] = segments;

  const cat = CATEGORIES.find((c) => c.id === first);
  if (cat) {
    crumbs.push({ label: cat.label });
  } else if (first === "entregaveis" && second) {
    const d = getBySlug(second);
    crumbs.push({ label: "Entregáveis" });
    crumbs.push({ label: d?.title ?? second });
  } else {
    crumbs.push({ label: first });
  }

  return <Crumbs items={crumbs} />;
}

function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3 opacity-60" />}
          {c.to ? (
            <Link to={c.to} className="hover:text-foreground">
              {c.label}
            </Link>
          ) : (
            <span className="text-foreground">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
