import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Acceso a la plataforma
          </p>
          <h1 className="mt-4 font-display text-5xl leading-none">
            Entra al proyecto y sigue construyendo.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[color:var(--muted)]">
            Cliente y asesor trabajan sobre el mismo proyecto con tareas, sesiones y evidencia en
            un solo lugar.
          </p>

          <div className="mt-8 grid gap-4 rounded-[1.7rem] bg-[color:var(--paper)] p-5">
            <div>
              <p className="text-sm font-semibold">Cuentas demo cargadas</p>
              <p className="mt-2 text-sm text-[color:var(--muted)]">
                Password comun para las tres: <span className="font-semibold">demo12345</span>
              </p>
            </div>
            <div className="grid gap-2 text-sm text-[color:var(--muted)]">
              <p>
                Admin: <span className="font-medium text-[color:var(--ink)]">admin@hazlotumismo.demo</span>
              </p>
              <p>
                Asesor: <span className="font-medium text-[color:var(--ink)]">advisor@hazlotumismo.demo</span>
              </p>
              <p>
                Cliente: <span className="font-medium text-[color:var(--ink)]">client@hazlotumismo.demo</span>
              </p>
            </div>
          </div>
        </section>

        <section className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Login
          </p>
          <h2 className="mt-4 text-3xl font-semibold">Accede a tu cuenta</h2>
          <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
            Usa tus credenciales para entrar a tus proyectos, sesiones o al panel administrativo.
          </p>

          <div className="mt-6">
            <LoginForm callbackUrl={params.callbackUrl} />
          </div>
        </section>
      </div>
    </main>
  );
}
