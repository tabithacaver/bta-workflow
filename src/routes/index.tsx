import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, AlertTriangle, Target, UserCheck } from "lucide-react";
import { PageHeader, head } from "@/components/Shell";
import { guidingStatement, metrics } from "@/lib/workflow";

export const Route = createFileRoute("/")({
  head: () => head("Overview", "Why the BTA team is moving from shared file review to a single-owner model."),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Process guide · v1" title="One file. One accountable owner."
        intro="An interactive guide to the redesigned BTA transaction file review process — who owns the file, what happens at each stage, when to escalate, and what “done” means." />

      <div className="rounded-xl bg-navy p-8 text-navy-foreground">
        <p className="font-mono text-xs uppercase tracking-widest opacity-70">Core principle</p>
        <p className="mt-2 text-2xl font-semibold md:text-3xl">The file moves through the transaction; ownership does not.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h2 className="mt-3 text-lg font-semibold">The problem</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Today multiple reviewers can work the same transaction, causing fragmented ownership, duplicated reviews,
            inconsistent handling, and rework. When issues surface at CDA preparation or final review, Leads must
            reconstruct file history, find previous reviewers, and repeat reviews before resolving the problem.
          </p>
        </section>
        <section className="rounded-xl border bg-card p-6">
          <Target className="h-5 w-5 text-success" />
          <h2 className="mt-3 text-lg font-semibold">The redesign</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            One accountable BTA File Owner from assignment through closing, with standardized review checkpoints,
            documented actions, and targeted exception-based escalation.
          </p>
        </section>
      </div>

      <section className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold">Access, assistance, and ownership are separate</h2></div>
        <div className="mt-4 grid gap-4 text-sm md:grid-cols-3">
          {[
            ["Access", "Anyone may open a file when needed. Opening it does not transfer ownership."],
            ["Assistance", "Leads and SMEs help on specific issues without taking over the file."],
            ["Ownership", "Changes only through formal reassignment. The BTA Owner stays accountable."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-lg bg-muted p-4"><p className="font-semibold">{t}</p><p className="mt-1 text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-primary">Start here</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {([
            ["/process", "Process Map", "Seven stages, start to close"],
            ["/friction-points", "Friction Points", "What we’re fixing and why"],
            ["/roles", "Roles", "Who does what"],
            ["/exceptions", "Exception Workflow", "Walk through an escalation"],
            ["/checklists", "Done Checklists", "Completion criteria per stage"],
            ["/quick-reference", "Quick Reference", "One-page summary for meetings"],
          ] as const).map(([to, t, d]) => (
            <Link key={to} to={to} className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary">
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              <ArrowRight className="mt-3 h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border bg-card p-6">
        <h2 className="text-xl font-semibold text-primary">How We Measure Success</h2>
        <p className="mt-1 text-sm text-muted-foreground">Proposed operational measures. No baseline figures exist yet — these will be tracked once the workflow is approved.</p>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m) => <li key={m} className="rounded-md bg-muted px-3 py-2">{m}</li>)}
        </ul>
      </section>

      <p className="text-center text-lg font-medium text-primary">{guidingStatement}</p>
    </div>
  );
}
