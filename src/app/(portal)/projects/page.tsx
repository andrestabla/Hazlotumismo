import Link from "next/link";
import { createProjectAction } from "@/app/workspace/actions";
import { getProjectsPageData } from "@/db/portal";
import { requireUser } from "@/lib/auth/session";

export default async function ProjectsPage() {
  const user = await requireUser();
  const data = await getProjectsPageData(user);
  const advisors = data.profiles.filter((profile) => profile.role === "advisor" || profile.role === "admin");
  const clients = data.profiles.filter((profile) => profile.role === "client");

  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[color:var(--line)] bg-white/80 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Mis proyectos
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-5xl leading-none">Tus workspaces activos</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Desde aqui puedes entrar a cada proyecto, revisar el Kanban, programar sesiones y
                dejar evidencia del avance.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm">
              <p className="font-medium">{data.projects.length} proyectos visibles</p>
              <p className="text-[color:var(--muted)]">Rol actual: {user.role}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          {data.canCreateProject ? (
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Crear proyecto
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Nuevo workspace</h2>
              </div>

              <form action={createProjectAction} className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Nombre del proyecto</span>
                  <input
                    name="name"
                    required
                    placeholder="Ej. Agente de soporte para ecommerce"
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Resumen</span>
                  <textarea
                    name="summary"
                    rows={3}
                    placeholder="Que se va a construir y para que."
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Objetivo</span>
                  <textarea
                    name="goal"
                    rows={3}
                    placeholder="Que resultado debe producir el proyecto."
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Cliente</span>
                    <select
                      name="clientProfileId"
                      defaultValue=""
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                    >
                      <option value="">Sin asignar</option>
                      {clients.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Asesor lider</span>
                    <select
                      name="leadAdvisorProfileId"
                      defaultValue=""
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
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

                <button
                  type="submit"
                  className="rounded-full bg-[color:var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ink)]"
                >
                  Crear proyecto
                </button>
              </form>
            </article>
          ) : (
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Tu acceso
              </p>
              <h2 className="mt-2 text-3xl font-semibold">Vista de cliente</h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                Desde aqui puedes entrar a tus proyectos, revisar tareas, consultar el avance y ver
                el historial de las sesiones que ya compraste.
              </p>
            </article>
          )}

          <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
            <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Lista de proyectos
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Tus workspaces</h2>
              </div>
              <p className="text-sm text-[color:var(--muted)]">{data.projects.length} resultados</p>
            </div>

            <div className="mt-5 grid gap-4">
              {data.projects.length === 0 ? (
                <div className="rounded-[1.6rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] px-5 py-8 text-center">
                  <p className="text-lg font-medium">Aun no tienes proyectos visibles</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Cuando se asigne o cree un proyecto, aparecera aqui.
                  </p>
                </div>
              ) : (
                data.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-5 transition hover:-translate-y-[1px] hover:border-[color:var(--ink)]"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                          {project.status}
                        </p>
                        <h3 className="mt-2 text-2xl font-semibold">{project.name}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                          {project.summary || "Proyecto sin resumen aun."}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3 text-right">
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                          Progreso
                        </p>
                        <p className="mt-1 text-2xl font-semibold">{project.progress}%</p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-[color:var(--muted)] sm:grid-cols-3">
                      <p>Tareas: {project.taskCount}</p>
                      <p>Completadas: {project.completedTaskCount}</p>
                      <p>Sesiones agendadas: {project.scheduledSessionCount}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                      <span className="rounded-full bg-[color:var(--gold-soft)] px-3 py-1">
                        Cliente: {project.client?.fullName ?? "Sin asignar"}
                      </span>
                      <span className="rounded-full bg-[color:var(--teal-soft)] px-3 py-1">
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
