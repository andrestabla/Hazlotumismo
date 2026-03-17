import {
  createSessionPackageAction,
  createUserAction,
  seedWorkspaceAction,
  toggleSessionPackageActiveStateAction,
  toggleUserActiveStateAction,
} from "@/app/workspace/actions";
import { getAdminDashboardData } from "@/db/portal";
import { requireAdmin } from "@/lib/auth/session";

const dateFormatter = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value?: Date | string | null) {
  if (!value) {
    return "Sin registro";
  }

  return dateFormatter.format(new Date(value));
}

export default async function AdminPage() {
  await requireAdmin();
  const data = await getAdminDashboardData();

  const stats = [
    {
      label: "Usuarios",
      value: `${data.stats.profiles}`,
      detail: `${data.stats.clients} clientes · ${data.stats.advisors} asesores · ${data.stats.admins} admins`,
    },
    {
      label: "Proyectos",
      value: `${data.stats.projects}`,
      detail: `${data.stats.activeProjects} activos`,
    },
    {
      label: "Sesiones",
      value: `${data.stats.sessions}`,
      detail: `${data.stats.scheduledSessions} programadas`,
    },
    {
      label: "Compras",
      value: `${data.stats.purchases}`,
      detail: `${data.stats.paidPurchases} pagadas`,
    },
  ];

  return (
    <main className="site-shell app-safe-top app-safe-bottom min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="surface-card p-6 lg:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="eyebrow">Admin</div>
              <h1 className="mt-6 font-display text-5xl leading-[0.94] tracking-[-0.045em]">
                Operación de la plataforma
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Administra usuarios, paquetes, compras y el estado general de proyectos y sesiones
                desde una interfaz más sobria y ejecutiva.
              </p>
            </div>

            <form action={seedWorkspaceAction}>
              <button type="submit" className="premium-button px-5 py-3">
                Re-sembrar demo
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-5">
          {stats.map((stat) => (
            <article key={stat.label} className="editorial-frame p-5">
              <p className="section-label">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{stat.value}</p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{stat.detail}</p>
            </article>
          ))}

          <article className="dark-panel p-5">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">Paquetes</p>
            <p className="mt-4 text-3xl font-semibold">{data.stats.packages}</p>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Catálogo activo para vender sesiones.
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-6">
            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Usuarios</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Crear cuenta
                </h2>
              </div>

              <form action={createUserAction} className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Nombre completo
                  </span>
                  <input
                    name="fullName"
                    required
                    className="premium-input"
                    placeholder="Ej. Laura Álvarez"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="premium-input"
                    placeholder="laura@empresa.com"
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Rol
                    </span>
                    <select name="role" defaultValue="client" className="premium-select">
                      <option value="client">Cliente</option>
                      <option value="advisor">Asesor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Contraseña
                    </span>
                    <input
                      name="password"
                      type="password"
                      required
                      className="premium-input"
                      placeholder="Temporal de acceso"
                    />
                  </label>
                </div>
                <button type="submit" className="premium-button w-full sm:w-fit">
                  Crear usuario
                </button>
              </form>
            </article>

            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Catálogo</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Nuevo paquete
                </h2>
              </div>

              <form action={createSessionPackageAction} className="mt-6 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                    Nombre
                  </span>
                  <input
                    name="name"
                    required
                    className="premium-input"
                    placeholder="Paquete intensivo de implementación"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Descripción
                    </span>
                  <textarea
                    name="description"
                    rows={3}
                    className="premium-textarea"
                    placeholder="Qué incluye el paquete."
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Sesiones
                    </span>
                    <input
                      name="sessionCount"
                      type="number"
                      min="1"
                      defaultValue="5"
                      className="premium-input"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Duración
                    </span>
                    <input
                      name="durationMinutes"
                      type="number"
                      min="30"
                      step="30"
                      defaultValue="60"
                      className="premium-input"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-[color:var(--muted-strong)]">
                      Precio USD
                    </span>
                    <input
                      name="priceDollars"
                      type="number"
                      min="1"
                      step="1"
                      defaultValue="250"
                      className="premium-input"
                    />
                  </label>
                </div>
                <button type="submit" className="premium-button w-full sm:w-fit">
                  Crear paquete
                </button>
              </form>
            </article>
          </div>

          <div className="grid gap-6">
            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Usuarios recientes</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Accesos creados
                </h2>
              </div>
              <div className="mt-6 space-y-4">
                {data.profiles.slice(0, 6).map((profile) => (
                  <article key={profile.id} className="surface-card-muted p-5">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">
                      {profile.fullName}
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--muted)]">{profile.email}</p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Rol: {profile.role} · Activo: {profile.isActive ? "sí" : "no"}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Último acceso: {formatDate(profile.lastLoginAt)}
                    </p>
                    <form action={toggleUserActiveStateAction} className="mt-4">
                      <input type="hidden" name="profileId" value={profile.id} />
                      <input
                        type="hidden"
                        name="nextState"
                        value={profile.isActive ? "deactivate" : "activate"}
                      />
                      <button
                        type="submit"
                        className="premium-button premium-button-secondary px-4 py-2.5"
                      >
                        {profile.isActive ? "Desactivar acceso" : "Reactivar acceso"}
                      </button>
                    </form>
                  </article>
                ))}
              </div>
            </article>

            <article className="surface-card p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="section-label">Paquetes</p>
                <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                  Catálogo activo
                </h2>
              </div>
              <div className="mt-6 space-y-4">
                {data.packages.slice(0, 6).map((sessionPackage) => (
                  <article key={sessionPackage.id} className="surface-card-muted p-5">
                    <h3 className="text-xl font-semibold tracking-[-0.02em]">
                      {sessionPackage.name}
                    </h3>
                    <p className="mt-3 text-sm text-[color:var(--muted)]">
                      {sessionPackage.sessionCount} sesiones · {sessionPackage.durationMinutes} min
                      · {(sessionPackage.priceCents / 100).toFixed(0)} USD
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Estado: {sessionPackage.isActive ? "activo" : "inactivo"}
                    </p>
                    <form action={toggleSessionPackageActiveStateAction} className="mt-4">
                      <input type="hidden" name="sessionPackageId" value={sessionPackage.id} />
                      <input
                        type="hidden"
                        name="nextState"
                        value={sessionPackage.isActive ? "deactivate" : "activate"}
                      />
                      <button
                        type="submit"
                        className="premium-button premium-button-secondary px-4 py-2.5"
                      >
                        {sessionPackage.isActive ? "Desactivar paquete" : "Reactivar paquete"}
                      </button>
                    </form>
                  </article>
                ))}
              </div>
            </article>

            <article className="dark-panel p-6">
              <p className="text-[11px] uppercase tracking-[0.24em] text-white/55">
                Operación reciente
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[0.95] tracking-[-0.045em]">
                Proyectos y compras
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {data.projects.slice(0, 4).map((project) => (
                    <article
                      key={project.id}
                      className="rounded-[1rem] border border-white/10 bg-white/6 p-4"
                    >
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="mt-2 text-sm text-white/72">
                        {project.client?.fullName ?? "Sin cliente"} · {project.status}
                      </p>
                    </article>
                  ))}
                </div>
                <div className="space-y-4">
                  {data.purchases.slice(0, 4).map((purchase) => (
                    <article
                      key={purchase.id}
                      className="rounded-[1rem] border border-white/10 bg-white/6 p-4"
                    >
                      <h3 className="text-lg font-semibold">
                        {purchase.sessionPackage?.name ?? "Paquete"}
                      </h3>
                      <p className="mt-2 text-sm text-white/72">
                        {purchase.client?.fullName ?? "Sin cliente"} · {purchase.status}
                      </p>
                      <p className="mt-2 text-sm text-white/72">
                        Restantes: {purchase.sessionsRemaining}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
