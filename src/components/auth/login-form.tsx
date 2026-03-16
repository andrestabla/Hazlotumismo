"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/login/actions";

type LoginFormProps = {
  callbackUrl?: string;
};

const initialState = {
  error: null,
};

export function LoginForm({ callbackUrl }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(authenticate, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? ""} />

      <label className="grid gap-2">
        <span className="text-sm font-medium">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
          placeholder="cliente@hazlotumismo.demo"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--paper-strong)] px-4 py-3 text-sm outline-none transition focus:border-[color:var(--coral)]"
          placeholder="demo12345"
        />
      </label>

      {state.error ? (
        <p className="rounded-2xl border border-[color:var(--coral)]/25 bg-[color:var(--coral-soft)] px-4 py-3 text-sm text-[color:var(--ink)]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Ingresando..." : "Iniciar sesion"}
      </button>
    </form>
  );
}
