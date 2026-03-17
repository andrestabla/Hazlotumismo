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
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="surface-card p-6 lg:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="eyebrow">Mis sesiones de trabajo</div>
              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.045em]">
                Agenda, compras y seguimiento
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Aquí ves tus sesiones programadas, tu historial y los paquetes comprados para cada
                proyecto dentro de una experiencia más ordenada y premium.
              </p>
            </div>

            <div className="editorial-frame min-w-[18rem] px-5 py-4">
              <p className="section-label">Resumen</p>
              <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {data.sessions.length} sesiones visibles
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                {data.purchases.length} compras registradas
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="grid gap-6">
            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Próximas sesiones</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Agenda inmediata
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {upcomingSessions.length === 0 ? (
                  <div className="rounded-[1rem] border border-dashed border-[color:var(--line)] bg-white/40 p-5 text-sm text-[color:var(--muted)]">
                    No hay sesiones programadas por ahora.
                  </div>
                ) : (
                  upcomingSessions.map((session) => (
                    <article
                      key={session.id}
                      className="surface-card-muted p-5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <span className="chip chip-soft">{session.project.name}</span>
                          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
                            {session.title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                            {session.agenda || "Sin agenda cargada."}
                          </p>
                        </div>
                        <div className="editorial-frame px-4 py-3 text-sm text-[color:var(--muted)]">
                          <p>{formatDate(session.scheduledFor)}</p>
                          <p className="mt-1">{session.durationMinutes} min</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 text-sm text-[color:var(--muted)] sm:grid-cols-2 xl:grid-cols-4">
                        <p>Asesor: {session.advisor.fullName}</p>
                        <p>Cliente: {session.client.fullName}</p>
                        <p>Proyecto: {session.project.name}</p>
                        <p>Proveedor: {meetingProviderLabels[session.meetingProvider]}</p>
                      </div>

                      <form action={updateSessionStatusAction} className="mt-5 grid gap-3">
                        <input type="hidden" name="sessionId" value={session.id} />
                        <input type="hidden" name="projectSlug" value={session.project.slug} />
                        <select name="status" defaultValue={session.status} className="premium-select">
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
                          className="premium-textarea"
                        />
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <button type="submit" className="premium-button px-4 py-2.5">
                            Actualizar sesión
                          </button>
                          {session.meetingUrl ? (
                            <a
                              href={session.meetingUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="premium-button premium-button-secondary px-4 py-2.5"
                            >
                              Abrir videollamada
                            </a>
                          ) : null}
                          <Link
                            href={`/projects/${session.project.slug}`}
                            className="premium-button premium-button-secondary px-4 py-2.5"
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

            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Historial</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Sesiones realizadas
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {historySessions.length === 0 ? (
                  <div className="rounded-[1rem] border border-dashed border-[color:var(--line)] bg-white/40 p-5 text-sm text-[color:var(--muted)]">
                    Aún no hay historial de sesiones.
                  </div>
                ) : (
                  historySessions.map((session) => (
                    <article
                      key={session.id}
                      className="surface-card-muted p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="chip chip-soft">{session.project.name}</span>
                          <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">
                            {session.title}
                          </h3>
                        </div>
                        <span className="chip chip-gold">{session.status}</span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                        {session.notes || session.agenda || "Sin notas registradas."}
                      </p>
                      <p className="mt-3 text-sm text-[color:var(--muted)]">
                        {formatDate(session.scheduledFor)} ·{" "}
                        {meetingProviderLabels[session.meetingProvider]}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            {(user.role === "client" || isAdminRole(user.role)) && data.packages.length > 0 ? (
              <article className="surface-card p-6">
                <div className="border-b border-[color:var(--line)] pb-4">
                  <p className="section-label">Comprar sesiones</p>
                  <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                    Paquetes disponibles
                  </h2>
                </div>

                <form action={purchaseSessionPackageAction} className="mt-6 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Proyecto
                    </span>
                    <select name="projectId" defaultValue="" className="premium-select">
                      <option value="">Selecciona un proyecto</option>
                      {data.projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Paquete
                    </span>
                    <select name="sessionPackageId" defaultValue="" className="premium-select">
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
                      <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                        Cliente
                      </span>
                      <select name="clientProfileId" defaultValue="" className="premium-select">
                        <option value="">Selecciona un cliente</option>
                        {data.projects.map((project) =>
                          project.clientProfileId ? (
                            <option
                              key={`${project.id}-${project.clientProfileId}`}
                              value={project.clientProfileId}
                            >
                              {project.client?.fullName ?? project.name}
                            </option>
                          ) : null,
                        )}
                      </select>
                    </label>
                  ) : null}

                  <button type="submit" className="premium-button w-full sm:w-fit">
                    Registrar compra
                  </button>
                </form>
              </article>
            ) : null}

            <article className="dark-panel p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Compras</p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                Paquetes adquiridos
              </h2>

              <div className="mt-6 space-y-4">
                {data.purchases.length === 0 ? (
                  <p className="text-sm leading-6 text-white/72">No hay compras registradas.</p>
                ) : (
                  data.purchases.map((purchase) => (
                    <article
                      key={purchase.id}
                      className="rounded-[1rem] border border-white/10 bg-white/6 p-5"
                    >
                      <h3 className="text-lg font-semibold">
                        {purchase.sessionPackage?.name ?? "Paquete"}
                      </h3>
                      <div className="mt-3 space-y-1 text-sm text-white/72">
                        <p>Proyecto: {purchase.project?.name ?? "Sin proyecto"}</p>
                        {"client" in purchase && purchase.client ? (
                          <p>Cliente: {purchase.client.fullName}</p>
                        ) : null}
                        <p>Estado: {purchase.status}</p>
                        <p>
                          Sesiones: {purchase.sessionsRemaining} restantes de{" "}
                          {purchase.sessionsTotal}
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
