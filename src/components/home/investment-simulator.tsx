"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const technicalLevels = [
  {
    id: "muy-basicos",
    label: "Muy básicos",
    description: "Necesitas guía cercana para conectar herramientas y tomar decisiones.",
  },
  {
    id: "basicos",
    label: "Básicos",
    description: "Ya te mueves en herramientas visuales, pero todavía necesitas estructura.",
  },
  {
    id: "intermedios",
    label: "Intermedios",
    description: "Puedes avanzar por tu cuenta y usar la sesión para destrabar y acelerar.",
  },
] as const;

const projectComplexities = [
  {
    id: "muy-facil",
    label: "Muy fácil",
    description: "Una automatización puntual o una entrega acotada.",
  },
  {
    id: "facil",
    label: "Fácil",
    description: "Un flujo simple con pocas integraciones.",
  },
  {
    id: "moderado",
    label: "Moderado",
    description: "Cruza varias piezas del negocio y pide criterio operativo.",
  },
  {
    id: "complejo",
    label: "Complejo",
    description: "Incluye varias herramientas, dependencias y decisiones de estructura.",
  },
  {
    id: "muy-complejo",
    label: "Muy complejo",
    description: "Necesita varias iteraciones y acompañamiento sostenido.",
  },
] as const;

const modelLicenseOptions = [
  {
    value: true,
    title: "Sí tengo Claude, GPT o Gemini",
    description: "Puedo arrancar con una licencia vigente.",
  },
  {
    value: false,
    title: "No tengo licencia activa",
    description: "Antes de arrancar debo resolver ese requisito.",
  },
] as const;

const extraToolsOptions = [
  {
    value: true,
    title: "Acepto herramientas extra",
    description: "Puedo sumar software complementario entre USD 10 y USD 30 al mes.",
  },
  {
    value: false,
    title: "No acepto ese costo mensual",
    description: "Prefiero evitar software recurrente adicional.",
  },
] as const;

const sessionMatrix = {
  "muy-basicos": {
    "muy-facil": 4,
    facil: 5,
    moderado: 8,
    complejo: 9,
    "muy-complejo": 10,
  },
  basicos: {
    "muy-facil": 4,
    facil: 5,
    moderado: 8,
    complejo: 9,
    "muy-complejo": 10,
  },
  intermedios: {
    "muy-facil": 3,
    facil: 4,
    moderado: 7,
    complejo: 8,
    "muy-complejo": 9,
  },
} as const;

type TechnicalLevelId = (typeof technicalLevels)[number]["id"];
type ProjectComplexityId = (typeof projectComplexities)[number]["id"];

function getSessionRate(sessions: number) {
  if (sessions <= 5) {
    return 50;
  }

  if (sessions <= 10) {
    return 45;
  }

  return 40;
}

function getSuggestedPack(sessions: number) {
  if (sessions <= 5) {
    return "Pack Arranque";
  }

  if (sessions <= 10) {
    return "Pack Desarrollo";
  }

  return "Pack Escala";
}

function getActivationState(hasModelLicense: boolean, acceptsExtraTools: boolean) {
  const items = [
    {
      label: "Licencia activa de Claude, GPT o Gemini",
      ready: hasModelLicense,
      help: hasModelLicense
        ? "Ya puedes trabajar con el modelo dentro de la metodología."
        : "Necesitas activar una licencia para usar esta ruta sin fricción.",
    },
    {
      label: "Herramientas extra entre USD 10 y USD 30 al mes",
      ready: acceptsExtraTools,
      help: acceptsExtraTools
        ? "Hay margen para sumar software liviano cuando haga sentido."
        : "Conviene abrir ese margen para que la ruta se sostenga mejor en la práctica.",
    },
  ] as const;

  return items;
}

function formatUsdAmount(value: number) {
  return `USD ${value.toLocaleString("en-US")}`;
}

