import Link from "next/link";
import { InvestmentSimulator } from "@/components/home/investment-simulator";

const pains = [
  {
    title: "La barrera no son las herramientas",
    description:
      "El problema suele ser saber que conectar primero, como priorizar y donde aterrizar cada decision sin perder semanas.",
  },
  {
    title: "WhatsApp no es una metodologia",
    description:
      "Cuando todo vive entre mensajes, videollamadas y notas sueltas, el proyecto se siente avanzado pero no se convierte en un producto.",
  },
  {
    title: "La dependencia tecnica frena la velocidad",
    description:
      "Esperar a TI o tercerizar por completo reduce el control del negocio sobre su propia operacion digital.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Define tu meta",
    description:
      "Eliges que quieres construir: agente de IA, automatizacion, web comercial o sistema interno.",
  },
  {
    step: "02",
    title: "Adquiere tus horas",
    description:
      "Compras un paquete de sesiones para trabajar con una capacidad clara y un alcance visible.",
  },
  {
    step: "03",
    title: "Co-creacion en vivo",
    description:
      "Trabajas con tu asesor por Meet o Zoom mientras el producto se mueve en tiempo real.",
  },
  {
    step: "04",
    title: "Trazabilidad total",
    description:
      "Apruebas entregables, sigues tareas y dejas evidencia dentro del mismo tablero del proyecto.",
  },
];

const useCases = [
  {
    title: "Asistente virtual para ventas",
    description:
      "Un chatbot entrenado para calificar leads, responder objeciones y activar la siguiente accion comercial.",
    tools: ["OpenAI", "Make", "WhatsApp"],
    state: "Listo para conversaciones reales",
    accent: "border-l-[color:var(--accent)]",
  },
  {
    title: "Sitio web con IA integrada",
    description:
      "Una pagina de conversion conectada con formularios, contenido dinamico y automatizaciones de seguimiento.",
    tools: ["Webflow", "Framer", "OpenAI"],
    state: "Diseno y operacion en un mismo flujo",
    accent: "border-l-[color:var(--success)]",
  },
  {
    title: "Automatizacion de lead generation",
    description:
      "Captura, enriquece y distribuye prospectos sin depender de procesos manuales entre marketing y ventas.",
    tools: ["HubSpot", "Make", "Airtable"],
    state: "Embudo visible y accionable",
    accent: "border-l-[color:var(--warning)]",
  },
  {
    title: "Sistema de gestion interna",
    description:
      "Tableros, formularios, roles y automatizaciones para que el equipo opere con menos friccion y mas control.",
    tools: ["Notion", "Glide", "Zapier"],
    state: "Orden operativo para el equipo",
    accent: "border-l-[color:var(--danger)]",
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
    context: "Caso tipo / Operacion interna",
  },
  {
    quote:
      "La plataforma nos dio una forma de construir con supervision ejecutiva sin depender por completo de un tercero.",
    context: "Caso tipo / Fundadores no tecnicos",
  },
];

const plans = [
  {
    name: "Pack Arranque",
    sessions: "4 sesiones",
    price: "USD 480",
    description: "Para validar, construir una primera version y dejar una base funcional.",
    features: [
      "Kickoff y alcance",
      "Co-creacion en vivo",
      "Tablero y entregables visibles",
      "Cierre con siguientes pasos",
    ],
  },
  {
    name: "Pack Desarrollo",
    sessions: "8 sesiones",
    price: "USD 920",
    description: "Para proyectos que necesitan iteracion, pruebas y un flujo operativo completo.",
    features: [
      "Capacidad continua de trabajo",
      "Revision de integraciones",
      "Evidencia por sesion",
      "Ajustes sobre resultados reales",
    ],
    featured: true,
  },
  {
    name: "Pack Escala",
    sessions: "12 sesiones",
    price: "USD 1320",
    description: "Para sistemas internos, automatizaciones complejas o iniciativas con varios modulos.",
    features: [
      "Acompanamiento extendido",
      "Prioridad operativa",
      "Mas espacio para refinamiento",
      "Mayor supervision de implementacion",
    ],
  },
];

