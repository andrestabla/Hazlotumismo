import Link from "next/link";

const pillars = [
  {
    title: "Proyecto compartido",
    description:
      "Cliente y asesor trabajan desde un mismo workspace con contexto, alcance y progreso visibles.",
  },
  {
    title: "Sesiones que mueven trabajo",
    description:
      "Las sesiones compradas no quedan aisladas: se conectan con tareas, agenda y resultados concretos.",
  },
  {
    title: "Evidencia del avance",
    description:
      "Cada entrega puede dejar archivos, enlaces, notas o acuerdos para que el proyecto siempre tenga memoria.",
  },
];

const phases = [
  {
    step: "01",
    title: "Se activa el proyecto",
    description:
      "El cliente entra a un espacio propio con objetivo, alcance, tablero y saldo de sesiones.",
  },
  {
    step: "02",
    title: "Se compra y agenda",
    description:
      "Las sesiones se venden como paquetes y se reservan sobre disponibilidad real del asesor.",
  },
  {
    step: "03",
    title: "Se ejecuta la sesion",
    description:
      "La videollamada ocurre dentro del flujo del producto y deja resumen, acuerdos y siguientes pasos.",
  },
  {
    step: "04",
    title: "Se demuestra progreso",
    description:
      "Tareas, comentarios y evidencia dejan claro que ya se hizo y que falta por cerrar.",
  },
];

const projectTypes = [
  "Chatbots con IA",
  "Agentes operativos",
  "Sitios web con automatizacion",
  "Email marketing",
  "Flujos internos",
  "Analitica y conversion",
];