function useAnimatedNumber(target: number | null, active: boolean) {
  const [value, setValue] = useState(target ?? 0);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (!active || target === null) {
      return;
    }

    let frame = 0;
    const duration = 520;
    const startValue = valueRef.current;
    const startTime = performance.now();

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(startValue + (target - startValue) * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

export function InvestmentSimulator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [technicalLevel, setTechnicalLevel] = useState<TechnicalLevelId | null>(null);
  const [complexity, setComplexity] = useState<ProjectComplexityId | null>(null);
  const [hasModelLicense, setHasModelLicense] = useState<boolean | null>(null);
  const [acceptsExtraTools, setAcceptsExtraTools] = useState<boolean | null>(null);

  const selectedLevel = technicalLevels.find((item) => item.id === technicalLevel) ?? null;
  const selectedComplexity = projectComplexities.find((item) => item.id === complexity) ?? null;
  const sessions =
    technicalLevel && complexity ? sessionMatrix[technicalLevel][complexity] : null;
  const rate = sessions ? getSessionRate(sessions) : null;
  const investment = sessions && rate ? sessions * rate : null;
  const suggestedPack = sessions ? getSuggestedPack(sessions) : null;
  const rateDescription = sessions
    ? sessions <= 5
      ? "Para estimaciones de 1 a 5 sesiones aplica USD 50 por sesión."
      : sessions <= 10
        ? "Para estimaciones de 6 a 10 sesiones aplica USD 45 por sesión."
        : "Para estimaciones de 11 a 15 sesiones aplica USD 40 por sesión."
    : "";
  const activationItems = getActivationState(hasModelLicense === true, acceptsExtraTools === true);
  const pendingItems = activationItems.filter((item) => !item.ready);
  const readyToStart =
    hasModelLicense === true && acceptsExtraTools === true && pendingItems.length === 0;
  const stepCompletion = [
    technicalLevel !== null,
    complexity !== null,
    hasModelLicense !== null,
    acceptsExtraTools !== null,
  ] as const;
  const steps = [
    {
      number: "01",
      title: "Nivel técnico",
      description: "Ubica tu punto de partida para estimar el nivel de acompañamiento.",
      value: selectedLevel?.label ?? "Pendiente",
    },
    {
      number: "02",
      title: "Complejidad",
      description: "Define cuántas piezas hay que coordinar para que el producto funcione.",
      value: selectedComplexity?.label ?? "Pendiente",
    },
    {
      number: "03",
      title: "Licencia",
      description: "Confirma si ya tienes acceso al modelo con el que vas a trabajar.",
      value:
        hasModelLicense === null
          ? "Pendiente"
          : hasModelLicense
            ? "Licencia activa"
            : "Pendiente de activar",
    },
    {
      number: "04",
      title: "Herramientas extra",
      description: "Confirma si puedes sumar software ligero para sostener el flujo.",
      value:
        acceptsExtraTools === null
          ? "Pendiente"
          : acceptsExtraTools
            ? "Aceptadas"
            : "Sin margen adicional",
    },
  ] as const;
  const totalQuestions = steps.length;
  const isResultStep = currentStep === totalQuestions;
  const activeStep = steps[Math.min(currentStep, totalQuestions - 1)];
  const progress = isResultStep ? 100 : ((currentStep + 1) / totalQuestions) * 100;
  const canContinue = currentStep < totalQuestions ? stepCompletion[currentStep] : false;
  const animatedSessions = useAnimatedNumber(sessions, isResultStep);
  const animatedInvestment = useAnimatedNumber(investment, isResultStep);
  const animatedRate = useAnimatedNumber(rate, isResultStep);
  const currentOptions =
    currentStep === 0
      ? technicalLevels.map((item) => ({
          key: item.id,
          title: item.label,
          description: item.description,
          selected: item.id === technicalLevel,
          onSelect: () => setTechnicalLevel(item.id),
        }))
      : currentStep === 1
        ? projectComplexities.map((item) => ({
            key: item.id,
            title: item.label,
            description: item.description,
            selected: item.id === complexity,
            onSelect: () => setComplexity(item.id),
          }))
        : currentStep === 2
          ? modelLicenseOptions.map((item) => ({
              key: item.title,
              title: item.title,
              description: item.description,
              selected: item.value === hasModelLicense,
              onSelect: () => setHasModelLicense(item.value),
            }))
          : extraToolsOptions.map((item) => ({
              key: item.title,
              title: item.title,
              description: item.description,
              selected: item.value === acceptsExtraTools,
              onSelect: () => setAcceptsExtraTools(item.value),
            }));

  return (
    <div className="surface-card p-5 sm:p-6 lg:p-12">
      <div className="max-w-3xl">
        <p className="section-label">Simulador de inversión</p>
        <h2 className="font-editorial mt-5 max-w-[12ch] text-[3rem] leading-[0.9] text-[color:var(--ink-soft)] sm:text-[4.15rem]">
          Calcula tu punto de partida en Hazlo tú mismo.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
          Responde una decisión a la vez. Al final verás sesiones, inversión y activación.
        </p>
      </div>

      <div className="surface-card-muted mt-8 p-5 sm:p-8 lg:p-10">
        <div className="h-px overflow-hidden bg-[color:rgba(8,8,8,0.08)]">
          <div
            className="h-full bg-[color:var(--ink)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
          <span>{isResultStep ? "Ruta propuesta" : activeStep.title}</span>
          <span className="truncate text-right">
            {isResultStep
              ? "Completado"
              : activeStep.value === "Pendiente"
                ? "Respuesta pendiente"
                : activeStep.value}
          </span>
        </div>

        {!isResultStep ? (
          <div className="mt-10">
            <div className="max-w-3xl">
              <p className="section-label">Hazlo tú mismo</p>
              <h3 className="font-editorial mt-5 max-w-[10ch] text-[2.9rem] leading-[0.88] text-[color:var(--ink-soft)] sm:text-[4rem] lg:text-[4.75rem]">
                {activeStep.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
                {activeStep.description}
              </p>
            </div>

            <div className="mt-10 max-w-3xl space-y-3">
              {currentOptions.map((item) => (
                <button
                  key={item.key}
                  className={`w-full rounded-[0.9rem] border px-5 py-5 text-left transition sm:px-6 sm:py-6 ${
                    item.selected
                      ? "border-[color:var(--ink)] bg-[color:var(--paper-strong)] shadow-[0_24px_40px_-28px_rgba(0,0,0,0.22)]"
                      : "border-[color:var(--line)] bg-[color:rgba(255,255,255,0.72)] hover:border-[color:var(--line-strong)] hover:bg-[color:var(--paper-strong)] hover:translate-y-[-2px]"
                  }`}
                  onClick={item.onSelect}
                  type="button"
                >
                  <p className="font-editorial text-[2.2rem] leading-[0.92] text-[color:var(--ink-soft)] sm:text-[2.55rem]">
                    {item.title}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--muted)] sm:text-base sm:leading-7">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
                {currentStep === totalQuestions - 1
                  ? "Selecciona una opción y luego haz clic en Ver propuesta."
                  : "Selecciona una opción y continúa."}
              </p>
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  className="premium-button premium-button-secondary w-full px-5 py-3 sm:w-auto"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((step) => Math.max(step - 1, 0))}
                  type="button"
                >
                  Anterior
                </button>
                <button
                  className="premium-button premium-button-accent w-full px-5 py-3 sm:w-auto"
                  disabled={!canContinue}
                  onClick={() =>
                    setCurrentStep((step) => Math.min(step + 1, totalQuestions))
                  }
                  type="button"
                >
                  {currentStep === totalQuestions - 1 ? "Ver propuesta" : "Continuar"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            <div className="editorial-frame p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Ruta prioritaria</p>
                  <h4 className="font-editorial mt-3 text-[2.75rem] leading-[0.9] text-[color:var(--ink-soft)]">
                    Hazlo tú mismo
                  </h4>
                </div>
                <span
                  className={`rounded-md px-3 py-1 text-xs font-semibold ${
                    readyToStart
                      ? "bg-[color:var(--ink)] text-white"
                      : "bg-[color:rgba(211,138,18,0.12)] text-[color:var(--warning)]"
                  }`}
                >
                  {readyToStart ? "Lista para arrancar" : "Necesita activación"}
                </span>
              </div>

              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                {readyToStart
                  ? "Tu perfil ya está alineado con esta metodología. La recomendación es empezar por aquí y usar las sesiones para construir con acompañamiento."
                  : "Seguimos priorizando Hazlo tú mismo, pero antes de arrancar te conviene activar los requisitos pendientes."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="editorial-frame px-4 py-4">
                <p className="section-label">Sesiones estimadas</p>
                <p className="mt-3 text-3xl font-semibold">{animatedSessions}</p>
                <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                  {selectedLevel?.label} + {selectedComplexity?.label}
                </p>
              </div>
              <div className="editorial-frame px-4 py-4">
                <p className="section-label">Inversión de referencia</p>
                <p className="mt-3 text-3xl font-semibold">{formatUsdAmount(animatedInvestment)}</p>
                <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                  Referencia calculada según la estimación de trabajo.
                </p>
              </div>
              <div className="editorial-frame px-4 py-4">
                <p className="section-label">Tarifa estimada</p>
                <p className="mt-3 text-2xl font-semibold">{formatUsdAmount(animatedRate)}</p>
                <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                  {rateDescription}
                </p>
              </div>
              <div className="editorial-frame px-4 py-4">
                <p className="section-label">Pack sugerido</p>
                <p className="mt-3 text-2xl font-semibold">{suggestedPack}</p>
                <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                  Referencia comercial para comprar capacidad suficiente.
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="editorial-frame p-5">
                <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
                  Requisitos de activación
                </p>
                <div className="mt-4 space-y-3">
                  {activationItems.map((item) => (
                    <div
                      key={item.label}
                      className={`rounded-xl border px-4 py-4 ${
                        item.ready
                          ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                          : "border-[color:rgba(211,138,18,0.18)] bg-[color:rgba(211,138,18,0.08)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                            {item.help}
                          </p>
                        </div>
                        <span
                          className={`rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                            item.ready
                              ? "bg-[color:var(--accent)] text-white"
                              : "bg-[color:rgba(211,138,18,0.14)] text-[color:var(--warning)]"
                          }`}
                        >
                          {item.ready ? "OK" : "Pendiente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="editorial-frame p-5">
                <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
                  {readyToStart ? "Siguiente paso recomendado" : "Para habilitar esta ruta"}
                </p>
                <div className="mt-4 space-y-3">
                  {(readyToStart
                    ? [
                        "Agenda la primera sesión y llega con una meta concreta.",
                        `Empieza con ${suggestedPack} como referencia inicial de capacidad.`,
                        "Usa la sesión para definir flujo, entregables y próximos pasos.",
                      ]
                    : pendingItems.map((item) => item.help)
                  ).map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 border-t border-[color:var(--line)] pt-3 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                      <p className="text-sm leading-6 text-[color:var(--muted)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[color:var(--line)] pt-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="premium-button premium-button-secondary w-full px-5 py-3 sm:w-auto"
                onClick={() => setCurrentStep(totalQuestions - 1)}
                type="button"
              >
                Ajustar respuestas
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/login" className="premium-button premium-button-accent w-full px-5 py-3 sm:w-auto">
                  {readyToStart ? "Agendar primera sesión" : "Quiero activar esta ruta"}
                </Link>
                <Link href="#planes" className="premium-button premium-button-secondary w-full px-5 py-3 sm:w-auto">
                  Ver planes
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
