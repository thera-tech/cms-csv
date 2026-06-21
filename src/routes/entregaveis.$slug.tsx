import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";

import { categoryLabel, getBySlug } from "@/content/deliverables";

export const Route = createFileRoute("/entregaveis/$slug")({
  loader: ({ params }) => {
    const deliverable = getBySlug(params.slug);
    if (!deliverable) throw notFound();
    return { deliverable };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.deliverable.title} — CMS CSV` },
          { name: "description", content: loaderData.deliverable.description },
        ]
      : [{ title: "Entregável — CMS CSV" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl py-16 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        404 · entregável
      </p>
      <h1 className="mt-2 text-2xl font-semibold">Entregável não encontrado</h1>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao diretório
      </Link>
    </div>
  ),
  component: DeliverablePage,
});

function DeliverablePage() {
  const { deliverable: d } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> diretório
        </Link>
      </div>

      <header className="space-y-3 border-b border-border/60 pb-6">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          {categoryLabel(d.category)} / {d.slug}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          {d.title}
        </h1>
        <p className="text-base text-muted-foreground">{d.description}</p>

        <dl className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <dt className="sr-only">Atualizado</dt>
            <dd>{new Date(d.updatedAt).toLocaleDateString("pt-BR")}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <dt className="sr-only">Owner</dt>
            <dd>{d.owner}</dd>
          </div>
          {d.tags.length > 0 && (
            <div className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              <dd className="flex flex-wrap gap-1.5">
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm bg-accent px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-accent-foreground"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </header>

      <section className="space-y-4 rounded-lg border border-dashed border-border/60 bg-card/30 p-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Conteúdo do entregável
        </p>
        <p className="text-sm text-muted-foreground">
          Este é o placeholder padrão para <strong className="text-foreground">{d.title}</strong>.
          Quando o entregável tiver layout próprio, crie uma rota dedicada em{" "}
          <code className="rounded bg-accent px-1.5 py-0.5 text-xs text-accent-foreground">
            src/routes/entregaveis.{d.slug}.tsx
          </code>{" "}
          e aponte <code className="rounded bg-accent px-1.5 py-0.5 text-xs text-accent-foreground">customRoute</code>{" "}
          em <code className="rounded bg-accent px-1.5 py-0.5 text-xs text-accent-foreground">src/content/deliverables.ts</code>{" "}
          para essa URL.
        </p>
      </section>
    </article>
  );
}
