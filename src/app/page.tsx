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
    previewType: "assistant",
    previewLabel: "Asistente comercial",
    previewMetric: "24 conversaciones activas",
    previewTone: "bg-[color:rgba(45,57,52,0.07)]",
    previewAccent: "bg-[color:var(--teal)]",
  },
  {
    title: "Sitio web con IA integrada",
    description:
      "Una página de conversión conectada con formularios, contenido dinámico y automatizaciones de seguimiento.",
    previewType: "website",
    previewLabel: "Experiencia comercial",
    previewMetric: "3 flujos conectados",
    previewTone: "bg-[color:rgba(212,201,184,0.26)]",
    previewAccent: "bg-[color:var(--warning)]",
  },
  {
    title: "Automatización de captación de leads",
    description:
      "Captura, enriquece y distribuye prospectos sin depender de procesos manuales entre marketing y ventas.",
    previewType: "pipeline",
    previewLabel: "Sistema de captación",
    previewMetric: "12 automatizaciones",
    previewTone: "bg-[color:rgba(8,8,8,0.04)]",
    previewAccent: "bg-[color:var(--ink)]",
  },
  {
    title: "Sistema de gestión interna",
    description:
      "Tableros, formularios, roles y automatizaciones para que el equipo opere con menos fricción y más control.",
    previewType: "operations",
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

function renderUseCasePreview(useCase: (typeof useCases)[number]) {
  if (useCase.previewType === "assistant") {
    return (
      <div className="rounded-[1rem] border border-[color:rgba(8,8,8,0.04)] bg-[color:var(--paper-strong)] shadow-[0_18px_30px_-26px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--ink)]/20" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--warning)]/35" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--success)]/45" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            WhatsApp + CRM
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[0.9rem] bg-[color:rgba(45,57,52,0.05)] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--teal)]/10 text-sm font-semibold text-[color:var(--teal)]">
                IA
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
                  Agente comercial
                </p>
                <p className="text-xs text-[color:var(--muted)]">Lead calificado en tiempo real</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="ml-auto max-w-[85%] rounded-[0.85rem] bg-[color:var(--paper-strong)] px-3 py-2 text-sm leading-6 text-[color:var(--ink-soft)]">
                Quiero saber si integran con mi CRM actual.
              </div>
              <div className="max-w-[88%] rounded-[0.85rem] bg-[color:var(--teal)] px-3 py-2 text-sm leading-6 text-white">
                Sí. Ya tomé tu caso y te propongo una demo con agenda automática.
              </div>
              <div className="max-w-[72%] rounded-[0.85rem] bg-[color:var(--paper-strong)] px-3 py-2 text-sm leading-6 text-[color:var(--ink-soft)]">
                Demo enviada y lead actualizado en CRM.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[0.9rem] bg-[color:var(--paper-muted)] px-4 py-3">
              <p className="section-label">Acción siguiente</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--ink-soft)]">
                Agenda compartida
              </p>
            </div>
            <div className="rounded-[0.9rem] bg-[color:var(--paper-muted)] px-4 py-3">
              <p className="section-label">CRM</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--ink-soft)]">
                Contacto enriquecido
              </p>
            </div>
            <div className="rounded-[0.9rem] bg-[color:var(--paper-muted)] px-4 py-3">
              <p className="section-label">Estado</p>
              <p className="mt-2 text-sm font-semibold text-[color:var(--ink-soft)]">
                Secuencia activa
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (useCase.previewType === "website") {
    return (
      <div className="rounded-[1rem] border border-[color:rgba(8,8,8,0.04)] bg-[color:var(--paper-strong)] shadow-[0_18px_30px_-26px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--ink)]/20" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--warning)]/35" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--success)]/45" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Landing + IA
          </p>
        </div>

        <div className="p-4">
          <div className="rounded-[1rem] bg-[color:rgba(212,201,184,0.2)] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Home comercial
              </p>
              <span className="rounded-md bg-[color:var(--paper-strong)] px-3 py-1 text-[11px] font-semibold text-[color:var(--ink-soft)]">
                IA activa
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1.12fr_0.88fr]">
              <div>
                <p className="font-editorial text-[2rem] leading-[0.92] text-[color:var(--ink-soft)]">
                  Convierte visitas en conversaciones calificadas.
                </p>
                <div className="mt-4 h-2 w-28 rounded-full bg-[color:var(--ink)]/12" />
                <div className="mt-2 h-2 w-40 rounded-full bg-[color:var(--ink)]/10" />
                <div className="mt-5 flex gap-2">
                  <span className="rounded-md bg-[color:var(--ink)] px-4 py-2 text-xs font-semibold text-white">
                    Agendar demo
                  </span>
                  <span className="rounded-md border border-[color:var(--line)] px-4 py-2 text-xs font-semibold text-[color:var(--ink-soft)]">
                    Ver casos
                  </span>
                </div>
              </div>

              <div className="rounded-[0.95rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.2)]">
                <p className="section-label">Formulario inteligente</p>
                <div className="mt-4 space-y-2">
                  <div className="h-10 rounded-[0.75rem] border border-[color:var(--line)] bg-[color:var(--paper)]" />
                  <div className="h-10 rounded-[0.75rem] border border-[color:var(--line)] bg-[color:var(--paper)]" />
                  <div className="h-10 rounded-[0.75rem] bg-[color:var(--ink)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (useCase.previewType === "pipeline") {
    return (
      <div className="rounded-[1rem] border border-[color:rgba(8,8,8,0.04)] bg-[color:var(--paper-strong)] shadow-[0_18px_30px_-26px_rgba(0,0,0,0.28)]">
        <div className="flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--ink)]/20" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--warning)]/35" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--success)]/45" />
          </div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
            Embudo automatizado
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3">
          {[
            {
              label: "Nuevo",
              items: ["Meta Ads / Lead 84", "Web / Lead 63"],
            },
            {
              label: "Calificado",
              items: ["Score 92 / Demo", "Score 81 / Seguimiento"],
            },
            {
              label: "Asignado",
              items: ["Venta consultiva", "Ruta automática"],
            },
          ].map((column) => (
            <div key={column.label} className="rounded-[0.9rem] bg-[color:var(--paper-muted)] p-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {column.label}
              </p>
              <div className="mt-3 space-y-2">
                {column.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-[0.8rem] bg-[color:var(--paper-strong)] px-3 py-3 text-sm font-semibold text-[color:var(--ink-soft)] shadow-[0_18px_24px_-28px_rgba(0,0,0,0.32)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1rem] border border-[color:rgba(8,8,8,0.04)] bg-[color:var(--paper-strong)] shadow-[0_18px_30px_-26px_rgba(0,0,0,0.28)]">
      <div className="flex items-center justify-between border-b border-[color:var(--line)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[color:var(--ink)]/20" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--warning)]/35" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--success)]/45" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
          Panel operativo
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[0.95rem] bg-[color:var(--paper-muted)] p-4">
          <p className="section-label">Resumen</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-[0.8rem] bg-[color:var(--paper-strong)] px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Tareas
              </p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--ink-soft)]">18 activas</p>
            </div>
            <div className="rounded-[0.8rem] bg-[color:var(--paper-strong)] px-3 py-3">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Equipo
              </p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--ink-soft)]">6 personas</p>
            </div>
          </div>
          <div className="mt-3 rounded-[0.8rem] bg-[color:var(--paper-strong)] px-3 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
              Aprobaciones
            </p>
            <p className="mt-2 text-sm font-semibold text-[color:var(--ink-soft)]">
              2 pendientes para esta semana
            </p>
          </div>
        </div>

        <div className="rounded-[0.95rem] bg-[color:rgba(95,121,108,0.08)] p-4">
          <p className="section-label">Flujo interno</p>
          <div className="mt-4 space-y-2">
            {["Solicitud recibida", "Revisión del responsable", "Entrega validada"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[0.8rem] bg-[color:var(--paper-strong)] px-3 py-3 text-sm font-semibold text-[color:var(--ink-soft)]"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--success)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen overflow-x-hidden px-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-28 sm:gap-36">
        <header className="app-sticky-top sticky z-40">
          <div className="flex items-center justify-between gap-4 border-b border-[color:var(--line)] bg-[color:rgba(253,253,251,0.84)] px-1 py-4 backdrop-blur-sm">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[color:var(--ink)] text-sm font-semibold text-white">
                HT
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Hazlo tú mismo
                </p>
                <p className="hidden text-sm text-[color:var(--muted)] md:block">
                  Co-creación operativa para no-code e IA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <nav className="hidden items-center gap-6 text-sm text-[color:var(--muted)] lg:flex">
                <a href="#metodologia">Metodología</a>
                <a href="#casos">Casos de uso</a>
              </nav>
              <Link
                href="/login"
                className="premium-button premium-button-accent px-4 py-2.5"
              >
                Agendar sesión
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[0.96fr_0.84fr] lg:items-center lg:gap-18">
          <div className="max-w-3xl lg:pr-10">
            <p className="section-label reveal-up">Hazlo tú mismo</p>
            <h1 className="font-editorial reveal-up delay-1 mt-6 max-w-[9ch] text-[3.4rem] leading-[0.88] text-[color:var(--ink)] sm:text-[4.8rem] lg:text-[5.6rem]">
              Construye soluciones digitales y de IA con acompañamiento{" "}
              <span className="italic">humano</span>.
            </h1>
            <p className="reveal-up delay-2 mt-8 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg sm:leading-9">
              Un espacio de trabajo guiado para construir chatbots, automatizaciones y sitios web
              con sesiones en vivo y visibilidad clara.
            </p>

            <div className="reveal-up delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/workspace/demo"
                className="premium-button premium-button-accent w-full px-6 py-3 sm:w-auto"
              >
                Explorar proyectos
              </Link>
              <Link
                href="/login"
                className="premium-button premium-button-ghost w-full px-4 py-3 sm:w-auto"
              >
                Agendar primera sesión
              </Link>
            </div>
          </div>

          <div className="surface-card reveal-up delay-3 overflow-hidden p-5 sm:p-6 lg:p-7">
            <div className="editorial-frame p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-[color:var(--line)] pb-5">
                <div>
                  <p className="section-label">Sesión en curso</p>
                  <h2 className="font-editorial mt-3 text-[2.35rem] leading-[0.9] text-[color:var(--ink-soft)]">
                    Trabajo visible
                  </h2>
                </div>
                <div className="rounded-md bg-[color:var(--gold-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-soft)]">
                  En vivo
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[0.9rem] bg-[color:var(--paper-strong)] p-5 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.24)]">
                  <p className="section-label">Objetivo actual</p>
                  <p className="mt-4 text-xl font-semibold leading-8 tracking-[-0.025em] text-[color:var(--ink-soft)]">
                    Conectar formulario, CRM y agente de ventas.
                  </p>
                  <div className="editorial-hairline mt-5" />
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
                      AR
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--ink-soft)]">Andrea R.</p>
                      <p className="text-sm text-[color:var(--muted)]">Asesora asignada</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {deliveryFlow.map((step) => (
                    <article
                      key={step.stage}
                      className="rounded-[0.9rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.18)]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`h-2.5 w-2.5 rounded-full ${step.dot}`} />
                          <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                            {step.stage}
                          </p>
                        </div>
                        <span
                          className={`inline-flex rounded-md px-3 py-1 text-[11px] font-semibold ${step.badgeClass}`}
                        >
                          {step.badgeLabel}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold leading-6 text-[color:var(--ink-soft)]">
                        {step.task}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{step.note}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-[0.9rem] bg-[color:var(--paper-strong)] p-4 shadow-[0_18px_30px_-26px_rgba(0,0,0,0.18)]">
                <p className="section-label">Siguiente paso</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[color:var(--ink-soft)]">
                  Validar la primera prueba del flujo y ajustar el recorrido comercial.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="section-label">Por qué estar aquí</p>
            <h2 className="font-editorial mt-5 max-w-[13ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
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
            <h2 className="font-editorial mt-5 max-w-[14ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
              Una metodología simple para convertir ideas en productos tangibles.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {workflow.map((item) => (
              <article key={item.step} className="border-t border-[color:var(--line)] pt-6">
                <p className="text-sm font-semibold text-[color:var(--muted)]">{item.step}</p>
                <h3 className="font-editorial mt-5 text-[2.2rem] leading-[0.92] text-[color:var(--ink-soft)]">
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
            <h2 className="font-editorial mt-5 max-w-[15ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
              Casos de uso que un negocio puede construir con supervisión y trazabilidad.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {useCases.map((useCase) => (
              <article key={useCase.title} className="surface-card group overflow-hidden p-0">
                <div
                  className={`p-5 transition duration-500 group-hover:translate-y-[-2px] sm:p-6 ${useCase.previewTone}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${useCase.previewAccent}`} />
                      <p className="section-label">{useCase.previewLabel}</p>
                    </div>
                    <span className="rounded-md bg-[color:var(--paper-strong)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-soft)]">
                      {useCase.previewMetric}
                    </span>
                  </div>

                  <div className="mt-5">{renderUseCasePreview(useCase)}</div>
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
            <h2 className="font-editorial mt-5 max-w-[14ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
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
            <h2 className="font-editorial mt-5 max-w-[14ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
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
                    <h3 className="font-editorial mt-4 text-[2.4rem] leading-[0.92] text-[color:var(--ink-soft)]">
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
          <div className="max-w-2xl">
            <p className="section-label">Preguntas frecuentes</p>
            <h2 className="font-editorial mt-5 max-w-[12ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
              Respuestas claras para bajar fricción antes de empezar.
            </h2>
          </div>

          <div className="surface-card divide-y divide-[color:var(--line)] p-2">
            {faqs.map((item) => (
              <details key={item.question} className="group px-6 py-5">
                <summary className="font-editorial cursor-pointer list-none pr-8 text-[2rem] leading-[0.94] text-[color:var(--ink-soft)]">
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
              <h2 className="font-editorial mt-5 max-w-[14ch] text-[3.1rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.2rem]">
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

        <footer className="border-t border-[color:var(--line)] pb-4 pt-1">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--ink)] text-[11px] font-semibold text-white">
                  HT
                </div>
                <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--muted)]">
                  Hazlo tú mismo
                </p>
              </div>
              <p className="max-w-md text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
                Co-creación operativa para no-code e IA.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
              <a href="#metodologia">Metodología</a>
              <a href="#casos">Casos de uso</a>
              <a href="#planes">Planes</a>
              <Link href="/login">Agendar</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
