"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

type SidebarNavItem = {
  href: string;
  label: string;
  description: string;
  matchPrefix: string;
};

type SidebarProject = {
  id: string;
  slug: string;
  name: string;
  status: string;
};

export function PortalSidebarClient({
  navItems,
  projects,
  ctaHref,
  ctaLabel,
}: {
  navItems: SidebarNavItem[];
  projects: SidebarProject[];
  ctaHref: string;
  ctaLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentProjectSlug = pathname?.startsWith("/projects/")
    ? pathname.split("/")[2] ?? ""
    : "";
  const selectedProjectSlug = currentProjectSlug || projects[0]?.slug || "";

  return (
    <div className="flex flex-col gap-6">
      <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(`/${item.matchPrefix}`);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-[1rem] border px-4 py-4 transition ${
                isActive
                  ? "border-[color:var(--ink)] bg-[color:var(--paper-strong)] shadow-[0_18px_30px_-26px_rgba(0,0,0,0.28)]"
                  : "border-[color:var(--line)] bg-[color:rgba(255,255,255,0.6)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--paper-strong)]"
              }`}
            >
              <p className="text-sm font-semibold tracking-[-0.01em] text-[color:var(--ink-soft)]">
                {item.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                {item.description}
              </p>
            </Link>
          );
        })}
      </nav>

      {projects.length > 0 ? (
        <div className="editorial-frame px-4 py-4">
          <p className="section-label">Cambiar proyecto</p>
          <select
            className="premium-select mt-4"
            disabled={isPending}
            onChange={(event) => {
              const slug = event.target.value;

              if (!slug) {
                return;
              }

              startTransition(() => {
                router.push(`/projects/${slug}`);
              });
            }}
            value={selectedProjectSlug}
          >
            {projects.map((project) => (
              <option key={project.id} value={project.slug}>
                {project.name} · {project.status}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <Link href={ctaHref} className="premium-button premium-button-accent w-full px-5 py-3">
        {ctaLabel}
      </Link>
    </div>
  );
}
