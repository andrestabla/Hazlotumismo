import Link from "next/link";
import { createProjectAction } from "@/app/workspace/actions";
import { getProjectsPageData } from "@/db/portal";
import { requireUser } from "@/lib/auth/session";

export default async function ProjectsPage() {
  const user = await requireUser();
  const data = await getProjectsPageData(user);
  const advisors = data.profiles.filter(
    (profile) => profile.role === "advisor" || profile.role === "admin",
  );
  const clients = data.profiles.filter((profile) => profile.role === "client");

  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="surface-card p-6 lg:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="eyebrow">Mis proyectos</div>
              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.045em]">
                Tus workspaces activos
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Entra a cada proyecto, revisa el Kanban, programa sesiones y deja evidencia del
                avance dentro de una experiencia más pulida y clara.
              </p>
            </div>

            <div className="editorial-frame min-w-[18rem] px-5 py-4">
              <p className="section-label">Resumen</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {data.projects.length} proyectos visibles
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Rol actual: {user.role}
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          {data.canCreateProject ? (
            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Crear proyecto</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Nuevo workspace
                </h2>
              </div>

              <form action={createProjectAction} className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Nombre del proyecto
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="Ej. Agente de soporte para ecommerce"
                    className="premium-input"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Resumen
                  </span>
                  <textarea
                    name="summary"
                    rows={3}
                    placeholder="Qué se va a construir y para qué."
                    className="premium-textarea"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Objetivo
                  </span>
                  <textarea
                    name="goal"
                    rows={3}
                    placeholder="Qué resultado debe producir el proyecto."
                    className="premium-textarea"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Cliente
                    </span>
                    <select name="clientProfileId" defaultValue="" className="premium-select">
                      <option value="">Sin asignar</option>
                      {clients.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Asesor líder
                    </span>
                    <select
                      name="leadAdvisorProfileId"
                      defaultValue=""
                      className="premium-select"
                    >
                      <option value="">Sin asignar</option>
                      {advisors.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <button type="submit" className="premium-button w-full sm:w-fit">
                  Crear proyecto
                </button>
              </form>
            </article>
          ) : (
            <article className="surface-card p-6">
              <p className="section-label">Tu acceso</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                Vista de cliente
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                Desde aquí puedes entrar a tus proyectos, revisar tareas, consultar el avance y
                ver el historial de las sesiones que ya compraste.
              </p>
            </article>
          )}

          <article className="surface-card p-6">
            <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Lista de proyectos</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Tus workspaces
                </h2>
              </div>
              <span className="chip chip-soft">{data.projects.length} resultados</span>
            </div>

            <div className="mt-6 grid gap-4">
              {data.projects.length === 0 ? (
                <div className="rounded-[1rem] border border-dashed border-[color:var(--line)] bg-white/40 px-5 py-8 text-center">
                  <p className="text-lg font-medium">Aún no tienes proyectos visibles</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Cuando se asigne o cree un proyecto, aparecerá aquí.
                  </p>
                </div>
              ) : (
                data.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="surface-card-muted p-5 transition hover:-translate-y-[1px]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <span className="chip chip-soft">{project.status}</span>
                        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                          {project.name}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                          {project.summary || "Proyecto sin resumen aún."}
                        </p>
                      </div>
                      <div className="editorial-frame px-4 py-3 text-right">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                          Progreso
                        </p>
                        <p className="mt-2 text-3xl font-semibold">{project.progress}%</p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 text-sm text-[color:var(--muted)] sm:grid-cols-3">
                      <p>Tareas: {project.taskCount}</p>
                      <p>Completadas: {project.completedTaskCount}</p>
                      <p>Sesiones agendadas: {project.scheduledSessionCount}</p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 text-sm">
                      <span className="chip chip-gold">
                        Cliente: {project.client?.fullName ?? "Sin asignar"}
                      </span>
                      <span className="chip chip-cool">
                        Asesor: {project.leadAdvisor?.fullName ?? "Sin asignar"}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
