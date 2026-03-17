import Link from "next/link";
import { InvestmentSimulator } from "@/components/home/investment-simulator";

const pains = [
  {
    title: "La barrera no son las herramientas",
    description:
      "La dificultad suele estar en decidir qué conectar primero, cómo priorizar y dónde aterrizar cada decisión sin perder semanas.",
  },
  {
    title: "WhatsApp no es una metodología",
    description:
      "Cuando todo vive entre mensajes, videollamadas y notas sueltas, el proyecto parece avanzar, pero no se convierte en un producto.",
  },
  {
    title: "La dependencia técnica frena la velocidad",
    description:
      "Esperar a TI o tercerizar por completo reduce el control del negocio sobre su propia operación digital.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Define tu meta",
    description:
      "Eliges qué quieres construir: un agente de IA, una automatización, una web comercial o un sistema interno.",
  },
  {
    step: "02",
    title: "Adquiere tus horas",
    description:
      "Compras un paquete de sesiones para trabajar con capacidad clara y alcance visible.",
  },
  {
    step: "03",
    title: "Co-creación en vivo",
    description:
      "Trabajas con tu asesor por Meet o Zoom mientras el producto avanza en tiempo real.",
  },
  {
    step: "04",
    title: "Trazabilidad total",
    description:
      "Apruebas entregables, sigues tareas y dejas evidencia dentro del mismo tablero.",
  },
];

const useCases = [
  {
    title: "Asistente virtual para ventas",
    description:
      "Un chatbot entrenado para calificar leads, responder objeciones y activar la siguiente acción comercial.",
    tools: ["OpenAI", "Make", "WhatsApp"],
    state: "Listo para conversaciones reales",
    previewLabel: "Pipeline comercial",
    previewMetric: "24 conversaciones activas",
    previewTone: "bg-[color:rgba(45,57,52,0.07)]",
    previewAccent: "bg-[color:var(--teal)]",
  },
  {
    title: "Sitio web con IA integrada",
    description:
      "Una página de conversión conectada con formularios, contenido dinámico y automatizaciones de seguimiento.",
    tools: ["Webflow", "Framer", "OpenAI"],
    state: "Diseño y operación en un mismo flujo",
    previewLabel: "Experiencia comercial",
    previewMetric: "3 flujos conectados",
    previewTone: "bg-[color:rgba(212,201,184,0.26)]",
    previewAccent: "bg-[color:var(--warning)]",
  },
  {
    title: "Automatización de captación de leads",
    description:
      "Captura, enriquece y distribuye prospectos sin depender de procesos manuales entre marketing y ventas.",
    tools: ["HubSpot", "Make", "Airtable"],
    state: "Embudo visible y accionable",
    previewLabel: "Sistema de captación",
    previewMetric: "12 automatizaciones",
    previewTone: "bg-[color:rgba(8,8,8,0.04)]",
    previewAccent: "bg-[color:var(--ink)]",
  },
  {
    title: "Sistema de gestión interna",
    description:
      "Tableros, formularios, roles y automatizaciones para que el equipo opere con menos fricción y más control.",
    tools: ["Notion", "Glide", "Zapier"],
    state: "Orden operativo para el equipo",
    previewLabel: "Operación interna",
    previewMetric: "Equipo y procesos",
    previewTone: "bg-[color:rgba(95,121,108,0.11)]",
    previewAccent: "bg-[color:var(--success)]",
  },
];

const operatingStories = [
  {
    quote:
      "En dos sesiones dejamos de discutir herramientas y salimos con el flujo comercial funcionando.",
    context: "Caso tipo / Servicios B2B",
  },
  {
    quote:
      "Lo valioso fue poder revisar el proyecto con contexto, tareas y entregables sin perseguir a nadie por chat.",
    context: "Caso tipo / Operación interna",
  },
  {
    quote:
      "La plataforma nos dio una forma de construir con supervisión ejecutiva sin depender por completo de un tercero.",
    context: "Caso tipo / Fundadores no técnicos",
  },
];

const heroHighlights = [
  {
    title: "Meta definida",
    detail: "Partimos de un objetivo concreto y priorizado.",
  },
  {
    title: "Trabajo compartido",
    detail: "La sesión mueve el producto contigo, no por fuera.",
  },
  {
    title: "Avance visible",
    detail: "Tareas, acuerdos y entregables quedan en el mismo lugar.",
  },
] as const;

