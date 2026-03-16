import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addEvidenceAction,
  createSessionAction,
  createTaskAction,
  updateTaskWorkflowAction,
} from "@/app/workspace/actions";
import { getProjectWorkspaceData } from "@/db/workspace";

export const dynamic = "force-dynamic";

const kanbanColumns = [
  { key: "todo", label: "Pendiente", tone: "bg-white" },
  { key: "in_progress", label: "En progreso", tone: "bg-[color:var(--gold-soft)]" },
  { key: "in_review", label: "En revision", tone: "bg-[color:var(--coral-soft)]" },
  { key: "done", label: "Completado", tone: "bg-[color:var(--teal-soft)]" },
] as const;

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

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProjectWorkspaceData(slug);

  if (!data.configured) {
    return (
      <main className="min-h-screen px-6 py-6 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[color:var(--line)] bg-white p-8">
          <h1 className="font-display text-5xl leading-none">DATABASE_URL no esta configurada</h1>
          <p className="mt-4 text-lg leading-8 text-[color:var(--muted)]">
            Esta pantalla necesita conexion activa a Neon para leer el proyecto solicitado.
          </p>
        </div>
      </main>
    );
  }

  if (!data.project) {
    notFound();
  }

  const project = data.project;
  const taskCounts = {
    total: project.tasks.length,
    completed: project.tasks.filter((task) => task.status === "done").length,
    evidence: project.tasks.reduce((total, task) => total + task.evidence.length, 0),
    sessions: project.sessions.length,
  };
  const clients = project.members
    .map((member) => member.profile)
    .filter((profile) => profile.role === "client");
  const advisors = project.members
    .map((member) => member.profile)
    .filter((profile) => profile.role === "advisor" || profile.role === "admin");
  const availablePurchases = project.purchases.filter((purchase) => purchase.sessionsRemaining > 0);

  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[color:var(--line)] bg-white/80 p-6 backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                <span>{project.status}</span>
                <span>{project.slug}</span>
              </div>
              <h1 className="mt-3 font-display text-5xl leading-none">{project.name}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                {project.summary || "Este proyecto todavia no tiene resumen."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-[color:var(--gold-soft)] px-3 py-1">
                  Cliente: {project.client?.fullName ?? "Sin asignar"}
                </span>
                <span className="rounded-full bg-[color:var(--teal-soft)] px-3 py-1">
                  Asesor: {project.leadAdvisor?.fullName ?? "Sin asignar"}
                </span>
                <span className="rounded-full bg-[color:var(--paper)] px-3 py-1">
                  Objetivo: {project.goal || "Por definir"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workspace"
                className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-medium transition hover:border-[color:var(--ink)]"
              >
                Volver al workspace
              </Link>
              <Link
                href="/workspace/demo"
                className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)]"
              >
                Comparar con demo
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            <article className="rounded-[1.5rem] bg-[color:var(--paper-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Progreso</p>
              <p className="mt-2 text-3xl font-semibold">{project.progress}%</p>
            </article>
            <article className="rounded-[1.5rem] bg-[color:var(--paper-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Tareas</p>
              <p className="mt-2 text-3xl font-semibold">{taskCounts.total}</p>
            </article>
            <article className="rounded-[1.5rem] bg-[color:var(--paper-strong)] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Evidencias
              </p>
              <p className="mt-2 text-3xl font-semibold">{taskCounts.evidence}</p>
            </article>
            <article className="rounded-[1.5rem] bg-[color:var(--ink)] p-4 text-[color:var(--paper-strong)]">
              <p className="text-xs uppercase tracking-[0.22em] text-white/65">Sesiones</p>
              <p className="mt-2 text-3xl font-semibold">{taskCounts.sessions}</p>
            </article>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Nueva tarea
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Agregar trabajo al proyecto</h2>
              </div>

              <form action={createTaskAction} className="mt-5 grid gap-4">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="projectSlug" value={project.slug} />
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Titulo</span>
                    <input
                      name="title"
                      required
                      placeholder="Ej. Documentar objeciones de venta"
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Responsable</span>
                    <select
                      name="assigneeProfileId"
                      defaultValue=""
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                    >
                      <option value="">Sin asignar</option>
                      {project.members.map((member) => (
                        <option key={member.profile.id} value={member.profile.id}>
                          {member.profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Descripcion</span>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Que debe pasar para considerar esta tarea como hecha."
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Prioridad</span>
                    <select
                      name="priority"
                      defaultValue="medium"
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Fecha objetivo</span>
                    <input
                      name="dueDate"
                      type="date"
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[color:var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ink)]"
                >
                  Crear tarea
                </button>
              </form>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Kanban real
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">Tareas conectadas a Neon</h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  {taskCounts.completed} de {taskCounts.total} completadas
                </p>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-4">
                {kanbanColumns.map((column) => {
                  const columnTasks = project.tasks.filter((task) => task.status === column.key);

                  return (
                    <div
                      key={column.key}
                      className={`rounded-[1.75rem] border border-[color:var(--line)] p-4 ${column.tone}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                          {column.label}
                        </p>
                        <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium">
                          {columnTasks.length}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3">
                        {columnTasks.length === 0 ? (
                          <div className="rounded-[1.35rem] border border-dashed border-[color:var(--line)] bg-white/70 p-4 text-sm text-[color:var(--muted)]">
                            Sin tareas en esta columna.
                          </div>
                        ) : (
                          columnTasks.map((task) => (
                            <article
                              key={task.id}
                              className="rounded-[1.35rem] border border-[color:var(--line)] bg-white p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="text-sm font-semibold">{task.title}</h3>
                                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                                    {task.description || "Sin descripcion."}
                                  </p>
                                </div>
                                <span className="rounded-full bg-[color:var(--paper)] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                                  {task.priority}
                                </span>
                              </div>

                              <div className="mt-3 space-y-1 text-xs text-[color:var(--muted)]">
                                <p>Responsable: {task.assignee?.fullName ?? "Sin asignar"}</p>
                                <p>Fecha objetivo: {task.dueDate ?? "Sin fecha"}</p>
                                <p>Evidencias: {task.evidence.length}</p>
                              </div>

                              <form action={updateTaskWorkflowAction} className="mt-4 grid gap-3">
                                <input type="hidden" name="taskId" value={task.id} />
                                <input type="hidden" name="projectSlug" value={project.slug} />
                                <select
                                  name="status"
                                  defaultValue={task.status}
                                  className="rounded-xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-3 py-2 text-sm"
                                >
                                  <option value="todo">Pendiente</option>
                                  <option value="in_progress">En progreso</option>
                                  <option value="in_review">En revision</option>
                                  <option value="done">Completado</option>
                                  <option value="backlog">Backlog</option>
                                </select>
                                <select
                                  name="priority"
                                  defaultValue={task.priority}
                                  className="rounded-xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-3 py-2 text-sm"
                                >
                                  <option value="low">Baja</option>
                                  <option value="medium">Media</option>
                                  <option value="high">Alta</option>
                                </select>
                                <button
                                  type="submit"
                                  className="rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper-strong)]"
                                >
                                  Guardar estado
                                </button>
                              </form>

                              <form action={addEvidenceAction} className="mt-4 grid gap-2">
                                <input type="hidden" name="taskId" value={task.id} />
                                <input type="hidden" name="projectSlug" value={project.slug} />
                                <input
                                  name="title"
                                  required
                                  placeholder="Titulo de evidencia"
                                  className="rounded-xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-3 py-2 text-sm"
                                />
                                <textarea
                                  name="content"
                                  rows={2}
                                  placeholder="Nota, hallazgo o avance."
                                  className="rounded-xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-3 py-2 text-sm"
                                />
                                <button
                                  type="submit"
                                  className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium"
                                >
                                  Agregar evidencia
                                </button>
                              </form>

                              {task.evidence.length > 0 ? (
                                <div className="mt-4 rounded-[1rem] bg-[color:var(--paper)] p-3">
                                  <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                                    Ultima evidencia
                                  </p>
                                  <p className="mt-2 text-sm font-medium">
                                    {task.evidence[task.evidence.length - 1]?.title}
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                                    {task.evidence[task.evidence.length - 1]?.content ||
                                      "Sin detalle adicional."}
                                  </p>
                                </div>
                              ) : null}
                            </article>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Agendar sesion
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Reserva manual</h2>
              </div>

              <form action={createSessionAction} className="mt-5 grid gap-4">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="projectSlug" value={project.slug} />

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Titulo</span>
                  <input
                    name="title"
                    required
                    placeholder="Ej. Sesion 04 - integraciones"
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Agenda</span>
                  <textarea
                    name="agenda"
                    rows={3}
                    placeholder="Que se espera resolver en la sesion."
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Fecha y hora</span>
                    <input
                      name="scheduledFor"
                      type="datetime-local"
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Duracion</span>
                    <input
                      name="durationMinutes"
                      type="number"
                      min="30"
                      step="30"
                      defaultValue="60"
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Asesor</span>
                    <select
                      name="advisorProfileId"
                      defaultValue={project.leadAdvisorProfileId ?? ""}
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                    >
                      {advisors.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Cliente</span>
                    <select
                      name="clientProfileId"
                      defaultValue={project.clientProfileId ?? ""}
                      className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                    >
                      {clients.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Compra asociada</span>
                  <select
                    name="purchaseId"
                    defaultValue=""
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                  >
                    <option value="">Sin asociar</option>
                    {availablePurchases.map((purchase) => (
                      <option key={purchase.id} value={purchase.id}>
                        {purchase.sessionPackage?.name ?? "Paquete"} · {purchase.sessionsRemaining}{" "}
                        restantes
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">Enlace de videollamada</span>
                  <input
                    name="meetingUrl"
                    type="url"
                    placeholder="https://meet.google.com/..."
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)]"
                >
                  Crear sesion
                </button>
              </form>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  Historial de sesiones
                </p>
                <h2 className="mt-2 text-3xl font-semibold">Agenda del proyecto</h2>
              </div>

              <div className="mt-5 space-y-4">
                {project.sessions.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-[color:var(--line)] bg-[color:var(--paper)] p-4 text-sm text-[color:var(--muted)]">
                    Todavia no hay sesiones registradas.
                  </div>
                ) : (
                  project.sessions.map((session) => (
                    <article
                      key={session.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">{session.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                            {session.agenda || "Sin agenda cargada."}
                          </p>
                        </div>
                        <span className="rounded-full bg-[color:var(--paper)] px-2.5 py-1 text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                          {session.status}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1 text-sm text-[color:var(--muted)]">
                        <p>Fecha: {formatDate(session.scheduledFor)}</p>
                        <p>Asesor: {session.advisor.fullName}</p>
                        <p>Cliente: {session.client.fullName}</p>
                        <p>Duracion: {session.durationMinutes} min</p>
                      </div>
                      {session.meetingUrl ? (
                        <a
                          href={session.meetingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                        >
                          Abrir videollamada
                        </a>
                      ) : null}
                    </article>
                  ))
                )}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--ink)] p-6 text-[color:var(--paper-strong)]">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Compras y saldo</p>
              <div className="mt-5 space-y-4">
                {project.purchases.length === 0 ? (
                  <p className="text-sm leading-6 text-white/75">No hay compras registradas aun.</p>
                ) : (
                  project.purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4"
                    >
                      <p className="text-sm font-semibold">
                        {purchase.sessionPackage?.name ?? "Paquete"}
                      </p>
                      <p className="mt-2 text-sm text-white/75">
                        Estado: {purchase.status} · Restantes: {purchase.sessionsRemaining} /{" "}
                        {purchase.sessionsTotal}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                <p className="text-sm font-semibold">Miembros del proyecto</p>
                <div className="mt-3 space-y-2 text-sm text-white/75">
                  {project.members.map((member) => (
                    <p key={`${member.projectId}-${member.profileId}`}>
                      {member.profile.fullName} · {member.role}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
