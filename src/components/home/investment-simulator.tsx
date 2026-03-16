"use client";

import Link from "next/link";
import { useState } from "react";

const scenarios = [
  {
    name: "Proceso simple",
    description: "Automatizar una tarea puntual o lanzar una primera pagina con IA.",
    packageName: "Pack Arranque",
    sessions: "4 sesiones",
    investment: "USD 480",
    outcome: "Ideal para validar, construir la primera version y dejarla lista para usar.",
  },
  {
    name: "Flujo comercial",
    description: "Conectar formularios, CRM, automatizaciones y un asistente de ventas.",
    packageName: "Pack Desarrollo",
    sessions: "8 sesiones",
    investment: "USD 920",
    outcome: "Sirve para pasar de la idea al flujo operativo con acompanamiento continuo.",
  },
  {
    name: "Sistema interno",
    description: "Orquestar varios modulos, permisos, tableros y procesos del negocio.",
    packageName: "Pack Escala",
    sessions: "12 sesiones",
    investment: "USD 1320",
    outcome: "Pensado para proyectos con varias piezas y necesidad de supervision ejecutiva.",
  },
] as const;

export function InvestmentSimulator() {
  const [step, setStep] = useState(1);
  const scenario = scenarios[step];

  return (
    <div className="surface-card grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
      <div>
        <p className="section-label">Simulador de inversion</p>
        <h2 className="mt-4 font-display text-4xl leading-tight tracking-[-0.03em]">
          Elige la complejidad y te sugerimos un punto de partida.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-[color:var(--muted)]">
          No necesitas adivinar cuantas horas comprar. Selecciona el tipo de proyecto que quieres
          mover y la plataforma te orienta con una recomendacion de sesiones.
        </p>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">
            <span>Simple</span>
            <span>Complejo</span>
          </div>
          <input
            aria-label="Nivel de complejidad del proyecto"
            className="mt-4 w-full accent-[color:var(--accent)]"
            max={scenarios.length - 1}
            min={0}
            onChange={(event) => setStep(Number(event.target.value))}
            step={1}
            type="range"
            value={step}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {scenarios.map((item, index) => (
            <button
              key={item.name}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                index === step
                  ? "border-[color:var(--accent-line)] bg-[color:var(--accent-soft)]"
                  : "border-[color:var(--line)] bg-white"
              }`}
              onClick={() => setStep(index)}
              type="button"
            >
              <p className="text-sm font-semibold">{item.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="surface-card-muted p-6 lg:p-8">
        <p className="section-label">Recomendacion</p>
        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{scenario.packageName}</h3>
        <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">{scenario.description}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[color:var(--line)] bg-white px-4 py-4">
            <p className="section-label">Capacidad</p>
            <p className="mt-3 text-2xl font-semibold">{scenario.sessions}</p>
          </div>
          <div className="rounded-xl border border-[color:var(--line)] bg-white px-4 py-4">
            <p className="section-label">Inversion</p>
            <p className="mt-3 text-2xl font-semibold">{scenario.investment}</p>
          </div>
        </div>

        <p className="mt-6 text-sm leading-6 text-[color:var(--muted)]">{scenario.outcome}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="#planes" className="premium-button premium-button-accent px-5 py-3">
            Ver planes
          </Link>
          <Link href="/login" className="premium-button premium-button-secondary px-5 py-3">
            Agendar primera sesion
          </Link>
        </div>
      </div>
    </div>
  );
}
