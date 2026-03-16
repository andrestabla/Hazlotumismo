import Link from "next/link";
import { notFound } from "next/navigation";
import {
  addEvidenceAction,
  createSessionAction,
  createTaskAction,
  updateSessionStatusAction,
  updateTaskWorkflowAction,
} from "@/app/workspace/actions";
import { getProjectBySlugForUser } from "@/db/portal";
import { formatDateOnly, formatDateTime } from "@/lib/date-format";
import { meetingProviderLabels } from "@/lib/meetings";
import { requireUser } from "@/lib/auth/session";

const kanbanColumns = [
  { key: "todo", label: "Pendiente", tone: "bg-white" },
  { key: "in_progress", label: "En progreso", tone: "bg-[color:var(--gold-soft)]" },
  { key: "in_review", label: "En revision", tone: "bg-[color:var(--coral-soft)]" },
  { key: "done", label: "Completado", tone: "bg-[color:var(--teal-soft)]" },
] as const;

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await requireUser();
  const { slug } = await params;
  const project = await getProjectBySlugForUser(slug, user);

  if (!project) {
    notFound();
  }

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

  const projectStats = [
    { label: "Progreso", value: `${project.progress}%` },
    { label: "Tareas", value: `${taskCounts.total}` },
    { label: "Evidencias", value: `${taskCounts.evidence}` },
  ];

  return (
    <main className="site-shell min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="glass-panel rounded-[2.6rem] p-6 lg:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-3">
                <span className="chip chip-soft">{project.status}</span>
                <span className="chip chip-soft">{project.slug}</span>
              </div>
              <h1 className="mt-5 font-display text-5xl leading-[0.94] tracking-[-0.03em]">
                {project.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                {project.summary || "Este proyecto todavia no tiene resumen."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 text-sm">
                <span className="chip chip-gold">
                  Cliente: {project.client?.fullName ?? "Sin asignar"}
                </span>
                <span className="chip chip-cool">
                  Asesor: {project.leadAdvisor?.fullName ?? "Sin asignar"}
                </span>
                <span className="chip chip-soft">
                  Objetivo: {project.goal || "Por definir"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className="premium-button premium-button-secondary px-5 py-3">
                Volver a mis proyectos
              </Link>
              <Link href="/sessions" className="premium-button px-5 py-3">
                Ver mis sesiones
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {projectStats.map((stat) => (
              <article key={stat.label} className="stat-card rounded-[1.7rem] p-4">
                <p className="section-label">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.03em]">{stat.value}</p>
              </article>
            ))}
            <article className="dark-panel rounded-[1.7rem] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Sesiones</p>
              <p className="mt-3 text-3xl font-semibold">{taskCounts.sessions}</p>
            </article>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-6">
            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Nueva tarea</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                  Agregar trabajo al proyecto
                </h2>
              </div>

              <form action={createTaskAction} className="mt-6 grid gap-4">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="projectSlug" value={project.slug} />

                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Titulo
                    </span>
                    <input
                      name="title"
                      required
                      placeholder="Ej. Documentar objeciones de venta"
                      className="premium-input"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Responsable
                    </span>
                    <select name="assigneeProfileId" defaultValue="" className="premium-select">
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
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Descripcion
                  </span>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Que debe pasar para considerar esta tarea como hecha."
                    className="premium-textarea"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Prioridad
                    </span>
                    <select name="priority" defaultValue="medium" className="premium-select">
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Fecha objetivo
                    </span>
                    <input name="dueDate" type="date" className="premium-input" />
                  </label>
                </div>

                <button type="submit" className="premium-button w-full sm:w-fit">
                  Crear tarea
                </button>
              </form>
            </article>

            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Kanban</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Tareas del proyecto
                  </h2>
                </div>
                <span className="chip chip-soft">
                  {taskCounts.completed} de {taskCounts.total} completadas
                </span>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-4">
                {kanbanColumns.map((column) => {
                  const columnTasks = project.tasks.filter((task) => task.status === column.key);

                  return (
                    <div
                      key={column.key}
                      className={`rounded-[1.9rem] border border-[color:var(--line)] p-4 ${column.tone}`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                          {column.label}
                        </p>
                        <span className="chip chip-soft">{columnTasks.length}</span>
                      </div>

                      <div className="mt-4 space-y-3">
                        {columnTasks.length === 0 ? (
                          <div className="rounded-[1.45rem] border border-dashed border-[color:var(--line)] bg-white/70 p-4 text-sm text-[color:var(--muted)]">
                            Sin tareas en esta columna.
                          </div>
                        ) : (
                          columnTasks.map((task) => (
                            <article
                              key={task.id}
                              className="rounded-[1.5rem] border border-[color:var(--line)] bg-white/90 p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <h3 className="text-sm font-semibold">{task.title}</h3>
                                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                                    {task.description || "Sin descripcion."}
                                  </p>
                                </div>
                                <span className="chip chip-soft">{task.priority}</span>
                              </div>

                              <div className="mt-4 space-y-1 text-xs leading-5 text-[color:var(--muted)]">
                                <p>Responsable: {task.assignee?.fullName ?? "Sin asignar"}</p>
                                <p>Fecha objetivo: {formatDateOnly(task.dueDate)}</p>
                                <p>Evidencias: {task.evidence.length}</p>
                              </div>

                              <form action={updateTaskWorkflowAction} className="mt-4 grid gap-3">
                                <input type="hidden" name="taskId" value={task.id} />
                                <input type="hidden" name="projectId" value={project.id} />
                                <input type="hidden" name="projectSlug" value={project.slug} />
                                <select name="status" defaultValue={task.status} className="premium-select">
                                  <option value="todo">Pendiente</option>
                                  <option value="in_progress">En progreso</option>
                                  <option value="in_review">En revision</option>
                                  <option value="done">Completado</option>
                                  <option value="backlog">Backlog</option>
                                </select>
                                <select
                                  name="priority"
                                  defaultValue={task.priority}
                                  className="premium-select"
                                >
                                  <option value="low">Baja</option>
                                  <option value="medium">Media</option>
                                  <option value="high">Alta</option>
                                </select>
                                <button type="submit" className="premium-button w-full px-4 py-2.5">
                                  Guardar estado
                                </button>
                              </form>

                              <form action={addEvidenceAction} className="mt-4 grid gap-2">
                                <input type="hidden" name="taskId" value={task.id} />
                                <input type="hidden" name="projectId" value={project.id} />
                                <input type="hidden" name="projectSlug" value={project.slug} />
                                <input
                                  name="title"
                                  required
                                  placeholder="Titulo de evidencia"
                                  className="premium-input"
                                />
                                <textarea
                                  name="content"
                                  rows={2}
                                  placeholder="Nota, hallazgo o avance."
                                  className="premium-textarea"
                                />
                                <button
                                  type="submit"
                                  className="premium-button premium-button-secondary w-full px-4 py-2.5"
                                >
                                  Agregar evidencia
                                </button>
                              </form>
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
            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Agendar sesion</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                  Reserva de trabajo
                </h2>
              </div>

              <form action={createSessionAction} className="mt-6 grid gap-4">
                <input type="hidden" name="projectId" value={project.id} />
                <input type="hidden" name="projectSlug" value={project.slug} />

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Titulo
                  </span>
                  <input
                    name="title"
                    required
                    placeholder="Ej. Sesion 04 - integraciones"
                    className="premium-input"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Agenda
                  </span>
                  <textarea
                    name="agenda"
                    rows={3}
                    placeholder="Que se espera resolver en la sesion."
                    className="premium-textarea"
                  />
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Fecha y hora
                    </span>
                    <input name="scheduledFor" type="datetime-local" className="premium-input" />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Duracion
                    </span>
                    <input
                      name="durationMinutes"
                      type="number"
                      min="30"
                      step="30"
                      defaultValue="60"
                      className="premium-input"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Asesor
                    </span>
                    <select
                      name="advisorProfileId"
                      defaultValue={project.leadAdvisorProfileId ?? ""}
                      className="premium-select"
                    >
                      {advisors.length === 0 ? <option value="">Sin asesor disponible</option> : null}
                      {advisors.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Cliente
                    </span>
                    <select
                      name="clientProfileId"
                      defaultValue={project.clientProfileId ?? ""}
                      className="premium-select"
                    >
                      {clients.length === 0 ? <option value="">Sin cliente disponible</option> : null}
                      {clients.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                          {profile.fullName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Compra asociada
                  </span>
                  <select name="purchaseId" defaultValue="" className="premium-select">
                    <option value="">Sin asociar</option>
                    {availablePurchases.map((purchase) => (
                      <option key={purchase.id} value={purchase.id}>
                        {purchase.sessionPackage?.name ?? "Paquete"} ·{" "}
                        {purchase.sessionsRemaining} restantes
                      </option>
                    ))}
                  </select>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Proveedor de videollamada
                    </span>
                    <select
                      name="meetingProvider"
                      defaultValue="google_meet"
                      className="premium-select"
                    >
                      {Object.entries(meetingProviderLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Enlace de videollamada
                    </span>
                    <input
                      name="meetingUrl"
                      type="url"
                      placeholder="https://meet.google.com/..."
                      className="premium-input"
                    />
                  </label>
                </div>

                <button type="submit" className="premium-button w-full sm:w-fit">
                  Crear sesion
                </button>
              </form>
            </article>

            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Historial de sesiones</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                  Agenda del proyecto
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {project.sessions.length === 0 ? (
                  <div className="rounded-[1.8rem] border border-dashed border-[color:var(--line)] bg-white/40 p-5 text-sm text-[color:var(--muted)]">
                    Todavia no hay sesiones registradas.
                  </div>
                ) : (
                  project.sessions.map((session) => (
                    <article key={session.id} className="surface-card-muted rounded-[1.8rem] p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold tracking-[-0.02em]">
                            {session.title}
                          </h3>
                          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                            {session.agenda || "Sin agenda cargada."}
                          </p>
                        </div>
                        <span className="chip chip-soft">{session.status}</span>
                      </div>

                      <div className="mt-4 space-y-1 text-sm text-[color:var(--muted)]">
                        <p>Fecha: {formatDateTime(session.scheduledFor)}</p>
                        <p>Asesor: {session.advisor.fullName}</p>
                        <p>Cliente: {session.client.fullName}</p>
                        <p>Duracion: {session.durationMinutes} min</p>
                        <p>Proveedor: {meetingProviderLabels[session.meetingProvider]}</p>
                        {session.purchase ? (
                          <p>
                            Compra: {session.purchase.sessionPackage?.name ?? "Paquete asociado"}
                          </p>
                        ) : null}
                      </div>

                      <form action={updateSessionStatusAction} className="mt-4 grid gap-3">
                        <input type="hidden" name="sessionId" value={session.id} />
                        <input type="hidden" name="projectSlug" value={project.slug} />
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
                          placeholder="Notas o acuerdos de la sesion."
                          className="premium-textarea"
                        />
                        <button
                          type="submit"
                          className="premium-button premium-button-secondary w-full px-4 py-2.5"
                        >
                          Guardar sesion
                        </button>
                      </form>

                      {session.meetingUrl ? (
                        <a
                          href={session.meetingUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="premium-button premium-button-secondary mt-4 inline-flex px-4 py-2.5"
                        >
                          Abrir videollamada
                        </a>
                      ) : null}
                    </article>
                  ))
                )}
              </div>
            </article>

            <article className="dark-panel rounded-[2.3rem] p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                Compras y saldo
              </p>
              <div className="mt-5 space-y-4">
                {project.purchases.length === 0 ? (
                  <p className="text-sm leading-6 text-white/72">No hay compras registradas aun.</p>
                ) : (
                  project.purchases.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="rounded-[1.6rem] border border-white/10 bg-white/6 p-4"
                    >
                      <p className="text-sm font-semibold">
                        {purchase.sessionPackage?.name ?? "Paquete"}
                      </p>
                      <p className="mt-2 text-sm text-white/72">
                        Estado: {purchase.status} · Restantes: {purchase.sessionsRemaining} /{" "}
                        {purchase.sessionsTotal}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/6 p-4">
                <p className="text-sm font-semibold">Miembros del proyecto</p>
                <div className="mt-3 space-y-2 text-sm text-white/72">
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
