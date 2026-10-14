import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, head } from "@/components/Shell";
import { frictions } from "@/lib/workflow";

export const Route = createFileRoute("/friction-points")({
  head: () => head("Friction Points", "Three friction points the single-owner model addresses: fragmented ownership, duplicate work, and late-stage problem solving."),
  component: Page,
});

function Page() {
  return (
    <div>
      <PageHeader eyebrow="What we’re fixing" title="Three Friction Points" />
      <div className="grid gap-6 lg:grid-cols-3">
        {frictions.map((f, i) => (
          <article key={f.title} className="flex flex-col rounded-xl border bg-card">
            <div className="border-b p-5">
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <h2 className="text-lg font-semibold text-primary">{f.title}</h2>
            </div>
            <dl className="flex-1 space-y-4 p-5 text-sm">
              <Row k="Trigger" v={f.trigger} />
              <Row k="Owners involved" v={f.owners} />
              <Row k="Information required" v={f.info} />
              <div className="rounded-lg bg-danger-soft p-3">
                <dt className="font-semibold text-destructive">Current impact</dt>
                <dd><ul className="mt-1 list-disc pl-5">{f.impact.map((x) => <li key={x}>{x}</li>)}</ul></dd>
              </div>
              <Row k="Process improvement" v={f.improved} />
            </dl>
            <div className="rounded-b-xl bg-success-soft p-5 text-sm"><span className="font-semibold text-success">Done: </span>{f.done}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div><dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{k}</dt><dd className="mt-1">{v}</dd></div>;
}
