import Link from "next/link";
import { auth } from "@/auth";
import { SignOutForm } from "@/components/auth/sign-out-form";
import { isAdminRole } from "@/lib/auth/roles";

const roleLabels = {
  admin: "Admin",
  advisor: "Asesor",
  client: "Cliente",
} as const;

export async function PortalHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 px-6 py-4 lg:px-10">
      <div className="glass-panel mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-[2rem] px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--ink)] text-sm font-semibold text-[color:var(--paper-strong)]">
            HT
          </div>
          <div>
            <Link href="/" className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
              Hazlo tu mismo
            </Link>
            <p className="mt-1 text-sm font-medium text-[color:var(--ink-soft)]">
              Portal de proyectos, sesiones y evidencia
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/dashboard"
              className="premium-button premium-button-secondary px-4 py-2.5"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="premium-button premium-button-secondary px-4 py-2.5"
            >
              Mis proyectos
            </Link>
            <Link
              href="/sessions"
              className="premium-button premium-button-secondary px-4 py-2.5"
            >
              Mis sesiones
            </Link>
            {user && isAdminRole(user.role) ? (
              <Link
                href="/admin"
                className="premium-button premium-button-secondary px-4 py-2.5"
              >
                Admin
              </Link>
            ) : null}
          </nav>

          {user ? (
            <div className="surface-card flex flex-col gap-3 rounded-[1.4rem] px-4 py-3 sm:flex-row sm:items-center">
              <div className="text-sm">
                <p className="font-medium">{user.name ?? "Usuario"}</p>
                <p className="text-[color:var(--muted)]">
                  {roleLabels[user.role as keyof typeof roleLabels] ?? user.role}
                </p>
              </div>
              <SignOutForm />
            </div>
          ) : (
            <Link href="/login" className="premium-button px-4 py-2.5">
              Iniciar sesion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
