import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader, head } from "@/components/Shell";
import { stages, type Stage } from "@/lib/workflow";

export const Route = createFileRoute("/process")({
  head: () => head("Process Map", "The seven-stage BTA file lifecycle, from assignment through closing."),
  component: Process,
});

const kindStyle: Record<Stage["kind"], string> = {
  routine: "border-l-primary",
  exception: "border-l-warning",
  complete: "border-l-success",
};
const badge: Record<Stage["kind"], string> = {
  routine: "bg-primary text-primary-foreground",
  exception: "bg-warning text-primary-foreground",
  complete: "bg-success text-primary-foreground",
};

function Process() {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <div>
      <PageHeader eyebrow="End-to-end" title="Process Map" intro="Click any stage to see its trigger, actions, required information, decisions, and definition of done. The BTA File Owner stays the same at every stage." />
      <div className="mb-6 flex flex-wrap gap-4 text-xs">
        <Legend cls="bg-primary" label="Routine work" />
        <Legend cls="bg-warning" label="Exception" />
        <Legend cls="bg-success" label="Completion" />
        <Legend cls="bg-destructive" label="Blocker needing attention" />
      </div>
      <ol className="mx-auto max-w-3xl">
        {stages.map((s, i) => {
          const isOpen = open === s.n;
          return (
            <li key={s.n}>
              <div className={`rounded-xl border border-l-4 bg-card ${kindStyle[s.kind]}`}>
                <button className="flex w-full items-center gap-4 p-5 text-left" onClick={() => setOpen(isOpen ? null : s.n)} aria-expanded={isOpen}>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm ${badge[s.kind]}`}>{s.n}</span>
                  <span className="flex-1">
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-sm text-muted-foreground">{s.trigger}</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="space-y-5 border-t px-5 pb-5 pt-4 text-sm">
                    <Block title="Actions" items={s.actions} />
                    {s.required && <Block title="Required information" items={s.required} />}
                    {s.decision && <Decision d={s.decision} stage={s.n} />}
                    <div className="rounded-lg bg-success-soft p-3"><span className="font-semibold text-success">Done when: </span>{s.done}</div>
                  </div>
                )}
              </div>
              {i < stages.length - 1 && <div className="mx-auto h-6 w-px bg-border" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Legend({ cls, label }: { cls: string; label: string }) {
  return <span className="flex items-center gap-2"><span className={`h-3 w-3 rounded-sm ${cls}`} />{label}</span>;
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">{title}</p>
      <ul className="space-y-1.5">{items.map((a) => <li key={a} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{a}</li>)}</ul>
    </div>
  );
}

function Decision({ d, stage }: { d: NonNullable<Stage["decision"]>; stage: number }) {
  // Stage 6: YES = blocker; others: NO = blocker
  const yesBlocks = stage === 6;
  return (
    <div>
      <div className="mx-auto mb-3 flex w-fit items-center gap-2 rotate-0">
        <span className="h-4 w-4 rotate-45 border-2 border-warning bg-warning-soft" />
        <span className="font-semibold">{d.q}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Branch label="YES" items={d.yes} blocker={yesBlocks} />
        <Branch label="NO" items={d.no} blocker={!yesBlocks} />
      </div>
    </div>
  );
}

function Branch({ label, items, blocker }: { label: string; items: string[]; blocker: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${blocker ? "bg-danger-soft" : "bg-success-soft"}`}>
      <p className={`mb-1 flex items-center gap-1 font-semibold ${blocker ? "text-destructive" : "text-success"}`}>
        {blocker ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}{label}
      </p>
      <ul className="list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}
