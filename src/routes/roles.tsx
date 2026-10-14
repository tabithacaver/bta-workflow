import { createFileRoute } from "@tanstack/react-router";
import { UserCheck, Lightbulb, Users } from "lucide-react";
import { PageHeader, head } from "@/components/Shell";
import { roles } from "@/lib/workflow";

export const Route = createFileRoute("/roles")({
  head: () => head("Roles & Responsibilities", "Responsibilities of the BTA File Owner, Lead / SME, and Transaction Team."),
  component: Page,
});

const icons = [UserCheck, Lightbulb, Users];

function Page() {
  return (
    <div>
      <PageHeader eyebrow="Reference" title="Roles & Responsibilities" intro="All team members may access a file when needed, but access does not automatically transfer ownership." />
      <div className="grid gap-6 md:grid-cols-3">
        {roles.map((r, i) => {
          const Icon = icons[i] ?? Users;
          return (
            <section key={r.name} className={`rounded-xl border bg-card p-6 ${i === 0 ? "ring-2 ring-primary" : ""}`}>
              <Icon className="h-6 w-6 text-primary" />
              <h2 className="mt-3 text-lg font-semibold">{r.name}</h2>
              <p className="text-sm text-muted-foreground">{r.summary}</p>
              <ul className="mt-4 space-y-2 text-sm">{r.items.map((x) => <li key={x} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{x}</li>)}</ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
