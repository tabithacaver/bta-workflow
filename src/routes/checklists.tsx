import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { PageHeader, head } from "@/components/Shell";
import { stages } from "@/lib/workflow";

export const Route = createFileRoute("/checklists")({
  head: () => head("Done Checklists", "What “done” means at each major stage of the BTA file lifecycle."),
  component: Page,
});

function Page() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setChecked((c) => ({ ...c, [k]: !c[k] }));
  return (
    <div>
      <PageHeader eyebrow="Completion criteria" title="What “Done” Means" intro="Use these as a practice checklist. Checks are not saved and do not connect to any real file." />
      <div className="grid gap-5 md:grid-cols-2">
        {stages.map((s) => {
          const total = s.actions.length;
          const n = s.actions.filter((_, i) => checked[`${s.n}-${i}`]).length;
          const complete = n === total;
          return (
            <section key={s.n} className={`rounded-xl border bg-card p-5 ${complete ? "border-success" : ""}`}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{s.n}. {s.title}</h2>
                <span className={`rounded-full px-2 py-0.5 font-mono text-xs ${complete ? "bg-success text-primary-foreground" : "bg-muted"}`}>{n}/{total}</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm">
                {s.actions.map((a, i) => {
                  const k = `${s.n}-${i}`;
                  return (
                    <li key={k}>
                      <button onClick={() => toggle(k)} className="flex w-full gap-3 text-left">
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border ${checked[k] ? "border-success bg-success text-primary-foreground" : "border-input"}`}>
                          {checked[k] && <Check className="h-3 w-3" />}
                        </span>
                        <span className={checked[k] ? "text-muted-foreground line-through" : ""}>{a}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className={`mt-4 rounded-md p-3 text-sm ${complete ? "bg-success-soft" : "bg-muted"}`}><strong>Done when:</strong> {s.done}</p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
