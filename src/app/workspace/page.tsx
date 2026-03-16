import Link from "next/link";
import { createProjectAction, seedWorkspaceAction } from "@/app/workspace/actions";
import { getWorkspaceIndexData } from "@/db/workspace";

export const dynamic = "force-dynamic";

function isAdvisorRole(role: string) {
  return role === "advisor" || role === "admin";
}

export default async function WorkspacePage() {
  const data = await getWorkspaceIndexData();

  if (!data.configured) {
    return (
      <main className="min-h-screen px-6 py-6 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[color:var(--line)] bg-white p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Workspace
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none">Falta conectar DATABASE_URL</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            Esta vista ya esta preparada para Neon, pero el entorno donde corre la app no tiene la
            variable `DATABASE_URL`.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/"
              className="rounded-full border border-[color:var(--line)] px-5 py-3 text-sm font-medium"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const advisors = data.profiles.filter((profile) => isAdvisorRole(profile.role));
  const clients = data.profiles.filter((profile) => profile.role === "client");

  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-[color:var(--line)] bg-white/80 px-6 py-6 backdrop-blur lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Workspace real
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none">Proyectos conectados a Neon</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
              Ya no estamos viendo una maqueta aislada. Este panel lee y escribe proyectos, tareas
              y sesiones sobre la base de datos real del MVP.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/workspace/demo"
              className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-medium transition hover:border-[color:var(--ink)]"
            >
              Ver demo visual
            </Link>
            <form action={seedWorkspaceAction}>
              <button
                type="submit"
                className="w-full rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)]"
              >
                Cargar datos demo
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Proyectos</p>
            <p className="mt-3 text-3xl font-semibold">{data.projects.length}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Workspaces visibles para asesor, cliente y operacion.
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Perfiles base
            </p>
            <p className="mt-3 text-3xl font-semibold">{data.profiles.length}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Roles disponibles para asignar clientes y asesores a cada proyecto.
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Paquetes
            </p>
            <p className="mt-3 text-3xl font-semibold">{data.packages.length}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Base para vender sesiones y luego conectarlas con reservas reales.
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
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
                  placeholder="Ej. Automatizacion comercial para estudio"
                  className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Resumen</span>
                <textarea
                  name="summary"
                  rows={3}
                  placeholder="Que se quiere construir y para que."
                  className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Objetivo del proyecto</span>
                <textarea
                  name="goal"
                  rows={3}
                  placeholder="Que resultado debe conseguir el cliente."
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

          <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
            <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Proyectos activos
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Workspace list</h2>
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                {data.projects.length === 0
                  ? "Todavia no hay proyectos creados"
                  : `${data.projects.length} proyectos en la base`}
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              {data.projects.length === 0 ? (
                <div className="rounded-[1.6rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] px-5 py-8 text-center">
                  <p className="text-lg font-medium">Todavia no hay workspaces cargados</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Puedes crear uno manualmente o cargar los datos demo para poblar la base.
                  </p>
                </div>
              ) : (
                data.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/workspace/${project.slug}`}
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
