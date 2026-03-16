import Link from "next/link";
import { getProjectsPageData, getSessionsPageData } from "@/db/portal";
import { isAdminRole, isClientRole } from "@/lib/auth/roles";
import { meetingProviderLabels } from "@/lib/meetings";
import { requireUser } from "@/lib/auth/session";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

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

function formatDate(value?: Date | string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return dateFormatter.format(new Date(value));
}

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

      return new Date(left.dueDate).getTime() - new Date(right.dueDate).getTime();
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
  ];

  return (
    <main className="site-shell min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="glass-panel relative overflow-hidden rounded-[2.6rem] p-6 lg:p-7">
          <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-[color:var(--gold)]/16 blur-3xl" />
          <div className="absolute right-6 top-10 h-36 w-36 rounded-full bg-[color:var(--teal)]/12 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="eyebrow">Dashboard</div>
              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.03em]">
                Operacion del proyecto en un vistazo
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Sigue el avance, detecta bloqueos y entra directo a tus proyectos, sesiones y
                tareas mas importantes dentro de una experiencia mucho mas limpia y profesional.
              </p>
            </div>

            <div className="surface-card min-w-[18rem] rounded-[1.8rem] px-5 py-4">
              <p className="section-label">Tu contexto</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {user.name ?? "Usuario"}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Rol actual: {roleLabels[user.role]} · {visibleProjects.length} proyectos visibles
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => (
            <article key={stat.label} className="stat-card rounded-[1.9rem] p-5">
              <p className="section-label">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{stat.detail}</p>
            </article>
          ))}

          <article className="dark-panel rounded-[1.9rem] p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
              Saldo disponible
            </p>
            <p className="mt-4 text-3xl font-semibold">{remainingSessions}</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Sesiones restantes en compras registradas.
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-6">
            <article className="surface-card rounded-[2.3rem] p-6">
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

              <div className="mt-6 grid gap-4">
                {visibleProjects.slice(0, 3).map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="surface-card-muted rounded-[1.8rem] p-5 transition hover:-translate-y-[1px]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="chip chip-soft">{project.status}</span>
                        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                          {project.name}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                          {project.summary || "Proyecto sin resumen todavia."}
                        </p>
                      </div>
                      <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/70 px-4 py-3 text-right">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                          Progreso
                        </p>
                        <p className="mt-2 text-3xl font-semibold">{project.progress}%</p>
                      </div>
                    </div>
                  </Link>
                ))}

                {visibleProjects.length === 0 ? (
                  <div className="rounded-[1.8rem] border border-dashed border-[color:var(--line)] bg-white/40 p-5 text-sm text-[color:var(--muted)]">
                    No tienes proyectos visibles todavia.
                  </div>
                ) : null}
              </div>
            </article>

            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Foco</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Tareas a mover
                  </h2>
                </div>
                <span className="chip chip-soft">{pendingTasks.length} destacadas</span>
              </div>

              <div className="mt-6 space-y-4">
                {pendingTasks.length === 0 ? (
                  <div className="rounded-[1.8rem] border border-dashed border-[color:var(--line)] bg-white/40 p-5 text-sm text-[color:var(--muted)]">
                    No hay tareas pendientes destacadas.
                  </div>
                ) : (
                  pendingTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/projects/${task.projectSlug}`}
                      className="surface-card-muted block rounded-[1.8rem] p-5 transition hover:-translate-y-[1px]"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip chip-soft">{task.projectName}</span>
                        <span className="chip chip-gold">{task.status}</span>
                        <span className="chip chip-warm">{task.priority}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
                        {task.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        Fecha objetivo: {formatDate(task.dueDate)}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Agenda</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Proximas sesiones
                  </h2>
                </div>
                <Link href="/sessions" className="premium-button premium-button-secondary px-4 py-2.5">
                  Ver sesiones
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {upcomingSessions.length === 0 ? (
                  <div className="rounded-[1.8rem] border border-dashed border-[color:var(--line)] bg-white/40 p-5 text-sm text-[color:var(--muted)]">
                    No hay sesiones programadas en este momento.
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <article
                      key={session.id}
                      className="surface-card-muted rounded-[1.8rem] p-5"
                    >
                      <span className="chip chip-soft">{session.project.name}</span>
                      <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
                        {session.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {formatDate(session.scheduledFor)} ·{" "}
                        {meetingProviderLabels[session.meetingProvider]}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </article>

            <article className="dark-panel rounded-[2.3rem] p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                Siguiente accion
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Ruta recomendada
              </h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-white/72">
                <p>
                  {isClientRole(user.role)
                    ? "Revisa el avance de tus proyectos, compra nuevas sesiones si el saldo se acerca a cero y valida la evidencia registrada."
                    : "Entra al proyecto con mayor prioridad, mueve el Kanban y deja agenda clara para la siguiente sesion."}
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
