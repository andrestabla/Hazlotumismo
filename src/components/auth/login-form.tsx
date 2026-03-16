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
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? ""} />

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[color:var(--muted-strong)]">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="premium-input"
          placeholder="cliente@hazlotumismo.demo"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[color:var(--muted-strong)]">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="premium-input"
          placeholder="demo12345"
        />
      </label>

      {state.error ? (
        <p className="rounded-lg border border-[color:var(--line-strong)] bg-[color:var(--paper)] px-4 py-3 text-sm text-[color:var(--ink)]">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="premium-button w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Ingresando..." : "Iniciar sesion"}
      </button>
    </form>
  );
}