const deliveryFlow = [
  {
    stage: "Descubrimiento",
    task: "Recorrido del lead definido",
    note: "Se aterriza el objetivo y se ordena el criterio de implementación.",
    dot: "bg-[color:var(--ink)]",
    badgeClass: "bg-[color:rgba(17,19,21,0.06)] text-[color:var(--ink-soft)]",
    badgeLabel: "Base",
  },
  {
    stage: "En progreso",
    task: "CRM y automatización conectados",
    note: "La sesión mueve piezas reales y deja acuerdos listos para continuar.",
    dot: "bg-[color:var(--warning)]",
    badgeClass: "bg-[color:rgba(211,138,18,0.12)] text-[color:var(--warning)]",
    badgeLabel: "Activo",
  },
  {
    stage: "Entregado",
    task: "Bot inicial publicado",
    note: "El resultado queda visible dentro del mismo contexto operativo.",
    dot: "bg-[color:var(--success)]",
    badgeClass: "bg-[color:rgba(24,161,111,0.12)] text-[color:var(--success)]",
    badgeLabel: "Listo",
  },
] as const;

const sharedPlanFeatures = [
  "Sesiones en vivo de 60 minutos",
  "Acompañamiento guiado",
  "Tablero y entregables visibles",
  "Misma metodología y mismos servicios",
] as const;

const plans = [
  {
    name: "Pack Arranque",
    sessions: "5 sesiones",
    price: "USD 250",
    sessionRate: "USD 50 por sesión",
    description: "Para ordenar el proyecto y completar el primer tramo de ejecución.",
  },
  {
    name: "Pack Desarrollo",
    sessions: "10 sesiones",
    price: "USD 450",
    sessionRate: "USD 45 por sesión",
    description: "Más continuidad con mejor tarifa para avanzar sin cortar el ritmo.",
    featured: true,
  },
  {
    name: "Pack Escala",
    sessions: "15 sesiones",
    price: "USD 600",
    sessionRate: "USD 40 por sesión",
    description: "La opción más eficiente para proyectos con más profundidad y recorrido.",
  },
];

const faqs = [
  {
    question: "¿Necesito saber de no-code o IA antes de empezar?",
    answer:
      "No. La plataforma está pensada para trabajar contigo, no para evaluarte. El objetivo es construir bajo una metodología guiada.",
  },
  {
    question: "¿Qué pasa entre una sesión y la siguiente?",
    answer:
      "El trabajo no desaparece. El proyecto queda en el tablero con tareas, acuerdos, avances y evidencia para retomar exactamente donde quedó.",
  },
  {
    question: "¿Solo sirve para chatbots?",
    answer:
      "No. También aplica para sitios web, automatizaciones comerciales, flujos internos y productos digitales que requieren una capa operativa clara.",
  },
  {
    question: "¿Cómo se define cuántas sesiones necesito?",
    answer:
      "Puedes usar el simulador de inversión como referencia inicial y luego afinar el alcance en la primera conversación.",
  },
];

