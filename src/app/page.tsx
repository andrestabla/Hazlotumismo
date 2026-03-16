import Link from "next/link";

const pillars = [
  {
    title: "Operacion compartida",
    description:
      "Cliente y asesor trabajan dentro del mismo contexto, con decisiones, alcance y prioridades visibles en todo momento.",
  },
  {
    title: "Sesiones con continuidad",
    description:
      "Cada sesion aterriza en trabajo concreto: tareas activas, agenda clara y evidencia que mantiene el proyecto en movimiento.",
  },
  {
    title: "Memoria del proyecto",
    description:
      "Notas, entregables y acuerdos quedan conectados al flujo para que el avance no dependa de conversaciones dispersas.",
  },
];

const phases = [
  {
    step: "01",
    title: "Onboarding claro",
    description:
      "Se define objetivo, alcance y responsables desde el primer ingreso al workspace.",
  },
  {
    step: "02",
    title: "Compra y agenda",
    description:
      "Las sesiones se venden como capacidad real de trabajo y se reservan sobre disponibilidad visible.",
  },
  {
    step: "03",
    title: "Ejecucion guiada",
    description:
      "Cada videollamada ocurre dentro del flujo del producto y deja acuerdos accionables.",
  },
  {
    step: "04",
    title: "Seguimiento continuo",
    description:
      "Tablero, evidencia y proximos pasos convierten el acompanamiento en progreso observable.",
  },
];

const projectTypes = [
  "Chatbots con IA",
  "Agentes operativos",
  "Embudos y automatizaciones",
  "Sitios de conversion",
  "Email marketing",
  "Flujos internos",
];

const modules = [
  "Autenticacion y permisos",
  "Workspace por cliente",
  "Kanban colaborativo",
  "Compra de sesiones",
  "Agenda y Meet",
  "Notas y evidencia",
];

