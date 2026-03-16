"use client";

import Link from "next/link";
import { useState } from "react";

const technicalLevels = [
  {
    id: "muy-basicos",
    label: "Muy basicos",
    description: "Necesitas acompanamiento muy guiado para conectar herramientas y tomar decisiones.",
  },
  {
    id: "basicos",
    label: "Basicos",
    description: "Ya puedes moverte en herramientas visuales, pero todavia necesitas estructura.",
  },
  {
    id: "intermedios",
    label: "Intermedios",
    description: "Puedes ejecutar parte del trabajo y usar la sesion para destrabar y acelerar.",
  },
] as const;

const projectComplexities = [
  { id: "muy-facil", label: "Muy facil" },
  { id: "facil", label: "Facil" },
  { id: "moderado", label: "Moderado" },
  { id: "complejo", label: "Complejo" },
  { id: "muy-complejo", label: "Muy complejo" },
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
  if (sessions <= 1) {
    return 50;
  }

  if (sessions <= 3) {
    return 45;
  }

  return 40;
}

function getSuggestedPack(sessions: number) {
  if (sessions <= 4) {
    return "Pack Arranque";
  }

  if (sessions <= 8) {
    return "Pack Desarrollo";
  }

  return "Pack Escala";
}

export function InvestmentSimulator() {
  const [technicalLevel, setTechnicalLevel] = useState<TechnicalLevelId>("basicos");
  const [complexity, setComplexity] = useState<ProjectComplexityId>("moderado");
  const [hasModelLicense, setHasModelLicense] = useState(true);
  const [acceptsExtraTools, setAcceptsExtraTools] = useState(true);

  const sessions = sessionMatrix[technicalLevel][complexity];
  const rate = getSessionRate(sessions);
  const investment = sessions * rate;
  const selfServeRecommended = hasModelLicense && acceptsExtraTools;
  const suggestedPack = getSuggestedPack(sessions);
  const selectedLevel = technicalLevels.find((item) => item.id === technicalLevel);

  return (
    <div className="surface-card grid gap-8 p-8 lg:grid-cols-[0.98fr_1.02fr] lg:p-10">
      <div>
        <p className="section-label">Simulador de inversion</p>
        <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
          Como decide la ruta Hazlo tu mismo.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)]">
          Evaluamos nivel tecnico, complejidad del proyecto, si ya tienes Claude, GPT o Gemini con
          licencia, y si aceptas herramientas extra entre USD 10 y USD 30 al mes.
        </p>

        <div className="mt-8 space-y-7">
          <div>
            <p className="section-label">Nivel tecnico</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {technicalLevels.map((item) => (
                <button
                  key={item.id}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    item.id === technicalLevel
                      ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                      : "border-[color:var(--line)] bg-white"
                  }`}
                  onClick={() => setTechnicalLevel(item.id)}
                  type="button"
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="section-label">Complejidad del proyecto</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projectComplexities.map((item) => (
                <button
                  key={item.id}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    item.id === complexity
                      ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                      : "border-[color:var(--line)] bg-white"
                  }`}
                  onClick={() => setComplexity(item.id)}
                  type="button"
                >
                  <p className="text-sm font-semibold">{item.label}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="section-label">Licencia activa</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: true,
                  title: "Si tengo Claude, GPT o Gemini",
                  description: "Puedo trabajar con una licencia vigente.",
                },
                {
                  value: false,
                  title: "No tengo licencia",
                  description: "Necesito evitar ese requisito para ejecutar.",
                },
              ].map((item) => (
                <button
                  key={item.title}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    item.value === hasModelLicense
                      ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                      : "border-[color:var(--line)] bg-white"
                  }`}
                  onClick={() => setHasModelLicense(item.value)}
                  type="button"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="section-label">Herramientas extra</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: true,
                  title: "Acepto USD 10 a 30 al mes",
                  description: "Hay margen para herramientas complementarias si hacen el flujo viable.",
                },
                {
                  value: false,
                  title: "No acepto ese costo mensual",
                  description: "Prefiero evitar software adicional recurrente.",
                },
              ].map((item) => (
                <button
                  key={item.title}
                  className={`rounded-xl border px-4 py-4 text-left transition ${
                    item.value === acceptsExtraTools
                      ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                      : "border-[color:var(--line)] bg-white"
                  }`}
                  onClick={() => setAcceptsExtraTools(item.value)}
                  type="button"
                >
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="surface-card-muted p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-label">Ruta recomendada</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
              {selfServeRecommended ? "Hazlo tu mismo" : "AlgoritmoT lo hace por mi"}
            </h3>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              selfServeRecommended
                ? "bg-[color:var(--accent)] text-white"
                : "bg-[color:rgba(225,102,102,0.12)] text-[color:var(--danger)]"
            }`}
          >
            {selfServeRecommended ? "Recomendada" : "No recomendada"}
          </span>
        </div>

        <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
          {selfServeRecommended
            ? "Esta ruta si tiene sentido: ya cuentas con licencia y aceptas una capa ligera de herramientas para ejecutar con autonomia asistida."
            : "Sin licencia activa o sin margen para herramientas complementarias, la ruta Hazlo tu mismo pierde traccion. En este caso conviene mover el proyecto con ejecucion asistida."}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[color:var(--line)] bg-white px-4 py-4">
            <p className="section-label">Sesiones estimadas</p>
            <p className="mt-3 text-2xl font-semibold">{sessions}</p>
            <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
              Cruce actual: {selectedLevel?.label} +{" "}
              {projectComplexities.find((item) => item.id === complexity)?.label}
            </p>
          </div>
          <div className="rounded-xl border border-[color:var(--line)] bg-white px-4 py-4">
            <p className="section-label">Tarifa por sesion</p>
            <p className="mt-3 text-2xl font-semibold">USD {rate}</p>
            <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
              USD 45 solo aplica si el caso cae en 3 sesiones.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[color:var(--line)] bg-white px-4 py-4">
            <p className="section-label">Inversion estimada</p>
            <p className="mt-3 text-2xl font-semibold">USD {investment}</p>
            <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
              La ruta Hazlo tu mismo queda entre USD 135 y USD 400.
            </p>
          </div>
          <div className="rounded-xl border border-[color:var(--line)] bg-white px-4 py-4">
            <p className="section-label">Pack sugerido</p>
            <p className="mt-3 text-2xl font-semibold">{suggestedPack}</p>
            <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
              Referencia comercial para empaquetar la ejecucion.
            </p>
          </div>
        </div>

        <div
          className={`mt-6 rounded-xl border px-4 py-4 ${
            selfServeRecommended
              ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
              : "border-[color:rgba(225,102,102,0.18)] bg-[color:rgba(225,102,102,0.06)]"
          }`}
        >
          <p className="text-sm font-semibold text-[color:var(--ink-soft)]">
            {selfServeRecommended ? "Lectura de la recomendacion" : "Por que cambiamos de ruta"}
          </p>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            {selfServeRecommended
              ? "Tu perfil permite usar la metodologia Hazlo tu mismo con sesiones guiadas, una licencia activa y herramientas de apoyo ligeras."
              : "La misma logica marca Hazlo tu mismo como no recomendado y empuja a AlgoritmoT lo hace por mi para reducir friccion, bloqueos y dependencias."}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-[color:var(--line)] bg-white">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[color:var(--line)] bg-[color:rgba(17,19,21,0.03)]">
                <th className="px-4 py-3 font-semibold text-[color:var(--ink-soft)]">Nivel</th>
                {projectComplexities.map((item) => (
                  <th
                    key={item.id}
                    className="px-4 py-3 font-semibold text-[color:var(--ink-soft)]"
                  >
                    {item.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {technicalLevels.map((level) => (
                <tr key={level.id} className="border-b border-[color:var(--line)] last:border-b-0">
                  <td className="px-4 py-3 font-medium text-[color:var(--ink-soft)]">
                    {level.label}
                  </td>
                  {projectComplexities.map((item) => {
                    const active = level.id === technicalLevel && item.id === complexity;

                    return (
                      <td
                        key={item.id}
                        className={`px-4 py-3 ${
                          active
                            ? "bg-[color:var(--accent-soft)] font-semibold text-[color:var(--accent)]"
                            : "text-[color:var(--muted)]"
                        }`}
                      >
                        {sessionMatrix[level.id][item.id]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs leading-5 text-[color:var(--muted)]">
          La tarifa de USD 50 no se usa con esta matriz. El unico caso real en USD 45 es
          intermedio + muy facil = 3 sesiones.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/login" className="premium-button premium-button-accent px-5 py-3">
            {selfServeRecommended ? "Agendar primera sesion" : "Quiero que lo hagan por mi"}
          </Link>
          <Link href="#planes" className="premium-button premium-button-secondary px-5 py-3">
            Ver planes
          </Link>
        </div>
      </div>
    </div>
  );
}