export default function Home() {
  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen overflow-x-hidden px-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 sm:gap-24">
        <header className="app-sticky-top sticky z-40">
          <div className="surface-card flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--ink)] text-sm font-semibold text-white">
                HT
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Hazlo tú mismo
                </p>
                <p className="hidden text-sm font-medium text-[color:var(--ink-soft)] md:block">
                  Co-creación operativa para no-code e IA
                </p>
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
              <nav className="hidden items-center gap-6 text-sm text-[color:var(--muted)] xl:flex">
                <a href="#metodologia">Metodología</a>
                <a href="#casos">Casos de uso</a>
                <a href="#planes">Planes</a>
              </nav>
              <Link
                href="/login"
                className="premium-button premium-button-accent w-full px-5 py-3 sm:w-auto"
              >
                <span className="sm:hidden">Agendar</span>
                <span className="hidden sm:inline xl:hidden">Agendar sesión</span>
                <span className="hidden xl:inline">Agendar primera sesión</span>
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div className="max-w-3xl lg:pr-4">
            <div className="eyebrow">Metodología, orden y ejecución</div>
            <h1 className="mt-8 max-w-4xl font-display text-[3.45rem] leading-[0.9] tracking-[-0.05em] text-[color:var(--ink)] sm:text-[4.9rem] lg:text-[5.8rem]">
              Construye tus soluciones digitales y de IA. Acompañado, paso a paso.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg sm:leading-9">
              Construye chatbots, automatizaciones y sitios web con una metodología guiada,
              sesiones en vivo y trazabilidad real.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workspace/demo"
                className="premium-button premium-button-accent w-full px-6 py-3 sm:w-auto"
              >
                Explorar proyectos
              </Link>
              <Link
                href="/login"
                className="premium-button premium-button-secondary w-full px-6 py-3 sm:w-auto"
              >
                Agendar primera sesión
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <article key={item.title} className="border-t border-[color:var(--line)] pt-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[color:var(--ink-soft)]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="editorial-frame p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] pb-4">
                  <div>
                    <p className="section-label">Sala de trabajo</p>
                    <h2 className="mt-3 text-[1.9rem] font-display leading-none tracking-[-0.04em]">
                      Sesión activa
                    </h2>
                  </div>
                  <div className="rounded-md bg-[color:var(--gold-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-soft)]">
                    En vivo
                  </div>
                </div>

                <div className="mt-6 rounded-[0.9rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.3)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
                      AR
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Andrea R.</p>
                      <p className="text-sm text-[color:var(--muted)]">Asesora no-code e IA</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                    Objetivo actual: conectar formulario, CRM y agente de ventas para mover leads
                    reales.
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[0.9rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.3)]">
                    <p className="section-label">Duración</p>
                    <p className="mt-3 text-xl font-semibold">60 min</p>
                  </div>
                  <div className="rounded-[0.9rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.3)]">
                    <p className="section-label">Canal</p>
                    <p className="mt-3 text-xl font-semibold">Meet integrado</p>
                  </div>
                </div>
              </div>

              <div className="editorial-frame p-5 sm:p-6">
                <div className="flex items-end justify-between gap-4 border-b border-[color:var(--line)] pb-4">
                  <div>
                    <p className="section-label">Tablero del proyecto</p>
                    <h3 className="mt-3 text-[1.9rem] font-display leading-none tracking-[-0.04em]">
                      Progreso visible
                    </h3>
                  </div>
                  <p className="text-sm text-[color:var(--muted)]">De idea a entrega</p>
                </div>

                <div className="mt-5 space-y-3">
                  {deliveryFlow.map((step) => (
                    <article
                      key={step.stage}
                      className="rounded-[0.95rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.3)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${step.dot}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                              {step.stage}
                            </p>
                            <span
                              className={`inline-flex w-fit rounded-md px-3 py-1 text-[11px] font-semibold ${step.badgeClass}`}
                            >
                              {step.badgeLabel}
                            </span>
                          </div>
                          <p className="mt-3 text-sm font-semibold text-[color:var(--ink-soft)]">
                            {step.task}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                            {step.note}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-4 rounded-[0.95rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.3)]">
                  <p className="section-label">Siguiente hito</p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[color:var(--ink-soft)]">
                    Validar el formulario y lanzar la primera prueba del flujo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="section-label">Por qué estar aquí</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
              La barrera no es la tecnología. Es saber cómo estructurarla.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
              Hazlo tú mismo transforma incertidumbre técnica en confianza operativa. No es un
              curso ni una agencia opaca: es un entorno de construcción guiada.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {pains.map((pain) => (
              <article key={pain.title} className="border-t border-[color:var(--line)] pt-6">
                <h3 className="text-2xl font-display leading-[0.95] tracking-[-0.04em]">
                  {pain.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {pain.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="metodologia" className="grid gap-8">
          <div className="max-w-3xl">
            <p className="section-label">Cómo funciona</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
              Una metodología simple para convertir ideas en productos tangibles.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {workflow.map((item) => (
              <article key={item.step} className="border-t border-[color:var(--line)] pt-6">
                <p className="text-sm font-semibold text-[color:var(--muted)]">{item.step}</p>
                <h3 className="mt-5 text-[1.9rem] font-display leading-[0.95] tracking-[-0.04em]">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="casos" className="grid gap-8">
          <div className="max-w-3xl">
            <p className="section-label">Catálogo de posibilidades</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
              Casos de uso que un negocio puede construir con supervisión y trazabilidad.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="surface-card overflow-hidden p-0"
              >
                <div className={`p-5 sm:p-6 ${useCase.previewTone}`}>
                  <div className="editorial-frame p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${useCase.previewAccent}`} />
                        <p className="section-label">{useCase.previewLabel}</p>
                      </div>
                      <span className="rounded-md bg-[color:var(--paper-strong)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-soft)]">
                        {useCase.previewMetric}
                      </span>
                    </div>

                    <div className="mt-8 space-y-3">
                      {useCase.tools.map((tool, index) => (
                        <div
                          key={tool}
                          className={`flex items-center justify-between rounded-[0.85rem] bg-[color:var(--paper-strong)] px-4 py-3 ${
                            index === 0 ? "shadow-[0_18px_30px_-26px_rgba(0,0,0,0.28)]" : ""
                          }`}
                        >
                          <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
                            {tool}
                          </p>
                          <span className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                            Activo
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="editorial-hairline mt-6" />
                    <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                      {useCase.state}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-6 pt-5 sm:px-6 sm:pb-8">
                  <p className="section-label">Caso de uso</p>
                  <h3 className="font-editorial mt-4 text-[2.4rem] leading-none text-[color:var(--ink-soft)] sm:text-[2.9rem]">
                    {useCase.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
                    {useCase.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <InvestmentSimulator />

        <section className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div className="surface-card p-8 lg:p-10">
            <p className="section-label">Control visible</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
              El valor no está en prometer magia, sino en mostrar control del proceso.
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {[
                {
                  value: "Proyecto compartido",
                  label: "Cliente y asesor construyen sobre el mismo contexto.",
                },
                {
                  value: "Sesiones accionables",
                  label: "Cada llamada deja trabajo concreto y siguiente paso.",
                },
                {
                  value: "Trazabilidad total",
                  label: "El avance siempre queda visible y supervisable.",
                },
              ].map((item) => (
                <article key={item.value} className="border-t border-[color:var(--line)] pt-4">
                  <p className="text-xl font-semibold tracking-[-0.03em]">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{item.label}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {operatingStories.map((story) => (
              <article key={story.quote} className="surface-card-muted p-8">
                <p className="font-editorial text-[2rem] leading-[1.02] text-[color:var(--ink-soft)]">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {story.context}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="planes" className="grid gap-8">
          <div className="max-w-3xl">
            <p className="section-label">Planes transparentes</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
              Compra capacidad de ejecución, no horas sueltas sin estructura.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
              Todos los packs incluyen el mismo servicio y sesiones de 60 minutos. Lo que cambia es
              la capacidad contratada y el valor por sesión: a mayor cantidad, mejor tarifa.
            </p>
          </div>

          <div className="surface-card-muted p-6 lg:p-8">
            <p className="section-label">Todos incluyen</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {sharedPlanFeatures.map((feature) => (
                <div key={feature} className="editorial-frame px-4 py-4">
                  <p className="text-sm leading-6 text-[color:var(--muted)]">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`surface-card p-8 ${plan.featured ? "bg-[color:var(--gold-soft)]" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">{plan.sessions}</p>
                    <h3 className="mt-4 text-3xl font-display leading-[0.95] tracking-[-0.045em]">
                      {plan.name}
                    </h3>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-md bg-[color:var(--ink)] px-3 py-1 text-xs font-semibold text-white">
                      Recomendado
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{plan.description}</p>
                <p className="mt-6 text-4xl font-semibold tracking-[-0.03em]">{plan.price}</p>
                <p className="mt-3 text-sm font-medium text-[color:var(--ink-soft)]">
                  {plan.sessionRate}
                </p>

                <Link
                  href="/login"
                  className={`mt-8 inline-flex w-full justify-center ${plan.featured ? "premium-button premium-button-accent" : "premium-button premium-button-secondary"} px-5 py-3`}
                >
                  Solicitar este plan
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="section-label">Preguntas frecuentes</p>
            <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
              Respuestas claras para bajar fricción antes de empezar.
            </h2>
          </div>

          <div className="surface-card divide-y divide-[color:var(--line)] p-2">
            {faqs.map((item) => (
              <details key={item.question} className="group px-6 py-5">
                <summary className="cursor-pointer list-none pr-8 font-display text-[1.9rem] leading-[0.98] tracking-[-0.04em]">
                  {item.question}
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="surface-card p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="section-label">Cierre</p>
              <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em] sm:text-5xl">
                Si la idea ya existe, el siguiente paso es ponerla a operar.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
                Empieza con una primera sesión, define la meta y entra a un entorno donde el
                proyecto se construye contigo.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="premium-button premium-button-accent w-full px-6 py-3 sm:w-auto">
                Agendar primera sesión
              </Link>
              <Link href="/workspace/demo" className="premium-button premium-button-secondary w-full px-6 py-3 sm:w-auto">
                Explorar demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
