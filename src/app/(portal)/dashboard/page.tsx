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

  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[color:var(--line)] bg-white/80 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">Dashboard</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-5xl leading-none">Operacion del proyecto en un vistazo</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Sigue el avance, detecta bloqueos y entra directo a tus proyectos, sesiones y tareas mas importantes.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm">
              <p className="font-medium">{user.name ?? "Usuario"}</p>
              <p className="text-[color:var(--muted)]">
                Rol actual: {roleLabels[user.role]} · {visibleProjects.length} proyectos visibles
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Proyectos activos</p>
            <p className="mt-3 text-3xl font-semibold">{activeProjects}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {visibleProjects.length} visibles en total
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Tareas completadas</p>
            <p className="mt-3 text-3xl font-semibold">{completedTasks}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {allTasks.length - completedTasks} siguen abiertas
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Sesiones programadas</p>
            <p className="mt-3 text-3xl font-semibold">{upcomingSessions.length}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {sessionsData.sessions.length} sesiones visibles
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--ink)] p-5 text-[color:var(--paper-strong)]">
            <p className="text-xs uppercase tracking-[0.28em] text-white/65">Saldo disponible</p>
            <p className="mt-3 text-3xl font-semibold">{remainingSessions}</p>
            <p className="mt-2 text-sm text-white/75">
              sesiones restantes en compras registradas
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Proyectos recientes</p>
                  <h2 className="mt-2 text-3xl font-semibold">Tus workspaces</h2>
                </div>
                <Link
                  href="/projects"
                  className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                >
                  Ver todos
                </Link>
              </div>

              <div className="mt-5 grid gap-4">
                {visibleProjects.slice(0, 3).map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4 transition hover:-translate-y-[1px] hover:border-[color:var(--ink)]"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                          {project.status}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                          {project.summary || "Proyecto sin resumen todavia."}
                        </p>
                      </div>
                      <span className="rounded-2xl bg-white px-3 py-2 text-sm font-medium">
                        {project.progress}%
                      </span>
                    </div>
                  </Link>
                ))}

                {visibleProjects.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
                    No tienes proyectos visibles todavia.
                  </div>
                ) : null}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Foco</p>
                  <h2 className="mt-2 text-3xl font-semibold">Tareas a mover</h2>
                </div>
                <span className="text-sm text-[color:var(--muted)]">{pendingTasks.length} destacadas</span>
              </div>

              <div className="mt-5 space-y-4">
                {pendingTasks.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-white p-4 text-sm text-[color:var(--muted)]">
                    No hay tareas pendientes destacadas.
                  </div>
                ) : (
                  pendingTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={`/projects/${task.projectSlug}`}
                      className="block rounded-[1.5rem] border border-[color:var(--line)] bg-white p-4 transition hover:border-[color:var(--ink)]"
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                        <span>{task.projectName}</span>
                        <span>{task.status}</span>
                        <span>{task.priority}</span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold">{task.title}</h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        Fecha objetivo: {task.dueDate ?? "Sin fecha"}
                      </p>
                    </Link>
                  ))
                )}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Agenda</p>
                  <h2 className="mt-2 text-3xl font-semibold">Proximas sesiones</h2>
                </div>
                <Link
                  href="/sessions"
                  className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                >
                  Ver sesiones
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {upcomingSessions.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
                    No hay sesiones programadas en este momento.
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <article
                      key={session.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                        {session.project.name}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold">{session.title}</h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {formatDate(session.scheduledFor)} · {meetingProviderLabels[session.meetingProvider]}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Siguiente accion</p>
              <h2 className="mt-2 text-3xl font-semibold">Ruta recomendada</h2>
              <div className="mt-5 space-y-3 text-sm leading-6 text-[color:var(--muted)]">
                <p>
                  {isClientRole(user.role)
                    ? "Revisa el avance de tus proyectos, compra nuevas sesiones si el saldo se acerca a cero y valida la evidencia registrada."
                    : "Entra al proyecto con mayor prioridad, mueve el Kanban y deja agenda clara para la siguiente sesion."}
                </p>
                {isAdminRole(user.role) ? (
                  <p>
                    Como admin, tambien puedes revisar usuarios inactivos, paquetes deshabilitados y resembrar el demo desde el panel administrativo.
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className="rounded-full bg-[color:var(--coral)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--ink)]"
                >
                  Ir a proyectos
                </Link>
                <Link
                  href="/sessions"
                  className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                >
                  Ir a sesiones
                </Link>
                {isAdminRole(user.role) ? (
                  <Link
                    href="/admin"
                    className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                  >
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
