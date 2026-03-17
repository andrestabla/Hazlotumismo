import Link from "next/link";
import { SignOutForm } from "@/components/auth/sign-out-form";
import { PortalSidebarClient } from "@/components/portal/sidebar-client";
import { getPortalSidebarData } from "@/db/portal";
import { isAdminRole, isAdvisorRole, isClientRole } from "@/lib/auth/roles";
import { formatDateTime } from "@/lib/date-format";
import type { AppSessionUser } from "@/lib/auth/session";

const roleLabels = {
  admin: "Admin",
  advisor: "Asesor",
  client: "Cliente",
} as const;

export function PortalSidebar({
  user,
  sidebarData,
}: {
  user: AppSessionUser;
  sidebarData: Awaited<ReturnType<typeof getPortalSidebarData>>;
}) {
  const activeProjectHref = sidebarData.activeProject
    ? `/projects/${sidebarData.activeProject.slug}`
    : "/projects";

  const navItems = isClientRole(user.role)
    ? [
        {
          href: "/dashboard",
          label: "Dashboard",
          description: "Resumen ejecutivo del avance.",
          matchPrefix: "dashboard",
        },
        {
          href: activeProjectHref,
          label: "Proyecto activo",
          description: sidebarData.activeProject?.name ?? "Entra a tus workspaces.",
          matchPrefix: "projects",
        },
        {
          href: "/sessions",
          label: "Mis sesiones",
          description: "Compras, agenda e historial.",
          matchPrefix: "sessions",
        },
      ]
    : isAdvisorRole(user.role) && !isAdminRole(user.role)
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            description: "Vista rápida de proyectos y bloqueos.",
            matchPrefix: "dashboard",
          },
          {
            href: activeProjectHref,
            label: "Tablero Kanban",
            description: sidebarData.activeProject?.name ?? "Abre un proyecto reciente.",
            matchPrefix: "projects",
          },
          {
            href: "/sessions",
            label: "Agenda del día",
            description: "Revisa sesiones y próximos acuerdos.",
            matchPrefix: "sessions",
          },
        ]
      : [
          {
            href: "/dashboard",
            label: "Dashboard",
            description: "Métricas y focos del portal.",
            matchPrefix: "dashboard",
          },
          {
            href: "/projects",
            label: "Mis proyectos",
            description: "Vista general de workspaces.",
            matchPrefix: "projects",
          },
          {
            href: "/sessions",
            label: "Mis sesiones",
            description: "Agenda, compras e historial.",
            matchPrefix: "sessions",
          },
          {
            href: "/admin",
            label: "Admin",
            description: "Operación y catálogo de la plataforma.",
            matchPrefix: "admin",
          },
        ];

  const summary = isClientRole(user.role)
    ? {
        label: "Saldo de sesiones",
        value: `${sidebarData.remainingSessions}`,
        detail: sidebarData.activeProject
          ? `Proyecto activo: ${sidebarData.activeProject.name}`
          : "Cuando tengas un proyecto activo aparecerá aquí.",
      }
    : isAdvisorRole(user.role) && !isAdminRole(user.role)
      ? {
          label: "Agenda del día",
          value: `${sidebarData.todayScheduledSessionsCount}`,
          detail: sidebarData.nextScheduledSession
            ? `${sidebarData.nextScheduledSession.project.name} · ${formatDateTime(sidebarData.nextScheduledSession.scheduledFor)}`
            : "No hay sesiones programadas por ahora.",
        }
      : {
          label: "Acceso admin",
          value: `${sidebarData.projects.length}`,
          detail: sidebarData.nextScheduledSession
            ? `Siguiente sesión: ${sidebarData.nextScheduledSession.project.name}`
            : "Acceso completo a proyectos, sesiones y catálogo.",
        };

  const cta = isClientRole(user.role)
    ? {
        href: "/sessions",
        label: "Nueva sesión",
      }
    : isAdvisorRole(user.role) && !isAdminRole(user.role)
      ? {
          href: "/sessions",
          label: "Abrir agenda",
        }
      : {
          href: "/admin",
          label: "Abrir admin",
        };

  return (
    <aside className="border-b border-[color:var(--line)] bg-[color:rgba(253,253,251,0.84)] lg:h-screen lg:border-b-0 lg:border-r lg:border-[color:var(--line)]">
      <div className="app-safe-top app-safe-bottom flex h-full flex-col gap-6 px-5 py-5 lg:sticky lg:top-0 lg:overflow-y-auto lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[color:var(--ink)] text-sm font-semibold text-[color:var(--paper-strong)]">
            HT
          </div>
          <div className="min-w-0">
            <Link href="/" className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Hazlo tú mismo
            </Link>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              Portal de proyectos y sesiones
            </p>
          </div>
        </div>

        <div className="editorial-frame px-4 py-4">
          <p className="section-label">{summary.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[color:var(--ink-soft)]">
            {summary.value}
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{summary.detail}</p>
        </div>

        <PortalSidebarClient
          ctaHref={cta.href}
          ctaLabel={cta.label}
          navItems={navItems}
          projects={sidebarData.projects}
        />

        <div className="mt-auto border-t border-[color:var(--line)] pt-5">
          <div className="surface-card-muted px-4 py-4">
            <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
              {user.name ?? "Usuario"}
            </p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">
              {roleLabels[user.role]} · Experiencia autenticada
            </p>
            <div className="mt-4">
              <SignOutForm />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
