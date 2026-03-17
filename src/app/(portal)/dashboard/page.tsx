import Link from "next/link";
import { getProjectsPageData, getSessionsPageData } from "@/db/portal";
import { isAdminRole, isClientRole } from "@/lib/auth/roles";
import { meetingProviderLabels } from "@/lib/meetings";
import { requireUser } from "@/lib/auth/session";
import { formatDateOnly, formatDateTime } from "@/lib/date-format";

const priorityWeight = {
  high: 0,
  medium: 1,
  low: 2,
} as const;

const roleLabels = {
  admin: "Admin",
  advisor: "Asesor",
  client: "Cliente",
} as const;

export default async function DashboardPage() {
  const user = await requireUser();
  const [projectsData, sessionsData] = await Promise.all([
    getProjectsPageData(user),
    getSessionsPageData(user),
  ]);

  const visibleProjects = projectsData.projects;
  const allTasks = visibleProjects.flatMap((project) =>
    project.tasks.map((task) => ({
      ...task,
      projectName: project.name,
      projectSlug: project.slug,
    })),
  );
  const pendingTasks = allTasks
    .filter((task) => task.status !== "done")
    .sort((left, right) => {
      const prioritySort = priorityWeight[left.priority] - priorityWeight[right.priority];

      if (prioritySort !== 0) {
        return prioritySort;
      }

      if (!left.dueDate && !right.dueDate) {
        return 0;
      }

      if (!left.dueDate) {
        return 1;
      }

      if (!right.dueDate) {
        return -1;
      }

      return left.dueDate.localeCompare(right.dueDate);
    })
    .slice(0, 4);
  const upcomingSessions = sessionsData.sessions
    .filter((session) => session.status === "scheduled")
    .slice(0, 4);
  const completedTasks = allTasks.filter((task) => task.status === "done").length;
  const activeProjects = visibleProjects.filter((project) => project.status === "active").length;
  const remainingSessions = sessionsData.purchases.reduce(
    (total, purchase) => total + purchase.sessionsRemaining,
    0,
  );

  const dashboardStats = [
    {
      label: "Proyectos activos",
      value: `${activeProjects}`,
      detail: `${visibleProjects.length} visibles en total`,
    },
    {
      label: "Tareas completadas",
      value: `${completedTasks}`,
      detail: `${allTasks.length - completedTasks} siguen abiertas`,
    },
    {
      label: "Sesiones programadas",
      value: `${upcomingSessions.length}`,
      detail: `${sessionsData.sessions.length} sesiones visibles`,
    },
    {
      label: "Saldo disponible",
      value: `${remainingSessions}`,
      detail: "Sesiones restantes en compras registradas",
    },
  ];

  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="surface-card p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div className="max-w-4xl">
              <div className="eyebrow">Dashboard</div>
              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.045em]">
                Operación del proyecto en un vistazo
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Sigue el avance, detecta bloqueos y entra directo a tus proyectos, sesiones y
                tareas más importantes con una lectura mucho más clara y ejecutiva.
              </p>
            </div>

            <div className="border-t border-[color:var(--line)] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="section-label">Tu contexto</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {user.name ?? "Usuario"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Rol actual: {roleLabels[user.role]}.
              </p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
                {visibleProjects.length} proyectos visibles.
              </p>
            </div>
          </div>
        </header>

        <section className="surface-card px-6 py-5 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-0 xl:divide-x xl:divide-[color:var(--line)]">
            {dashboardStats.map((stat) => (
              <article key={stat.label} className="xl:px-6">
                <p className="section-label">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{stat.value}</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{stat.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6">
            <article className="surface-card p-8">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Proyectos recientes</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Tus workspaces
                  </h2>
                </div>
                <Link href="/projects" className="premium-button premium-button-secondary px-4 py-2.5">
                  Ver todos
                </Link>
              </div>

              <div className="mt-4 divide-y divide-[color:var(--line)]">
                {visibleProjects.length === 0 ? (
                  <div className="py-6 text-sm text-[color:var(--muted)]">
                    No tienes proyectos visibles todavía.
                  </div>
                ) : (
                  visibleProjects.slice(0, 3).map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.slug}`}
                      className="block py-5 transition hover:opacity-80"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-2xl">
                          <p className="section-label">{project.status}</p>
                          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                            {project.name}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                            {project.summary || "Proyecto sin resumen todavía."}
                          </p>
                        </div>
                        <div className="text-sm text-[color:var(--muted)] md:text-right">
                          <p className="section-label">Progreso</p>
                          <p className="mt-3 text-2xl font-semibold text-[color:var(--ink)]">
                            {project.progress}%
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </article>

            <article className="surface-card p-8">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Foco</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Tareas a mover
                  </h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  {pendingTasks.length} destacadas
                </p>
              </div>

              <div className="mt-4 divide-y divide-[color:var(--line)]">
                {pendingTasks.length === 0 ? (
                  <div className="py-6 text-sm text-[color:var(--muted)]">
                    No hay tareas pendientes destacadas.
                  </div>
                ) : (
                  pendingTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/projects/${task.projectSlug}`}
                      className="block py-5 transition hover:opacity-80"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-2xl">
                          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                            {task.projectName} · {task.status} · {task.priority}
                          </p>
                          <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                            {task.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[color:var(--muted)]">
                          Fecha objetivo: {formatDateOnly(task.dueDate)}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            <article className="surface-card p-8">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Agenda</p>
                  <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                    Próximas sesiones
                  </h2>
                </div>
                <Link href="/sessions" className="premium-button premium-button-secondary px-4 py-2.5">
                  Ver sesiones
                </Link>
              </div>

              <div className="mt-4 divide-y divide-[color:var(--line)]">
                {upcomingSessions.length === 0 ? (
                  <div className="py-6 text-sm text-[color:var(--muted)]">
                    No hay sesiones programadas en este momento.
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <article key={session.id} className="py-5">
                      <p className="section-label">{session.project.name}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
                        {session.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {formatDateTime(session.scheduledFor)} ·{" "}
                        {meetingProviderLabels[session.meetingProvider]}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </article>

            <article className="dark-panel p-8">
              <p className="section-label">Siguiente accion</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Ruta recomendada
              </h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-white/72">
                <p>
                  {isClientRole(user.role)
                    ? "Revisa el avance de tus proyectos, compra nuevas sesiones si el saldo se acerca a cero y valida la evidencia registrada."
                    : "Entra al proyecto con mayor prioridad, mueve el Kanban y deja agenda clara para la siguiente sesión."}
                </p>
                {isAdminRole(user.role) ? (
                  <p>
                    Como admin, tambien puedes revisar usuarios inactivos, paquetes deshabilitados
                    y resembrar el demo desde el panel administrativo.
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/projects" className="premium-button px-4 py-2.5">
                  Ir a proyectos
                </Link>
                <Link href="/sessions" className="premium-button premium-button-secondary px-4 py-2.5">
                  Ir a sesiones
                </Link>
                {isAdminRole(user.role) ? (
                  <Link href="/admin" className="premium-button premium-button-secondary px-4 py-2.5">
                    Ir a admin
                  </Link>
                ) : null}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
