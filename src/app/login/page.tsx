import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="surface-card p-8 lg:p-10">
          <div>
            <div className="eyebrow">Acceso a la plataforma</div>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[0.92] tracking-[-0.045em]">
              Entra a una experiencia más clara, elegante y orientada a resultados.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              Cliente y asesor comparten el mismo proyecto con tareas, sesiones, acuerdos y
              evidencia conectados en un flujo único.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "Dashboard con foco operacional",
                "Workspaces con trazabilidad real",
                "Sesiones conectadas al trabajo",
              ].map((item) => (
                <article key={item} className="border-t border-[color:var(--line)] pt-4">
                  <p className="text-sm font-semibold text-[color:var(--ink-soft)]">{item}</p>
                </article>
              ))}
            </div>

            <div className="surface-card-muted mt-8 p-6">
              <div className="flex flex-col gap-3 border-b border-[color:var(--line)] pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="section-label">Cuentas demo</p>
                  <h2 className="mt-2 font-display text-[2rem] leading-[0.95] tracking-[-0.045em]">
                    Accesos listos para explorar
                  </h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">Password: demo12345</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Admin",
                    email: "admin@hazlotumismo.demo",
                  },
                  {
                    label: "Asesor",
                    email: "advisor@hazlotumismo.demo",
                  },
                  {
                    label: "Cliente",
                    email: "client@hazlotumismo.demo",
                  },
                ].map((account) => (
                  <article
                    key={account.email}
                    className="editorial-frame p-4"
                  >
                    <p className="section-label">{account.label}</p>
                    <p className="mt-3 text-sm font-medium text-[color:var(--ink)]">
                      {account.email}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="surface-card p-8 lg:p-10">
          <p className="section-label">Login</p>
          <h2 className="mt-4 font-display text-4xl leading-[0.94] tracking-[-0.045em]">
            Accede a tu cuenta
          </h2>
          <p className="mt-3 max-w-lg text-base leading-7 text-[color:var(--muted)]">
            Usa tus credenciales para entrar a tus proyectos, sesiones o al panel administrativo
            dentro de la nueva experiencia visual.
          </p>

          <div className="editorial-frame mt-8 p-5">
            <LoginForm callbackUrl={params.callbackUrl} />
          </div>
        </section>
      </div>
    </main>
  );
}
