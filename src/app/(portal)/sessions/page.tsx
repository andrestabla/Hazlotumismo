import Link from "next/link";
import {
  purchaseSessionPackageAction,
  updateSessionStatusAction,
} from "@/app/workspace/actions";
import { getSessionsPageData } from "@/db/portal";
import { requireUser } from "@/lib/auth/session";
import { isAdminRole } from "@/lib/auth/roles";
import { meetingProviderLabels } from "@/lib/meetings";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value?: Date | string | null) {
  if (!value) {
    return "Sin fecha";
  }

  return dateFormatter.format(new Date(value));
}

export default async function SessionsPage() {
  const user = await requireUser();
  const data = await getSessionsPageData(user);
  const upcomingSessions = data.sessions.filter((session) => session.status === "scheduled");
  const historySessions = data.sessions.filter((session) => session.status !== "scheduled");

  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[color:var(--line)] bg-white/80 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Mis sesiones de trabajo
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-5xl leading-none">Agenda, compras y seguimiento</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Aqui ves tus sesiones programadas, tu historial y los paquetes comprados para cada
                proyecto.
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-white px-4 py-3 text-sm">
              <p className="font-medium">{data.sessions.length} sesiones visibles</p>
              <p className="text-[color:var(--muted)]">{data.purchases.length} compras registradas</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Proximas sesiones
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Agenda inmediata</h2>
              </div>

              <div className="mt-5 space-y-4">
                {upcomingSessions.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
                    No hay sesiones programadas por ahora.
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <article
                      key={session.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                            {session.project.name}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold">{session.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                            {session.agenda || "Sin agenda cargada."}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[color:var(--muted)]">
                          <p>{formatDate(session.scheduledFor)}</p>
                          <p className="mt-1">{session.durationMinutes} min</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-[color:var(--muted)] sm:grid-cols-2 xl:grid-cols-4">
                        <p>Asesor: {session.advisor.fullName}</p>
                        <p>Cliente: {session.client.fullName}</p>
                        <p>Proyecto: {session.project.name}</p>
                        <p>Proveedor: {meetingProviderLabels[session.meetingProvider]}</p>
                      </div>

                      <form action={updateSessionStatusAction} className="mt-4 grid gap-3">
                        <input type="hidden" name="sessionId" value={session.id} />
                        <input type="hidden" name="projectSlug" value={session.project.slug} />
                        <select
                          name="status"
                          defaultValue={session.status}
                          className="rounded-xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm"
                        >
                          <option value="scheduled">Programada</option>
                          <option value="completed">Realizada</option>
                          <option value="cancelled">Cancelada</option>
                          <option value="no_show">No show</option>
                        </select>
                        <textarea
                          name="notes"
                          defaultValue={session.notes ?? ""}
                          rows={3}
                          placeholder="Notas de seguimiento o acuerdos."
                          className="rounded-xl border border-[color:var(--line)] bg-white px-3 py-2 text-sm"
                        />
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button
                            type="submit"
                            className="rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper-strong)]"
                          >
                            Actualizar sesion
                          </button>
                          {session.meetingUrl ? (
                            <a
                              href={session.meetingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                            >
                              Abrir videollamada
                            </a>
                          ) : null}
                          <Link
                            href={`/projects/${session.project.slug}`}
                            className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                          >
                            Ver proyecto
                          </Link>
                        </div>
                      </form>
                    </article>
                  ))
                )}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Historial
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Sesiones realizadas</h2>
              </div>

              <div className="mt-5 space-y-4">
                {historySessions.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
                    Aun no hay historial de sesiones.
                  </div>
                ) : (
                  historySessions.map((session) => (
                    <article
                      key={session.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                            {session.project.name}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold">{session.title}</h3>
                        </div>
                        <span className="rounded-full bg-[color:var(--paper)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                          {session.status}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                        {session.notes || session.agenda || "Sin notas registradas."}
                      </p>
                      <p className="mt-3 text-sm text-[color:var(--muted)]">
                        {formatDate(session.scheduledFor)} · {meetingProviderLabels[session.meetingProvider]}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            {(user.role === "client" || isAdminRole(user.role)) && data.packages.length > 0 ? (
              <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
                <div className="border-b border-[color:var(--line)] pb-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Comprar sesiones
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">Paquetes disponibles</h2>
                </div>

                <form action={purchaseSessionPackageAction} className="mt-5 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Proyecto</span>
                    <select
                      name="projectId"
                      defaultValue=""
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    >
                      <option value="">Selecciona un proyecto</option>
                      {data.projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Paquete</span>
                    <select
                      name="sessionPackageId"
                      defaultValue=""
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    >
                      <option value="">Selecciona un paquete</option>
                      {data.packages.map((sessionPackage) => (
                        <option key={sessionPackage.id} value={sessionPackage.id}>
                          {sessionPackage.name} · {(sessionPackage.priceCents / 100).toFixed(0)} USD
                        </option>
                      ))}
                    </select>
                  </label>

                  {isAdminRole(user.role) ? (
                    <label className="grid gap-2">
                      <span className="text-sm font-medium">Cliente</span>
                      <select
                        name="clientProfileId"
                        defaultValue=""
                        className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                      >
                        <option value="">Selecciona un cliente</option>
                        {data.projects.map((project) =>
                          project.clientProfileId ? (
                            <option key={`${project.id}-${project.clientProfileId}`} value={project.clientProfileId}>
                              {project.client?.fullName ?? project.name}
                            </option>
                          ) : null,
                        )}
                      </select>
                    </label>
                  ) : null}

                  <button
                    type="submit"
                    className="rounded-full bg-[color:var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ink)]"
                  >
                    Registrar compra MVP
                  </button>
                </form>
              </article>
            ) : null}

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Compras
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Paquetes adquiridos</h2>
              </div>

              <div className="mt-5 space-y-4">
                {data.purchases.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
                    No hay compras registradas.
                  </div>
                ) : (
                  data.purchases.map((purchase) => (
                    <article
                      key={purchase.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <h3 className="text-lg font-semibold">
                        {purchase.sessionPackage?.name ?? "Paquete"}
                      </h3>
                      <div className="mt-3 space-y-1 text-sm text-[color:var(--muted)]">
                        <p>Proyecto: {purchase.project?.name ?? "Sin proyecto"}</p>
                        {"client" in purchase && purchase.client ? (
                          <p>Cliente: {purchase.client.fullName}</p>
                        ) : null}
                        <p>Estado: {purchase.status}</p>
                        <p>
                          Sesiones: {purchase.sessionsRemaining} restantes de {purchase.sessionsTotal}
                        </p>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
