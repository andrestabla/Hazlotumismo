import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="surface-card overflow-hidden p-0">
          <div className="grid min-h-[calc(100vh-6rem)] lg:grid-cols-[1.02fr_0.98fr]">
            <section className="relative min-h-[24rem] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/login-workspace.svg')" }}
              />
              <div className="absolute inset-0 bg-[color:rgba(45,57,52,0.74)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:rgba(8,8,8,0.18)] to-transparent" />

              <div className="relative flex h-full flex-col justify-end px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-[0.32em] text-white/74">
                    Hazlo tú mismo
                  </p>
                  <h1 className="font-editorial mt-5 text-[3rem] leading-[0.9] text-white sm:text-[4rem] lg:text-[4.6rem]">
                    Acepto el reto y desarrollo mis propias soluciones.
                  </h1>
                  <p className="mt-5 max-w-lg text-base leading-8 text-white/78 sm:text-lg">
                    Construye con acompañamiento, sesiones en vivo y un entorno donde el trabajo
                    queda visible.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-[color:var(--paper-strong)] px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-14">
              <div className="mx-auto flex h-full max-w-md flex-col justify-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[color:var(--ink)] text-sm font-semibold text-white">
                    HT
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
                      Hazlo tú mismo
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      Acceso a la plataforma
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="section-label">Login</p>
                  <h2 className="font-editorial mt-4 text-[2.7rem] leading-[0.92] text-[color:var(--ink-soft)] sm:text-[3.2rem]">
                    Accede a tu cuenta
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-7 text-[color:var(--muted)]">
                    Usa tus credenciales reales para entrar a tus proyectos, sesiones y panel de
                    trabajo.
                  </p>
                </div>

                <div className="editorial-frame mt-10 p-5 sm:p-6">
                  <LoginForm callbackUrl={params.callbackUrl} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