const stats = [
  {
    value: "1 solo flujo",
    label: "Compra, agenda, ejecucion y seguimiento sin cambiar de contexto.",
  },
  {
    value: "68% visible",
    label: "El progreso deja de ser una percepcion y se vuelve una senal concreta.",
  },
  {
    value: "Cliente + asesor",
    label: "El producto alinea a las dos partes sobre la misma fuente de verdad.",
  },
];

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-x-hidden">
      <section className="relative px-6 pb-18 pt-6 lg:px-10">
        <div className="section-grid absolute inset-0 opacity-35" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
          <header className="glass-panel reveal-up flex flex-col gap-4 rounded-full px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--ink)] text-sm font-semibold text-[color:var(--paper-strong)]">
                HT
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Hazlo tu mismo
                </p>
                <p className="text-sm font-medium text-[color:var(--ink-soft)]">
                  Workspace premium para proyectos no code e IA
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#flujo"
                className="premium-button premium-button-ghost px-5 py-3 text-center"
              >
                Ver flujo
              </a>
              <Link href="/login" className="premium-button premium-button-secondary px-5 py-3">
                Iniciar sesion
              </Link>
              <Link href="/dashboard" className="premium-button px-5 py-3">
                Entrar a la plataforma
              </Link>
            </div>
          </header>

          <div className="grid gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
            <div className="max-w-3xl">
              <div className="eyebrow reveal-up">Operacion premium con foco en progreso real</div>
              <h1 className="reveal-up delay-1 mt-7 max-w-5xl font-display text-5xl leading-[0.92] tracking-[-0.03em] text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
                Una experiencia mas sobria, moderna y profesional para mover proyectos con IA.
              </h1>
              <p className="reveal-up delay-2 mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                Hazlo tu mismo conecta sesiones, tareas y evidencia en una interfaz pensada para
                verse seria, clara y elegante mientras el proyecto avanza.
              </p>

              <div className="reveal-up delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/workspace/demo" className="premium-button px-6 py-3">
                  Ver experiencia demo
                </Link>
                <a href="#roadmap" className="premium-button premium-button-secondary px-6 py-3">
                  Ver base tecnica
                </a>
              </div>

              <div className="reveal-up delay-4 mt-10 grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                  <article key={stat.value} className="stat-card rounded-[1.9rem] p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Insight
                    </p>
                    <p className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{stat.value}</p>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{stat.label}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="reveal-up delay-2 relative">
              <div className="glass-panel relative overflow-hidden rounded-[2.5rem] p-5 sm:p-6">
                <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/70 to-transparent" />
                <div className="relative flex items-center justify-between border-b border-[color:var(--line)] pb-5">
                  <div>
                    <p className="section-label">Control room</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">
                      Asistente comercial con IA
                    </h2>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Proyecto compartido con cliente, agenda y evidencia.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/35 bg-white/70 px-4 py-3 text-right backdrop-blur">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                      Progreso
                    </p>
                    <p className="mt-1 text-3xl font-semibold">68%</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-[1.02fr_0.98fr]">
                  <div className="dark-panel rounded-[2rem] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                          Agenda proxima
                        </p>
                        <p className="mt-2 text-xl font-semibold">Miercoles 7:00 PM</p>
                      </div>
                      <span className="chip chip-gold">Google Meet</span>
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
                      <p className="text-sm font-semibold">Objetivo de la sesion</p>
                      <p className="mt-2 text-sm leading-6 text-white/72">
                        Cerrar el flujo de leads, revisar respuestas del bot y dejar tareas de
                        contenido para el cliente.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                          Saldo
                        </p>
                        <p className="mt-2 text-2xl font-semibold">3 sesiones</p>
                      </div>
                      <div className="rounded-[1.4rem] border border-white/10 bg-white/6 p-4">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                          Evidencia
                        </p>
                        <p className="mt-2 text-2xl font-semibold">12 items</p>
                      </div>
                    </div>
                  </div>

                  <div className="surface-card rounded-[2rem] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="section-label">Tablero vivo</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                          Trabajo del proyecto
                        </h3>
                      </div>
                      <span className="chip chip-soft">7 activas</span>
                    </div>

                    <div className="mt-5 grid gap-3">
                      {[
                        {
                          label: "Pendiente",
                          title: "Definir prompts base",
                          tone: "bg-white",
                        },
                        {
                          label: "En progreso",
                          title: "Entrenar base de conocimiento",
                          tone: "bg-[color:var(--gold-soft)]",
                        },
                        {
                          label: "Completado",
                          title: "Mapa del flujo comercial",
                          tone: "bg-[color:var(--teal-soft)]",
                        },
                      ].map((item) => (
                        <article
                          key={item.title}
                          className={`rounded-[1.45rem] border border-[color:var(--line)] p-4 ${item.tone}`}
                        >
                          <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold">{item.title}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modulos" className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="max-w-xl">
            <p className="section-label">Pilares del producto</p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.03em]">
              Un sistema simple hacia afuera, sofisticado por dentro.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
              La experiencia premium no viene de llenar la interfaz de cosas. Viene de mostrar
              exactamente lo que importa con orden, ritmo y confianza.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`surface-card reveal-up rounded-[2rem] p-7 ${index === 1 ? "md:-mt-8" : ""}`}
              >
                <span className="chip chip-soft">Pilar {index + 1}</span>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">{pillar.title}</h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="flujo" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="max-w-xl">
            <p className="section-label">Flujo del producto</p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.03em]">
              Se tiene que sentir como operacion real, no como una agenda decorada.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
              Cada fase produce una senal concreta: onboarding, agenda, ejecucion, evidencia y
              continuidad. Nada se queda en el aire.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {phases.map((phase) => (
              <article key={phase.step} className="surface-card-muted rounded-[2rem] p-6">
                <span className="chip chip-warm">{phase.step}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{phase.title}</h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {phase.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 lg:px-10">
        <div className="dark-panel grid gap-10 rounded-[2.8rem] px-6 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-9">
          <div>
            <p className="section-label text-white/55">Casos de uso</p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.03em] text-white">
              Una plataforma elegante para acompanar proyectos que realmente cambian un negocio.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/70">
              El modelo funciona para distintas entregas porque el valor no esta en la plantilla,
              sino en la claridad con que se conecta el trabajo con el resultado.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {projectTypes.map((projectType) => (
                <div
                  key={projectType}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 px-5 py-4"
                >
                  <p className="text-lg font-medium text-white">{projectType}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 self-start md:grid-cols-2">
            {modules.map((module, index) => (
              <article
                key={module}
                className={`rounded-[1.7rem] border border-white/10 bg-white/6 p-5 ${index === 0 || index === 3 ? "md:translate-y-4" : ""}`}
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/50">MVP</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  {module}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  Construido para mantener orden, trazabilidad y una sensacion de producto solido.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="surface-card rounded-[2.4rem] p-7">
            <p className="section-label">Base tecnica</p>
            <h2 className="mt-4 font-display text-5xl leading-none tracking-[-0.03em]">
              Rapida para lanzar, robusta para crecer.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
              Next.js, Neon y Drizzle permiten iterar con velocidad, mientras Stripe y Google Meet
              dejan lista la operacion para vender y ejecutar trabajo real.
            </p>
          </div>

          <div className="glass-panel rounded-[2.4rem] p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Siguiente paso</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">
                  Llevar esta experiencia a produccion con datos reales.
                </h2>
              </div>
              <Link href="/workspace/demo" className="premium-button px-5 py-3">
                Probar demo
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Autenticacion conectada a clientes reales",
                "Workspaces con compras y sesiones persistidas",
                "Tablero y evidencia con datos operativos",
              ].map((item) => (
                <article key={item} className="surface-card rounded-[1.6rem] p-5">
                  <p className="text-sm font-semibold">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
