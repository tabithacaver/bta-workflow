import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RotateCcw, ShieldAlert } from "lucide-react";
import { PageHeader, head } from "@/components/Shell";
import { stages } from "@/lib/workflow";

export const Route = createFileRoute("/exceptions")({
  head: () => head("Exception Workflow", "Interactive walkthrough of the standard BTA exception and escalation workflow."),
  component: Page,
});

const common = ["Issue identified", "BTA reviews supporting information", "Documents findings and actions taken"];
const noPath = ["BTA resolves", "Documents correction", "Confirms completion"];
const yesPath = ["Route to Lead / authorized expert", "Review specific issue", "Provide guidance or approval", "BTA implements resolution", "Documents completion"];

function Page() {
  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState<"yes" | "no" | null>(null);
  const path = branch === "yes" ? yesPath : branch === "no" ? noPath : [];
  const all = [...common, ...path];
  const finished = branch !== null && step >= all.length;
  const atDecision = step === common.length && branch === null;
  const reset = () => { setStep(0); setBranch(null); };
  const required = stages.find((s) => s.slug === "exception")!.required!;

  return (
    <div>
      <PageHeader eyebrow="Interactive" title="Standard Exception Workflow" intro="Step through an exception. The sample file below is illustrative only." />
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-warning bg-warning-soft p-4 text-sm">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
        <p><strong>Lead involvement does not transfer file ownership.</strong> The BTA Owner implements the resolution unless ownership is formally reassigned.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl border bg-card p-6">
          <p className="mb-4 font-mono text-xs text-muted-foreground">Sample: TXN-0000-DEMO · Owner: “BTA A”</p>
          <ol className="space-y-2">
            {common.map((c, i) => <Step key={c} label={c} state={i < step ? "done" : i === step ? "current" : "todo"} />)}
            <li className={`rounded-lg border-2 p-4 ${step >= common.length ? "border-warning bg-warning-soft" : "border-dashed"}`}>
              <p className="font-semibold">Decision: Escalation required?</p>
              {atDecision && (
                <div className="mt-3 flex gap-2">
                  <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground" onClick={() => setBranch("no")}>No — within BTA authority</button>
                  <button className="rounded-md bg-warning px-4 py-2 text-sm text-primary-foreground" onClick={() => setBranch("yes")}>Yes — needs Lead / expert</button>
                </div>
              )}
              {branch && <p className="mt-1 text-sm text-muted-foreground">Selected: {branch.toUpperCase()}</p>}
            </li>
            {path.map((c, i) => {
              const idx = common.length + i;
              return <Step key={c} label={c} lead={branch === "yes" && i < 3} state={idx < step ? "done" : idx === step ? "current" : "todo"} />;
            })}
            {finished && <li className="rounded-lg bg-success p-4 font-semibold text-primary-foreground">Resume standard workflow — file stays with the BTA Owner.</li>}
          </ol>
          <div className="mt-6 flex gap-2">
            {!finished && !atDecision && <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground" onClick={() => setStep(step + 1)}>Next step</button>}
            <button className="flex items-center gap-1 rounded-md border px-4 py-2 text-sm" onClick={reset}><RotateCcw className="h-4 w-4" />Restart</button>
          </div>
        </div>

        <aside className="rounded-xl border bg-card p-6 text-sm">
          <h2 className="font-semibold text-primary">Required exception information</h2>
          <ul className="mt-3 space-y-1.5">{required.map((r) => <li key={r} className="border-b pb-1.5 last:border-0">{r}</li>)}</ul>
        </aside>
      </div>
    </div>
  );
}

function Step({ label, state, lead }: { label: string; state: "done" | "current" | "todo"; lead?: boolean }) {
  const cls = state === "done" ? "bg-success-soft text-foreground" : state === "current" ? "bg-accent ring-2 ring-primary" : "bg-muted text-muted-foreground";
  return (
    <li className={`flex items-center justify-between rounded-lg p-3 text-sm ${cls}`}>
      <span className="font-medium">{label}</span>
      <span className="font-mono text-xs">{lead ? "Lead" : "BTA Owner"}</span>
    </li>
  );
}
