import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { PageHeader, head } from "@/components/Shell";
import { stages, roles, guidingStatement } from "@/lib/workflow";

export const Route = createFileRoute("/quick-reference")({
  head: () => head("Quick Reference", "One-page summary of the BTA single-owner workflow for team meetings and onboarding."),
  component: Page,
});

function Page() {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <PageHeader eyebrow="Meetings & onboarding" title="Quick Reference" />
        <button onClick={() => window.print()} className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm"><Printer className="h-4 w-4" />Print</button>
      </div>
      <div className="rounded-xl bg-navy p-6 text-navy-foreground">
        <p className="text-xl font-semibold">The file moves through the transaction; ownership does not.</p>
        <p className="mt-2 text-sm opacity-80">{guidingStatement}</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold text-primary">Seven stages at a glance</h2>
          <table className="mt-3 w-full text-sm">
            <tbody>
              {stages.map((s) => (
                <tr key={s.n} className="border-b align-top last:border-0">
                  <td className="py-2 pr-3 font-mono text-muted-foreground">{s.n}</td>
                  <td className="py-2 pr-3 font-medium">{s.title}</td>
                  <td className="py-2 text-muted-foreground">{s.done}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <div className="space-y-6">
          <section className="rounded-xl border bg-card p-6">
            <h2 className="font-semibold text-primary">Who does what</h2>
            <ul className="mt-3 space-y-2 text-sm">{roles.map((r) => <li key={r.name}><strong>{r.name}:</strong> {r.summary}</li>)}</ul>
          </section>
          <section className="rounded-xl border border-warning bg-warning-soft p-6 text-sm">
            <h2 className="font-semibold">When escalating, bring:</h2>
            <p className="mt-2">The specific issue · what you’ve already checked · relevant documents · potential impact · your recommended next step.</p>
            <p className="mt-2 font-medium">Lead involvement ≠ ownership transfer.</p>
          </section>
          <section className="rounded-xl border bg-card p-6 text-sm">
            <h2 className="font-semibold text-primary">Remember</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access, assistance, and ownership are separate.</li>
              <li>Document every decision, correction, and communication.</li>
              <li>Request targeted help — not a full-file re-review.</li>
              <li>Compliance requirements and approval authority are unchanged.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