const faqs = [
  {
    question: "Necesito saber de no-code o IA antes de empezar?",
    answer:
      "No. La plataforma esta pensada para trabajar contigo, no para examinarte. El objetivo es construir bajo una metodologia guiada.",
  },
  {
    question: "Que pasa entre una sesion y la siguiente?",
    answer:
      "El trabajo no desaparece. El proyecto queda en el tablero con tareas, acuerdos, avances y evidencia para retomar exactamente donde quedo.",
  },
  {
    question: "Solo sirve para chatbots?",
    answer:
      "No. Tambien aplica para webs, automatizaciones comerciales, flujos internos y productos digitales que requieren una capa operativa clara.",
  },
  {
    question: "Como se define cuantas sesiones necesito?",
    answer:
      "Puedes usar el simulador de inversion como referencia inicial y luego afinar el alcance en la primera conversacion.",
  },
];

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-x-hidden px-6 pb-24 pt-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-24">
        <header className="sticky top-4 z-40">
          <div className="surface-card flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--ink)] text-sm font-semibold text-white">
                HT
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                  Hazlo tu mismo
                </p>
                <p className="text-sm font-medium text-[color:var(--ink-soft)]">
                  Co-creacion operativa para no-code e IA
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <nav className="hidden items-center gap-6 text-sm text-[color:var(--muted)] md:flex">
                <a href="#metodologia">Metodologia</a>
                <a href="#casos">Casos de uso</a>
                <a href="#planes">Planes</a>
              </nav>
              <Link href="/login" className="premium-button premium-button-accent px-5 py-3">
                Agendar primera sesion
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="eyebrow">Metodologia, orden y ejecucion</div>
            <h1 className="mt-7 font-display text-5xl leading-[0.95] tracking-[-0.04em] text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
              Construye tus soluciones digitales y de IA. Acompanado, paso a paso.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              La plataforma donde emprendedores y expertos en no-code co-crean chatbots,
              automatizaciones y webs en tiempo real. Cero teoria, 100% ejecucion.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/workspace/demo" className="premium-button premium-button-accent px-6 py-3">
                Explorar proyectos
              </Link>
              <Link href="/login" className="premium-button premium-button-secondary px-6 py-3">
                Agendar primera sesion
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Copiloto experto",
                  detail: "No trabajas solo ni delegas a ciegas.",
                },
                {
                  title: "Trabajo en vivo",
                  detail: "Las sesiones se convierten en entregables visibles.",
                },
                {
                  title: "Control del negocio",
                  detail: "La supervision y el contexto quedan de tu lado.",
                },
              ].map((item) => (
                <article key={item.title} className="surface-card-muted p-5">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-card overflow-hidden p-6 lg:p-7">
            <div className="grid gap-5 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="surface-card-muted p-5">
                <div className="flex items-start justify-between border-b border-[color:var(--line)] pb-4">
                  <div>
                    <p className="section-label">Sala de trabajo</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                      Sesion activa
                    </h2>
                  </div>
                  <div className="rounded-full bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--accent)]">
                    En vivo
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-[color:var(--line)] bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--accent-soft)] text-sm font-semibold text-[color:var(--accent)]">
                      AR
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Andrea R.</p>
                      <p className="text-sm text-[color:var(--muted)]">Asesora no-code e IA</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
                    Objetivo: conectar formulario, CRM y agente de ventas para mover leads reales.
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[color:var(--line)] bg-white p-4">
                    <p className="section-label">Duracion</p>
                    <p className="mt-3 text-xl font-semibold">60 min</p>
                  </div>
                  <div className="rounded-xl border border-[color:var(--line)] bg-white p-4">
                    <p className="section-label">Canal</p>
                    <p className="mt-3 text-xl font-semibold">Meet integrado</p>
                  </div>
                </div>
              </div>

              <div className="surface-card-muted p-5">
                <div className="flex items-end justify-between border-b border-[color:var(--line)] pb-4">
                  <div>
                    <p className="section-label">Tablero Kanban</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                      Progreso visible
                    </h3>
                  </div>
                  <p className="text-sm text-[color:var(--muted)]">Idea a Implementado</p>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {[
                    {
                      title: "Idea",
                      card: "Definir recorrido del lead",
                      tone: "bg-white",
                      dot: "bg-[color:var(--danger)]",
                    },
                    {
                      title: "En progreso",
                      card: "Conectar CRM y automatizacion",
                      tone: "bg-[color:rgba(211,138,18,0.10)]",
                      dot: "bg-[color:var(--warning)]",
                    },
                    {
                      title: "Implementado",
                      card: "Bot de respuestas iniciales",
                      tone: "bg-[color:rgba(24,161,111,0.10)]",
                      dot: "bg-[color:var(--success)]",
                    },
                  ].map((column) => (
                    <div key={column.title} className={`rounded-xl border border-[color:var(--line)] p-4 ${column.tone}`}>
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
                        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                          {column.title}
                        </p>
                      </div>
                      <article className="mt-4 rounded-lg border border-[color:var(--line)] bg-white p-3">
                        <p className="text-sm font-semibold">{column.card}</p>
                        <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                          Estado actualizado dentro del mismo flujo de trabajo.
                        </p>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="section-label">Por que estar aqui</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
              La barrera no es la tecnologia. Es saber como estructurarla.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
              Hazlo tu mismo existe para transformar incertidumbre tecnica en confianza operativa.
              No es un curso. No es una agencia opaca. Es un entorno de construccion guiada.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pains.map((pain) => (
              <article key={pain.title} className="surface-card p-8">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{pain.title}</h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {pain.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="metodologia" className="grid gap-8">
          <div className="max-w-3xl">
            <p className="section-label">Como funciona</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
              Una metodologia simple para convertir ideas en productos tangibles.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {workflow.map((item) => (
              <article key={item.step} className="surface-card-muted p-8">
                <p className="text-sm font-semibold text-[color:var(--accent)]">{item.step}</p>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="casos" className="grid gap-8">
          <div className="max-w-3xl">
            <p className="section-label">Catalogo de posibilidades</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
              Casos de uso que un negocio puede construir con supervision y trazabilidad.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className={`group surface-card border-l-4 p-8 transition duration-200 hover:border-[color:var(--accent-line)] hover:shadow-[0_12px_32px_rgba(17,19,21,0.06)] ${useCase.accent}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em]">{useCase.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                      {useCase.description}
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">
                    Caso
                  </span>
                </div>

                <p className="mt-6 text-sm font-medium text-[color:var(--ink-soft)]">{useCase.state}</p>

                <div className="mt-4 flex flex-wrap gap-2 opacity-0 transition duration-200 group-hover:opacity-100">
                  {useCase.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-[color:var(--accent-line)] bg-[color:var(--accent-soft)] px-3 py-1 text-xs font-medium text-[color:var(--accent)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <InvestmentSimulator />

        <section className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start">
          <div className="surface-card p-8 lg:p-10">
            <p className="section-label">Autoridad operativa</p>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
              El valor no esta en prometer magia, sino en mostrar control del proceso.
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
                <p className="text-lg leading-8 text-[color:var(--ink-soft)]">
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
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
              Compra capacidad de ejecucion, no horas sueltas sin estructura.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`surface-card p-8 ${plan.featured ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-label">{plan.sessions}</p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{plan.name}</h3>
                  </div>
                  {plan.featured ? (
                    <span className="rounded-full bg-[color:var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                      Recomendado
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{plan.description}</p>
                <p className="mt-6 text-4xl font-semibold tracking-[-0.03em]">{plan.price}</p>

                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 border-t border-[color:var(--line)] pt-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <p className="text-sm leading-6 text-[color:var(--muted)]">{feature}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/login"
                  className={`mt-8 inline-flex ${plan.featured ? "premium-button premium-button-accent" : "premium-button premium-button-secondary"} px-5 py-3`}
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
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
              Respuestas claras para bajar friccion antes de empezar.
            </h2>
          </div>

          <div className="surface-card divide-y divide-[color:var(--line)] p-2">
            {faqs.map((item) => (
              <details key={item.question} className="group px-6 py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold tracking-[-0.02em]">
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
              <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
                Si la idea ya existe, el siguiente paso es ponerla a operar.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
                Empieza con una primera sesion, define la meta y entra a un entorno donde el
                proyecto se construye contigo, no alrededor tuyo.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="premium-button premium-button-accent px-6 py-3">
                Agendar primera sesion
              </Link>
              <Link href="/workspace/demo" className="premium-button premium-button-secondary px-6 py-3">
                Explorar demo
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
