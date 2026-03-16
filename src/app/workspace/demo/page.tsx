import Link from "next/link";

const columns = [
  {
    title: "Pendiente",
    tone: "bg-white",
    tasks: [
      {
        title: "Definir tono del bot",
        detail: "Alinear respuestas con propuesta comercial",
      },
      {
        title: "Subir FAQs del negocio",
        detail: "Pendiente por parte del cliente",
      },
    ],
  },
  {
    title: "En progreso",
    tone: "bg-[color:var(--gold-soft)]",
    tasks: [
      {
        title: "Configurar base de conocimiento",
        detail: "Se integran documentos y sitio actual",
      },
      {
        title: "Diseñar flujo de leads",
        detail: "Formulario, email y CRM ligero",
      },
    ],
  },
  {
    title: "En revision",
    tone: "bg-[color:var(--coral-soft)]",
    tasks: [
      {
        title: "Pruebas con respuestas reales",
        detail: "Sesion 03 definira ajustes finales",
      },
    ],
  },
  {
    title: "Completado",
    tone: "bg-[color:var(--teal-soft)]",
    tasks: [
      {
        title: "Brief del proyecto",
        detail: "Objetivo y alcance ya validados",
      },
      {
        title: "Mapa de preguntas frecuentes",
        detail: "Documento inicial entregado",
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
    title: "Nueva evidencia en tarea",
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

export default function DemoWorkspacePage() {
  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-[2rem] border border-[color:var(--line)] bg-white/75 px-5 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Workspace demo
            </p>
            <h1 className="mt-2 font-display text-4xl leading-none">
              Asistente comercial con IA
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--muted)]">
              Proyecto compartido entre cliente y asesor para estructurar un chatbot comercial,
              organizar sesiones y dejar trazabilidad del avance.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-full border border-[color:var(--line)] bg-white px-5 py-3 text-sm font-medium text-[color:var(--ink)] transition hover:border-[color:var(--ink)]"
            >
              Volver a inicio
            </Link>
            <button
              type="button"
              className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--paper-strong)]"
            >
              Reservar sesion
            </button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-4">
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Estado</p>
            <p className="mt-3 text-2xl font-semibold">En ejecucion</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              El proyecto ya avanza entre sesiones, contenido y pruebas reales.
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Progreso</p>
            <p className="mt-3 text-2xl font-semibold">68%</p>
            <div className="mt-4 h-2 rounded-full bg-[color:var(--paper)]">
              <div className="h-2 w-[68%] rounded-full bg-[color:var(--coral)]" />
            </div>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
              Proxima sesion
            </p>
            <p className="mt-3 text-2xl font-semibold">Miercoles 7:00 PM</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Revisión de pruebas, guiones y cierre del flujo de captura.
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-[color:var(--ink)] p-5 text-[color:var(--paper-strong)]">
            <p className="text-xs uppercase tracking-[0.28em] text-white/65">Saldo</p>
            <p className="mt-3 text-2xl font-semibold">3 sesiones</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              El cliente aun puede seguir agendando trabajo desde la misma plataforma.
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-5">
              <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Tablero Kanban
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">Tareas del proyecto</h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  7 activas · 2 completadas en la ultima semana
                </p>
              </div>
              <div className="mt-5 grid gap-4 xl:grid-cols-4">
                {columns.map((column) => (
                  <div
                    key={column.title}
                    className={`rounded-[1.75rem] border border-[color:var(--line)] p-4 ${column.tone}`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                        {column.title}
                      </p>
                      <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium">
                        {column.tasks.length}
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {column.tasks.map((task) => (
                        <article
                          key={task.title}
                          className="rounded-[1.35rem] border border-[color:var(--line)] bg-white p-3"
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

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-5">
              <div className="flex flex-col gap-2 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Evidencia y actividad
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">Historial del proyecto</h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  Todo queda conectado con tareas y sesiones
                </p>
              </div>
              <div className="mt-5 space-y-4">
                {activities.map((activity) => (
                  <article
                    key={`${activity.title}-${activity.time}`}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{activity.title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                          {activity.detail}
                        </p>
                      </div>
                      <span className="text-sm text-[color:var(--muted)]">{activity.time}</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>

          <aside className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Alcance actual
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Entregables pactados</h2>
              <div className="mt-4 space-y-3">
                {deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-[1.3rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3"
                  >
                    <p className="text-sm font-medium">{deliverable}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--teal-soft)] p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Sesion siguiente
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Agenda de trabajo</h2>
              <div className="mt-4 rounded-[1.4rem] bg-white/80 p-4">
                <p className="text-sm font-semibold">Objetivo</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Validar tono del bot, revisar escenarios de venta y dejar tareas para el cliente.
                </p>
              </div>
              <div className="mt-4 rounded-[1.4rem] bg-white/80 p-4">
                <p className="text-sm font-semibold">Canal</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                  Google Meet integrado con enlace listo para entrar.
                </p>
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--ink)] p-5 text-[color:var(--paper-strong)]">
              <p className="text-xs uppercase tracking-[0.28em] text-white/65">Siguiente paso</p>
              <h2 className="mt-3 text-2xl font-semibold">Pasar esta demo a datos reales</h2>
              <p className="mt-4 text-sm leading-6 text-white/70">
                Lo inmediato es conectar autenticacion, proyectos y tablero a Supabase para que
                cada asesor y cliente vea su informacion real.
              </p>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
