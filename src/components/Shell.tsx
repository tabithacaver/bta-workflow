import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, FolderLock } from "lucide-react";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/process", label: "Process Map" },
  { to: "/friction-points", label: "Friction Points" },
  { to: "/roles", label: "Roles" },
  { to: "/exceptions", label: "Exceptions" },
  { to: "/checklists", label: "Done Checklists" },
  { to: "/quick-reference", label: "Quick Reference" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <FolderLock className="h-5 w-5" />
            <span>BTA File Ownership & Workflow</span>
          </Link>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <nav className="hidden gap-1 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
                className="rounded-md px-3 py-1.5 text-sm opacity-80 hover:opacity-100"
                activeProps={{ className: "bg-primary opacity-100" }}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        {open && (
          <nav className="flex flex-col border-t border-primary px-4 py-2 lg:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} activeOptions={{ exact: true }}
                className="rounded-md px-3 py-2 text-sm" activeProps={{ className: "bg-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Process education tool · Illustrative only · Final workflow subject to leadership review and approval
      </footer>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-8">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{eyebrow}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-primary md:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-3xl text-muted-foreground">{intro}</p>}
    </div>
  );
}

export function head(title: string, description: string) {
  return {
    meta: [
      { title: `${title} · BTA File Ownership` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} · BTA File Ownership` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