const modules = [
  "Autenticacion y roles",
  "Workspace por proyecto",
  "Kanban colaborativo",
  "Compra de sesiones",
  "Reserva con Google Meet",
  "Evidencia y notas",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <section className="relative">
        <div className="section-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-6 pb-18 pt-6 lg:px-10">
          <header className="flex items-center justify-between rounded-full border border-[color:var(--line)] bg-white/70 px-4 py-3 backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Hazlo tu mismo
              </p>
              <p className="font-display text-lg">Proyectos no code e IA con trazabilidad</p>
            </div>
            <Link
              href="/workspace"
              className="rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)]"
            >
              Entrar al workspace
            </Link>
          </header>

          <div className="grid gap-12 pb-8 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                Proyecto + sesiones + evidencia en un mismo flujo
              </div>
              <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
                Construye soluciones no code e IA con acompanamiento real y progreso visible.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                Hazlo tu mismo organiza el trabajo entre cliente y asesor para que cada sesion
                termine en tareas, evidencia y decisiones claras dentro del proyecto.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/workspace"
                  className="rounded-full bg-[color:var(--coral)] px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[color:var(--ink)]"
                >
                  Abrir workspace
                </Link>
                <Link
                  href="/workspace/demo"
                  className="rounded-full border border-[color:var(--line)] bg-white/75 px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--ink)] hover:bg-white"
                >
                  Ver demo visual
                </Link>
                <a
                  href="#roadmap"
                  className="rounded-full border border-[color:var(--line)] bg-white/75 px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--ink)] hover:bg-white"
                >
                  Ver roadmap
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="card-shadow rounded-3xl border border-[color:var(--line)] bg-white/90 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Foco
                  </p>
                  <p className="mt-3 text-2xl font-semibold">1 flujo</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Desde compra hasta evidencia del trabajo entregado.
                  </p>
                </div>
                <div className="card-shadow rounded-3xl border border-[color:var(--line)] bg-white/90 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Modelo
                  </p>
                  <p className="mt-3 text-2xl font-semibold">Kanban + sesiones</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    El proyecto avanza en tareas, no en llamadas aisladas.
                  </p>
                </div>
                <div className="card-shadow rounded-3xl border border-[color:var(--line)] bg-white/90 p-5">
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Stack
                  </p>
                  <p className="mt-3 text-2xl font-semibold">Next + Neon</p>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Base rapida para construir, medir y escalar el servicio.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-[color:var(--gold)]/35 blur-3xl" />
              <div className="absolute -right-2 bottom-10 h-36 w-36 rounded-full bg-[color:var(--teal)]/25 blur-3xl" />
              <div className="card-shadow relative rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-5">
                <div className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                      Workspace activo
                    </p>
                    <h2 className="mt-2 font-display text-3xl leading-tight">
                      Asistente comercial con IA
                    </h2>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Cliente: Emilia Rojas
                    </p>
                  </div>
                  <div className="rounded-2xl bg-[color:var(--teal-soft)] px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Progreso
                    </p>
                    <p className="mt-1 text-2xl font-semibold">68%</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Pendiente
                    </p>
                    <div className="mt-4 space-y-3">
                      <article className="rounded-2xl border border-[color:var(--line)] p-3">
                        <p className="text-sm font-medium">Definir prompts base</p>
                        <p className="mt-2 text-xs text-[color:var(--muted)]">Sesion 02</p>
                      </article>
                      <article className="rounded-2xl border border-[color:var(--line)] p-3">
                        <p className="text-sm font-medium">Checklist de onboarding</p>
                        <p className="mt-2 text-xs text-[color:var(--muted)]">Cliente</p>
                      </article>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[color:var(--gold-soft)] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      En progreso
                    </p>
                    <div className="mt-4 space-y-3">
                      <article className="rounded-2xl border border-[color:var(--line)] bg-white p-3">
                        <p className="text-sm font-medium">Entrenar base de conocimiento</p>
                        <p className="mt-2 text-xs text-[color:var(--muted)]">Asesor</p>
                      </article>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-[color:var(--teal-soft)] p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Completado
                    </p>
                    <div className="mt-4 space-y-3">
                      <article className="rounded-2xl border border-[color:var(--line)] bg-white p-3">
                        <p className="text-sm font-medium">Mapa del flujo comercial</p>
                        <p className="mt-2 text-xs text-[color:var(--muted)]">Con evidencia</p>
                      </article>
                      <article className="rounded-2xl border border-[color:var(--line)] bg-white p-3">
                        <p className="text-sm font-medium">Brief del proyecto</p>
                        <p className="mt-2 text-xs text-[color:var(--muted)]">Validado</p>
                      </article>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Siguiente sesion
                    </p>
                    <p className="mt-3 text-xl font-semibold">Miercoles 7:00 PM</p>
                    <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                      Objetivo: cerrar estructura del chatbot, revisar integraciones y dejar
                      tareas de contenido.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-[color:var(--ink)] p-4 text-[color:var(--paper-strong)]">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                      Saldo disponible
                    </p>
                    <p className="mt-3 text-3xl font-semibold">3 sesiones</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Todo el trabajo del proyecto se conecta con compras, agenda y evidencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modulos" className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white/88 p-7"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Pilar
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight">{pillar.title}</h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="flujo" className="mx-auto w-full max-w-7xl px-6 py-18 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Flujo del MVP
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none">
              El producto se debe sentir como trabajo real, no como una agenda bonita.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[color:var(--muted)]">
              Cada fase del recorrido tiene que producir una senal concreta: compra, reserva,
              ejecucion, evidencia y continuidad.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {phases.map((phase) => (
              <article
                key={phase.step}
                className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6"
              >
                <p className="text-sm font-semibold text-[color:var(--coral)]">{phase.step}</p>
                <h3 className="mt-5 text-2xl font-semibold">{phase.title}</h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-10">
        <div className="grid gap-10 rounded-[2.5rem] border border-[color:var(--line)] bg-[color:var(--ink)] px-6 py-8 text-[color:var(--paper-strong)] lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Servicios</p>
            <h2 className="mt-4 font-display text-5xl leading-none">
              Tipos de proyectos que esta plataforma puede mover desde el dia uno.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              El modelo no depende del tipo de entrega. Cambian las tareas y la evidencia, pero
              la estructura del acompanamiento permanece.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {projectTypes.map((projectType) => (
              <div
                key={projectType}
                className="rounded-[1.75rem] border border-white/10 bg-white/6 px-5 py-5"
              >
                <p className="text-lg font-medium">{projectType}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Proyecto con sesiones guiadas, tareas activas y evidencia de avance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="mx-auto w-full max-w-7xl px-6 py-18 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Base tecnica
            </p>
            <h2 className="mt-4 font-display text-5xl leading-none">
              Una primera version pensada para salir rapido y aprender.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
              Recomendacion: Next.js, Neon, Drizzle, Stripe y Google Meet para priorizar velocidad,
              claridad operativa y facilidad de evolucion.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <div
                key={module}
                className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  MVP
                </p>
                <p className="mt-3 text-2xl font-semibold">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
