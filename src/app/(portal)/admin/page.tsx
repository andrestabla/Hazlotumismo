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

  return (
    <main className="min-h-screen px-6 py-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-[2rem] border border-[color:var(--line)] bg-white/80 p-6 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--muted)]">
            Admin
          </p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="font-display text-5xl leading-none">Operacion de la plataforma</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Aqui administras usuarios, paquetes, compras y el estado general de proyectos y sesiones.
              </p>
            </div>
            <form action={seedWorkspaceAction}>
              <button
                type="submit"
                className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-medium text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)]"
              >
                Re-sembrar demo
              </button>
            </form>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-5">
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Usuarios</p>
            <p className="mt-3 text-3xl font-semibold">{data.stats.profiles}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {data.stats.clients} clientes · {data.stats.advisors} asesores · {data.stats.admins} admins
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Proyectos</p>
            <p className="mt-3 text-3xl font-semibold">{data.stats.projects}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {data.stats.activeProjects} activos
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Sesiones</p>
            <p className="mt-3 text-3xl font-semibold">{data.stats.sessions}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {data.stats.scheduledSessions} programadas
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Compras</p>
            <p className="mt-3 text-3xl font-semibold">{data.stats.purchases}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              {data.stats.paidPurchases} pagadas
            </p>
          </article>
          <article className="card-shadow rounded-[1.8rem] border border-[color:var(--line)] bg-white p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Paquetes</p>
            <p className="mt-3 text-3xl font-semibold">{data.stats.packages}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">
              Catalogo activo para vender sesiones
            </p>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Usuarios</p>
                <h2 className="mt-2 text-3xl font-semibold">Crear cuenta</h2>
              </div>

              <form action={createUserAction} className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Nombre completo</span>
                  <input
                    name="fullName"
                    required
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    placeholder="Ej. Laura Alvarez"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    placeholder="laura@empresa.com"
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Rol</span>
                    <select
                      name="role"
                      defaultValue="client"
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    >
                      <option value="client">Cliente</option>
                      <option value="advisor">Asesor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Password</span>
                    <input
                      name="password"
                      type="password"
                      required
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                      placeholder="Temporal de acceso"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[color:var(--coral)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--ink)]"
                >
                  Crear usuario
                </button>
              </form>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Catalogo</p>
                <h2 className="mt-2 text-3xl font-semibold">Nuevo paquete</h2>
              </div>

              <form action={createSessionPackageAction} className="mt-5 grid gap-4">
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Nombre</span>
                  <input
                    name="name"
                    required
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    placeholder="Paquete intensivo de implementacion"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium">Descripcion</span>
                  <textarea
                    name="description"
                    rows={3}
                    className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    placeholder="Que incluye el paquete."
                  />
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Sesiones</span>
                    <input
                      name="sessionCount"
                      type="number"
                      min="1"
                      defaultValue="4"
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Duracion</span>
                    <input
                      name="durationMinutes"
                      type="number"
                      min="30"
                      step="30"
                      defaultValue="60"
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-medium">Precio USD</span>
                    <input
                      name="priceDollars"
                      type="number"
                      min="1"
                      step="1"
                      defaultValue="480"
                      className="rounded-2xl border border-[color:var(--line)] bg-white px-4 py-3 text-sm"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--paper-strong)] transition hover:bg-[color:var(--coral)]"
                >
                  Crear paquete
                </button>
              </form>
            </article>
          </div>

          <div className="grid gap-6">
            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Usuarios recientes</p>
                <h2 className="mt-2 text-3xl font-semibold">Accesos creados</h2>
              </div>
              <div className="mt-5 space-y-4">
                {data.profiles.slice(0, 6).map((profile) => (
                  <article
                    key={profile.id}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                  >
                    <h3 className="text-lg font-semibold">{profile.fullName}</h3>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">{profile.email}</p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Rol: {profile.role} · Activo: {profile.isActive ? "si" : "no"}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      Ultimo acceso: {formatDate(profile.lastLoginAt)}
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
                        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                      >
                        {profile.isActive ? "Desactivar acceso" : "Reactivar acceso"}
                      </button>
                    </form>
                  </article>
                ))}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Paquetes</p>
                <h2 className="mt-2 text-3xl font-semibold">Catalogo activo</h2>
              </div>
              <div className="mt-5 space-y-4">
                {data.packages.slice(0, 6).map((sessionPackage) => (
                  <article
                    key={sessionPackage.id}
                    className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                  >
                    <h3 className="text-lg font-semibold">{sessionPackage.name}</h3>
                    <p className="mt-2 text-sm text-[color:var(--muted)]">
                      {sessionPackage.sessionCount} sesiones · {sessionPackage.durationMinutes} min ·{" "}
                      {(sessionPackage.priceCents / 100).toFixed(0)} USD
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
                        className="rounded-full border border-[color:var(--line)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--ink)]"
                      >
                        {sessionPackage.isActive ? "Desactivar paquete" : "Reactivar paquete"}
                      </button>
                    </form>
                  </article>
                ))}
              </div>
            </article>

            <article className="card-shadow rounded-[2rem] border border-[color:var(--line)] bg-white p-6">
              <div className="border-b border-[color:var(--line)] pb-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--muted)]">Proyectos y compras</p>
                <h2 className="mt-2 text-3xl font-semibold">Operacion reciente</h2>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {data.projects.slice(0, 4).map((project) => (
                    <article
                      key={project.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {project.client?.fullName ?? "Sin cliente"} · {project.status}
                      </p>
                    </article>
                  ))}
                </div>
                <div className="space-y-4">
                  {data.purchases.slice(0, 4).map((purchase) => (
                    <article
                      key={purchase.id}
                      className="rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--paper-strong)] p-4"
                    >
                      <h3 className="text-lg font-semibold">
                        {purchase.sessionPackage?.name ?? "Paquete"}
                      </h3>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
                        {purchase.client?.fullName ?? "Sin cliente"} · {purchase.status}
                      </p>
                      <p className="mt-2 text-sm text-[color:var(--muted)]">
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
