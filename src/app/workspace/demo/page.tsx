import Link from "next/link";

const columns = [
  {
    title: "Pendiente",
    tone: "bg-white",
    tasks: [
      {
        title: "Definir tono del bot",
        detail: "Alinear respuestas con propuesta comercial.",
      },
      {
        title: "Subir FAQs del negocio",
        detail: "Pendiente por parte del cliente.",
      },
    ],
  },
  {
    title: "En progreso",
    tone: "bg-[color:var(--gold-soft)]",
    tasks: [
      {
        title: "Configurar base de conocimiento",
        detail: "Se integran documentos y sitio actual.",
      },
      {
        title: "Disenar flujo de leads",
        detail: "Formulario, email y CRM ligero.",
      },
    ],
  },
  {
    title: "En revision",
    tone: "bg-[color:var(--coral-soft)]",
    tasks: [
      {
        title: "Pruebas con respuestas reales",
        detail: "Sesion 03 definira ajustes finales.",
      },
    ],
  },
  {
    title: "Completado",
    tone: "bg-[color:var(--teal-soft)]",
    tasks: [
      {
        title: "Brief del proyecto",
        detail: "Objetivo y alcance ya validados.",
      },
      {
        title: "Mapa de preguntas frecuentes",
        detail: "Documento inicial entregado.",
      },
    ],
  },
];

const activities = [
  {
    title: "Sesion 02 cerrada",
    detail: "Se definio el flujo de calificacion y el bot ya tiene estructura base.",
    time: "Hoy · 7:45 PM",
  },
  {
    title: "Nueva evidencia cargada",
    detail: "Se adjunto mapa del recorrido de prospecto y checklist de mensajes.",
    time: "Hoy · 6:10 PM",
  },
  {
    title: "Reserva confirmada",
    detail: "Sesion 03 programada para el miercoles con enlace de Google Meet.",
    time: "Ayer · 9:20 AM",
  },
];

const deliverables = [
  "Bot comercial entrenado",
  "Flujo de captura de leads",
  "Mensajes base de ventas",
  "Checklist operativo del cliente",
];

const metrics = [
  {
    label: "Estado",
    value: "En ejecucion",
    detail: "El proyecto ya avanza entre sesiones, contenido y pruebas.",
  },
  {
    label: "Progreso",
    value: "68%",
    detail: "Hay una lectura clara del momento actual del proyecto.",
  },
  {
    label: "Proxima sesion",
    value: "Miercoles 7:00 PM",
    detail: "Revision de pruebas, guiones y cierre del flujo de captura.",
  },
];

export default function DemoWorkspacePage() {
  return (
    <main className="site-shell min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="glass-panel relative overflow-hidden rounded-[2.6rem] p-6 lg:p-7">
          <div className="absolute left-8 top-10 h-28 w-28 rounded-full bg-[color:var(--gold)]/18 blur-3xl" />
          <div className="absolute bottom-0 right-8 h-36 w-36 rounded-full bg-[color:var(--teal)]/14 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="eyebrow">Workspace demo</div>
              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.03em]">
                Asistente comercial con IA
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Proyecto compartido entre cliente y asesor para estructurar un chatbot comercial,
                organizar sesiones y dejar trazabilidad del avance con una interfaz mas elegante.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="premium-button premium-button-secondary px-5 py-3">
                Volver a inicio
              </Link>
              <button type="button" className="premium-button px-5 py-3">
                Reservar sesion
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_0.9fr]">
          {metrics.map((metric) => (
            <article key={metric.label} className="stat-card rounded-[1.9rem] p-5">
              <p className="section-label">{metric.label}</p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{metric.detail}</p>
            </article>
          ))}

          <article className="dark-panel rounded-[1.9rem] p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Saldo</p>
            <p className="mt-4 text-3xl font-semibold">3 sesiones</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              El cliente puede seguir agendando trabajo desde la misma plataforma.
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.36fr_0.64fr]">
          <div className="grid gap-6">
            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Tablero Kanban</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Tareas del proyecto
                  </h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  7 activas · 2 completadas en la ultima semana
                </p>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-4">
                {columns.map((column) => (
                  <div
                    key={column.title}
                    className={`rounded-[1.8rem] border border-[color:var(--line)] p-4 ${column.tone}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                        {column.title}
                      </p>
                      <span className="chip chip-soft">{column.tasks.length}</span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {column.tasks.map((task) => (
                        <article
                          key={task.title}
                          className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/90 p-4"
                        >
                          <h3 className="text-sm font-semibold">{task.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                            {task.detail}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card rounded-[2.3rem] p-6">
              <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label">Actividad y evidencia</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                    Historial del proyecto
                  </h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  Todo queda conectado con tareas y sesiones
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {activities.map((activity) => (
                  <article
                    key={`${activity.title}-${activity.time}`}
                    className="surface-card-muted rounded-[1.7rem] p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold tracking-[-0.02em]">
                          {activity.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                          {activity.detail}
                        </p>
                      </div>
                      <span className="chip chip-soft">{activity.time}</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            <article className="surface-card rounded-[2.3rem] p-6">
              <p className="section-label">Alcance actual</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Entregables pactados
              </h2>
              <div className="mt-5 space-y-3">
                {deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/70 px-4 py-4"
                  >
                    <p className="text-sm font-medium">{deliverable}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card-muted rounded-[2.3rem] p-6">
              <p className="section-label">Sesion siguiente</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Agenda de trabajo
              </h2>
              <div className="mt-5 space-y-4">
                <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/70 p-4">
                  <p className="text-sm font-semibold">Objetivo</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Validar tono del bot, revisar escenarios de venta y dejar tareas para el
                    cliente.
                  </p>
                </div>
                <div className="rounded-[1.45rem] border border-[color:var(--line)] bg-white/70 p-4">
                  <p className="text-sm font-semibold">Canal</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Google Meet integrado con enlace listo para entrar.
                  </p>
                </div>
              </div>
            </article>

            <article className="dark-panel rounded-[2.3rem] p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                Siguiente paso
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
                Pasar esta demo a datos reales
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/70">
                Lo inmediato es conectar autenticacion, proyectos y tablero a datos reales para que
                cada asesor y cliente vea su operacion dentro de la misma experiencia.
              </p>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
