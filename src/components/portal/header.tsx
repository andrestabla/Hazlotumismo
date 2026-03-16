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
    <header className="sticky top-0 z-30 border-b border-[color:var(--line)] bg-[color:var(--paper-strong)]/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <Link href="/" className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Hazlo tu mismo
          </Link>
          <p className="mt-1 font-display text-2xl">Acompanamiento no code e IA</p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap gap-2 text-sm">
            <Link
              href="/dashboard"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 transition hover:border-[color:var(--ink)] hover:bg-white"
            >
              Dashboard
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 transition hover:border-[color:var(--ink)] hover:bg-white"
            >
              Mis proyectos
            </Link>
            <Link
              href="/sessions"
              className="rounded-full border border-[color:var(--line)] px-4 py-2 transition hover:border-[color:var(--ink)] hover:bg-white"
            >
              Mis sesiones
            </Link>
            {user && isAdminRole(user.role) ? (
              <Link
                href="/admin"
                className="rounded-full border border-[color:var(--line)] px-4 py-2 transition hover:border-[color:var(--ink)] hover:bg-white"
              >
                Admin
              </Link>
            ) : null}
          </nav>

          {user ? (
            <div className="flex flex-col gap-3 rounded-[1.4rem] border border-[color:var(--line)] bg-white px-4 py-3 sm:flex-row sm:items-center">
              <div className="text-sm">
                <p className="font-medium">{user.name ?? "Usuario"}</p>
                <p className="text-[color:var(--muted)]">
                  {roleLabels[user.role as keyof typeof roleLabels] ?? user.role}
                </p>
              </div>
              <SignOutForm />
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper-strong)]"
            >
              Iniciar sesion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
